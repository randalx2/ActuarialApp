namespace Core.Infrastructure.Ocelot.Options;

public class ConsulOptions : IValidateOptions
{
    public static string ConfigurationKey { get; private set; } = ConfigurationKeyConstants.ConsulOptions;

    public Uri ServiceDiscoveryAddress { get; set; } = default!;
    public Uri ServiceAddress { get; set; } = default!;
    public string ServiceName { get; set; } = default!;
    public string ServiceId { get; set; } = default!;

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        if (string.IsNullOrEmpty(ConfigurationKey))
        {
            yield return new ValidationResult($"{nameof(ConsulOptions)}.{nameof(ConfigurationKey)} is not configured.", [nameof(ConsulOptions)]);
        }

        if (string.IsNullOrEmpty(ServiceDiscoveryAddress.ToString()))
        {
            yield return new ValidationResult($"{nameof(ConsulOptions)}.{nameof(ServiceDiscoveryAddress)} is not configured.", [nameof(ConsulOptions)]);
        }

        if (string.IsNullOrEmpty(ServiceAddress.ToString()))
        {
            yield return new ValidationResult($"{nameof(ConsulOptions)}.{nameof(ServiceAddress)} is not configured.", [nameof(ConsulOptions)]);
        }

        if (string.IsNullOrEmpty(ServiceName))
        {
            yield return new ValidationResult($"{nameof(ConsulOptions)}.{nameof(ServiceName)} is not configured.", [nameof(ConsulOptions)]);
        }

        if (string.IsNullOrEmpty(ServiceId))
        {
            yield return new ValidationResult($"{nameof(ConsulOptions)}.{nameof(ServiceId)} is not configured.", [nameof(ConsulOptions)]);
        }
    }
}
