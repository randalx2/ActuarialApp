namespace Schema.Persistence;

public static class ServiceCollectionExtension
{
    public static IServiceCollection AddSchemaPersistenceServices(this IServiceCollection services, IConfiguration configuration)
    {
        var persistenceOptions = services.BindValidateReturn<PersistenceOptions>(configuration);

        services.AddDbContext<SchemaDbContext>(options =>
        {
            options.UseSqlServer(persistenceOptions.ConnectionString);
        });

        services.AddInternalServices();

        return services;
    }

    private static IServiceCollection AddInternalServices(this IServiceCollection services)
    {
        services.AddTransient<BaseRepository<UiSchema>, UiSchemaRepository<UiSchema>>();
        services.AddTransient<BaseRepository<UiSchemaDesign>, UiSchemaDesignRepository<UiSchemaDesign>>();

        return services;
    }
}
