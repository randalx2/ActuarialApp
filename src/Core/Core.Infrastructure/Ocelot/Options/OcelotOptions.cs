namespace Core.Infrastructure.Ocelot.Options;

public class OcelotOptions : IValidateOptions
{
    public static string ConfigurationKey { get; private set; } = ConfigurationKeyConstants.OcelotOptions;

    public string DefaultDownstreamScheme { get; set; } = default!;

    public OcelotRoutesOptions Routes { get; set; } = default!;

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        if (string.IsNullOrEmpty(ConfigurationKey))
        {
            yield return new ValidationResult($"{nameof(OcelotOptions)}.{nameof(ConfigurationKey)} is not configured.", [nameof(OcelotOptions)]);
        }
    }
}

public class OcelotRoutesOptions : Dictionary<string, OcelotRouteOptions> { }

public class OcelotRouteOptions : IValidateOptions
{
    public List<string> UpstreamPathTemplates { get; set; } = default!;

    public string Downstream { get; set; } = default!;

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        if (UpstreamPathTemplates.Count == 0)
        {
            yield return new ValidationResult($"{nameof(OcelotOptions)}.{nameof(UpstreamPathTemplates)} is not configured.", [nameof(OcelotOptions)]);
        }
    }
}
