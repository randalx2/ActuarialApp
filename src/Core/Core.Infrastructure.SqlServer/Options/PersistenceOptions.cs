namespace Core.Infrastructure.SqlServer.Options;

public class PersistenceOptions : IValidateOptions
{
    public static string ConfigurationKey { get; private set; } = ConfigurationKeyConstants.PersistenceOptions;

    public string ConnectionString { get; set; } = default!;
    public bool RunMigrations { get; set; }
    public bool SeedData { get; set; }

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        if (string.IsNullOrEmpty(ConfigurationKey))
        {
            yield return new ValidationResult($"{nameof(PersistenceOptions)}.{nameof(ConfigurationKey)} is not configured.", [nameof(PersistenceOptions)]);
        }

        if (string.IsNullOrEmpty(ConnectionString))
        {
            yield return new ValidationResult($"{nameof(PersistenceOptions)}.{nameof(ConnectionString)} is not configured.", [nameof(PersistenceOptions)]);
        }
    }
}