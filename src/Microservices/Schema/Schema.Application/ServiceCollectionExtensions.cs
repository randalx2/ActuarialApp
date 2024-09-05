namespace Schema.Application;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddSchemaApplicationServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddSchemaPersistenceServices(configuration);
        services.AddCoreApplicationServices();

        services.AddTransient<ISchemaService, SchemaService>();

        return services;
    }
}
