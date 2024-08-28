namespace Core.Infrastructure.AzureStorage.Services;

public class AzureStorageQueueService : IAzureStorageQueue
{
    private readonly ILogger<AzureStorageQueueService> _logger;
    private readonly AzureStorageOptions _azureStorageOptions;

    public AzureStorageQueueService(ILogger<AzureStorageQueueService> logger, IOptions<AzureStorageOptions> azureStorageOptions)
    {
        _logger = logger;
        _azureStorageOptions = azureStorageOptions.Value;
    }

    public async Task<bool> InsertMessage(SchemaModel schemaModel, CancellationToken cancellationToken = default)
    {
        var queueClient = await CreateQueueClient();

        if (null != await queueClient.CreateIfNotExistsAsync())
        {
            _logger.LogInformation($"Created Azure Message Queue {_azureStorageOptions.QueueName}");
        }

        try
        {
            await queueClient.SendMessageAsync(JsonHelper.Serialize(schemaModel));
            return true;
        }
        catch (Exception ex) 
        {
            _logger.LogError("An error occured while trying to save message");
        }
        return false;
    }

    public async Task<bool> ProcessQueueMessage(string message, CancellationToken cancellationToken = default)
    {
        // Process the data receieved from Azure Storage

        return await Task.FromResult(true);
    }

    public async Task<bool> RetrieveNextMessageAsync(CancellationToken cancellationToken = default)
    {
        var queueClient = await CreateQueueClient();

        if (await queueClient.ExistsAsync())
        {
            QueueProperties properties = await queueClient.GetPropertiesAsync();

            if (properties.ApproximateMessagesCount > 0)
            {
                QueueMessage[] retrievedMessage = await queueClient.ReceiveMessagesAsync(1);
                string message = retrievedMessage[0].Body.ToString();
                if (await ProcessQueueMessage(message, cancellationToken))
                {
                    await queueClient.DeleteMessageAsync(retrievedMessage[0].MessageId, retrievedMessage[0].PopReceipt);
                    return true;
                }
                return false;
            }

            return true;
        }

        return true;
    }

    private async Task<QueueClient> CreateQueueClient()
    {
        return await Task.FromResult(new QueueClient(_azureStorageOptions.ConnectionString, _azureStorageOptions.QueueName));
    }
}
