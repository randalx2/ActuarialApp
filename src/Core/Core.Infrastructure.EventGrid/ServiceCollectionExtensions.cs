namespace Core.Infrastructure.EventGrid;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddCoreEventGridInfrastructureServices(this IServiceCollection services)
    {
        services.AddTransient<IPublisher, PublisherService>();
        services.AddTransient<ISubscriber, SubscriberService>();
        services.AddTransient<IEventGridService, EventGridService>();

        return services;
    }
}
