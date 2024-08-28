namespace Core.Infrastructure.OpenApi.Configurations;

internal class OpenApiConfigurations : IConfigureNamedOptions<SwaggerGenOptions>
{
    private readonly IApiVersionDescriptionProvider _provider;
    private readonly OpenApiOptions _options;

    public OpenApiConfigurations(IApiVersionDescriptionProvider provider, IOptions<OpenApiOptions> options)
    {
        _provider = provider;
        _options = options.Value;
    }

    public void Configure(string? name, SwaggerGenOptions options)
        => Configure(options);

    public void Configure(SwaggerGenOptions options)
    {
        // add swagger document for every API version discovered
        foreach (var description in _provider.ApiVersionDescriptions)
        {
            options.SwaggerDoc(description.GroupName, CreateInfoForApiVersion(description));
        }
    }

    private OpenApiInfo CreateInfoForApiVersion(ApiVersionDescription description)
    {
        var info = new OpenApiInfo()
        {
            Title = _options.Title,
            Version = description.ApiVersion.ToString(),
            Contact = new OpenApiContact()
            {
                Name = _options.Name,
                Url = new Uri(_options.Url)
            },
            Description = _options.Description
        };

        if (description.IsDeprecated)
        {
            info.Description += " (This API version has been deprecated)";
        }

        return info;
    }
}
