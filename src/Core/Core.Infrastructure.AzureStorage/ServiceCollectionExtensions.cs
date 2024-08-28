namespace Core.Infrastructure.AzureStorage;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddCoreAzureStorageInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.BindValidate<AzureStorageOptions>();

        services.AddTransient<IAzureStorageQueue, AzureStorageQueueService>();

        return services;
    }
}
