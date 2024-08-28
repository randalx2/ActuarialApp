namespace Schema.Api;

internal static class ServiceCollectionExtensions
{
    internal static void AddSchemaApiServices(this WebApplicationBuilder builder)
    {
        builder.Services.AddSchemaApplicationServices(builder.Configuration);

        builder.Services.AddCoreInfrastructureServices(builder.Configuration);
        builder.Services.AddCoreApplicationApiServices();
    }

    internal static IServiceCollection AddCoreInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.RegisterCoreOcelotConsulServices(configuration);
        services.AddCoreInfrastructureOpenApiServices(configuration);
        services.AddCoreInfrastructureOpenApiVersioning();

        return services;
    }

    internal static void UseSchemaApiServices(this WebApplication application)
    {
        application.UseCoreInfrastructureOpenApiServices();
    }
}
