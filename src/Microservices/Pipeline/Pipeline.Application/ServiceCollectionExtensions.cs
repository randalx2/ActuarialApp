namespace Pipeline.Application;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddPipelineApplicationServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddCoreEventGridInfrastructureServices();
        services.AddCoreAzureStorageInfrastructureServices(configuration);
        services.AddCoreApplicationServices();

        return services;
    }
}
