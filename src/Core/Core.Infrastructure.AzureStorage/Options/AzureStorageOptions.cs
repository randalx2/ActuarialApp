namespace Core.Infrastructure.AzureStorage.Options;

public class AzureStorageOptions : IValidateOptions
{
    public static string ConfigurationKey { get; private set; } = ConfigurationKeyConstants.AzureStorageOptions;
    public string ConnectionString { get; set; } = default!;
    public string QueueName { get; set; } = default!;

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        if (string.IsNullOrEmpty(ConfigurationKey))
        {
            yield return new ValidationResult($"{nameof(AzureStorageOptions)}.{nameof(ConfigurationKey)} is not configured.", [nameof(AzureStorageOptions)]);
        }

        if (string.IsNullOrEmpty(ConnectionString))
        {
            yield return new ValidationResult($"{nameof(AzureStorageOptions)}.{nameof(ConnectionString)} is not configured.", [nameof(AzureStorageOptions)]);
        }

        if (string.IsNullOrEmpty(QueueName))
        {
            yield return new ValidationResult($"{nameof(AzureStorageOptions)}.{nameof(QueueName)} is not configured.", [nameof(AzureStorageOptions)]);
        }
    }
}
