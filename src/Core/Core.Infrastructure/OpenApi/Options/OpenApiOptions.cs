namespace Core.Infrastructure.OpenApi.Options;

public class OpenApiOptions : IValidateOptions
{
    public static string ConfigurationKey { get; private set; } = ConfigurationKeyConstants.OpenApiOptions;
    public string Title { get; set; } = default!;
    public string Description { get; set; } = default!;
    public string Name { get; set; } = default!;
    public string Email { get; set; } = default!;
    public string Url { get; set; } = default!;

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        if (string.IsNullOrEmpty(ConfigurationKey))
        {
            yield return new ValidationResult($"{nameof(OpenApiOptions)}.{nameof(ConfigurationKey)} is not configured.", [nameof(OpenApiOptions)]);
        }

        if (string.IsNullOrEmpty(Title))
        {
            yield return new ValidationResult($"{nameof(OpenApiOptions)}.{nameof(Title)} is not configured.", [nameof(OpenApiOptions)]);
        }

        if (string.IsNullOrEmpty(Description))
        {
            yield return new ValidationResult($"{nameof(OpenApiOptions)}.{nameof(Description)} is not configured.", [nameof(OpenApiOptions)]);
        }

        if (string.IsNullOrEmpty(Name))
        {
            yield return new ValidationResult($"{nameof(OpenApiOptions)}.{nameof(Name)} is not configured.", [nameof(OpenApiOptions)]);
        }

        if (string.IsNullOrEmpty(Email))
        {
            yield return new ValidationResult($"{nameof(OpenApiOptions)}.{nameof(Email)} is not configured.", [nameof(OpenApiOptions)]);
        }

        if (string.IsNullOrEmpty(Url))
        {
            yield return new ValidationResult($"{nameof(OpenApiOptions)}.{nameof(Url)} is not configured.", [nameof(OpenApiOptions)]);
        }
    }
}
