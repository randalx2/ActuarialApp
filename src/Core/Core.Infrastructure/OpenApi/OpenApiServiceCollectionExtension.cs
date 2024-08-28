namespace Core.Infrastructure.OpenApi;

public static class OpenApiServiceCollectionExtension
{
    public static IServiceCollection AddCoreInfrastructureOpenApiVersioning(this IServiceCollection services)
        => services
            .AddApiVersioning(config =>
            {
                config.DefaultApiVersion = new ApiVersion(1, 0);
                config.AssumeDefaultVersionWhenUnspecified = true;
                config.ReportApiVersions = true;
            })
            .AddApiExplorer(options =>
            {
                options.GroupNameFormat = "'v'VVV";
                options.AssumeDefaultVersionWhenUnspecified = true;
                options.DefaultApiVersion = new ApiVersion(1, 0);
                options.SubstituteApiVersionInUrl = true;
            })
            .Services;

    public static IServiceCollection AddCoreInfrastructureOpenApiServices(this IServiceCollection services, IConfiguration configuration)
    {
        var openApiOptions = services.BindValidateReturn<OpenApiOptions>(configuration);

        services.AddSwaggerGen(options =>
        {
            options.CustomSchemaIds(type => type.ToString());
            options.MapType<DateOnly>(() => new OpenApiSchema
            {
                Type = "string",
                Format = "date"
            });

            options.AddSecurityRequirement(new OpenApiSecurityRequirement {
            {
                new OpenApiSecurityScheme {
                    Reference = new OpenApiReference {
                        Type = ReferenceType.SecurityScheme,
                            Id = JwtBearerDefaults.AuthenticationScheme
                    }
                },
                Array.Empty<string>()
            }});

            options.AddSecurityDefinition(JwtBearerDefaults.AuthenticationScheme, new OpenApiSecurityScheme
            {
                Name = "Authorization",
                Description = "Input your Bearer token to access this API",
                In = ParameterLocation.Header,
                Type = SecuritySchemeType.Http,
                Scheme = JwtBearerDefaults.AuthenticationScheme,
                BearerFormat = "JWT",
            });

            options.DocInclusionPredicate((docName, apiDesc) =>
            {
                if (!string.IsNullOrEmpty(apiDesc.RelativePath))
                {
                    if (apiDesc.RelativePath.Contains("configuration") || apiDesc.RelativePath.Contains("outputcache"))
                    {
                        return false;
                    }
                }
                return true;
            });

        });

        services.ConfigureOptions<OpenApiConfigurations>();

        return services;
    }

    public static IApplicationBuilder UseCoreInfrastructureOpenApiServices(this IApplicationBuilder application)
    {
        var provider = application.ApplicationServices.GetService<IApiVersionDescriptionProvider>();
        if (provider == null) return application;

        application.UseSwagger();
        application.UseSwaggerUI(options =>
        {
            options.DefaultModelsExpandDepth(-1);

            foreach (var description in provider.ApiVersionDescriptions)
            {
                options.SwaggerEndpoint($"/swagger/{description.GroupName}/swagger.json", description.ApiVersion.ToString());
            }
        });

        return application;
    }
}
