namespace Core.Application;

public static class ServiceCollectionExtension
{
    public static IServiceCollection AddCoreApplicationServices(this IServiceCollection services)
    {
        services.AddCoreApplicationApiServices();
        services.AddCoreApplicationMediatR();

        return services;
    }

    public static IServiceCollection AddCoreApplicationApiServices(this IServiceCollection services)
    {
        services
            .AddControllers(options =>
            {
            })
            .ConfigureApiBehaviorOptions(options =>
            {
            })
            .AddJsonOptions(options =>
            {
            });

        return services;
    }

    public static IServiceCollection AddCoreApplicationMediatR(this IServiceCollection services)
    {
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(Assembly.GetCallingAssembly()));

        return services;
    }
}
