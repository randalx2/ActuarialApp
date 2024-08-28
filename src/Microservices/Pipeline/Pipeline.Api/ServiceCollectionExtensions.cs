using Pipeline.Application;

namespace Pipeline.Api;

internal static class ServiceCollectionExtensions
{
    internal static void AddPipelineApiServices(this WebApplicationBuilder builder)
    {
        builder.Services.AddPipelineApplicationServices(builder.Configuration);
        builder.Services.AddCoreInfrastructureServices(builder.Configuration);
    }

    internal static IServiceCollection AddCoreInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.RegisterCoreOcelotConsulServices(configuration);
        services.AddCoreInfrastructureOpenApiServices(configuration);
        services.AddCoreInfrastructureOpenApiVersioning();

        return services;
    }

    internal static void UsePipelineApiServices(this WebApplication application)
    {
        application.UseCoreInfrastructureOpenApiServices();
    }
}
