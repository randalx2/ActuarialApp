namespace Core.Infrastructure.AzureStorage.Abstractions;

public interface IAzureStorageQueue
{
    public Task<bool> InsertMessage(SchemaModel schemaModel, CancellationToken cancellationToken = default);
    public Task<bool> ProcessQueueMessage(string message, CancellationToken cancellationToken = default);
    public Task<bool> RetrieveNextMessageAsync(CancellationToken cancellationToken = default);
}
