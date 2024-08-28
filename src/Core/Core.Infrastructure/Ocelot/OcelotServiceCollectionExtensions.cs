namespace Core.Infrastructure.Ocelot;

public static class OcelotServiceCollectionExtensions
{
    public static void AddOcelotInfrastructureServices(this WebApplicationBuilder builder)
        => builder.Services.AddCoreOcelotInfrastrucutureServices(builder.Configuration);

    public static IServiceCollection AddCoreOcelotInfrastrucutureServices(this IServiceCollection services, IConfiguration configuration)
    {
        var ocelotOptions = services.BindValidateReturn<OcelotOptions>(configuration);

        services.AddOcelot().AddConsul();

        services.PostConfigure<FileConfiguration>(fileConfiguration =>
        {
            foreach (var route in ocelotOptions.Routes.Select(x => x.Value))
            {
                var uri = new Uri(route.Downstream);

                foreach (var pathTemplate in route.UpstreamPathTemplates)
                {
                    fileConfiguration.Routes.Add(new FileRoute
                    {
                        UpstreamPathTemplate = pathTemplate,
                        DownstreamPathTemplate = pathTemplate,
                        DownstreamScheme = uri.Scheme,
                        DownstreamHostAndPorts =
                        [
                            new() { Host = uri.Host, Port = uri.Port }
                        ]
                    });
                }
            }

            foreach (var route in fileConfiguration.Routes)
            {
                if (string.IsNullOrWhiteSpace(route.DownstreamScheme))
                {
                    route.DownstreamScheme = ocelotOptions?.DefaultDownstreamScheme;
                }

                if (string.IsNullOrWhiteSpace(route.DownstreamPathTemplate))
                {
                    route.DownstreamPathTemplate = route.UpstreamPathTemplate;
                }
            }
        });

        return services;
    }

    public static void UseOcelotInfrastructureServices(this WebApplication application)
        => application.UseCoreOcelotInfrastructureServices();

    public static IApplicationBuilder UseCoreOcelotInfrastructureServices(this IApplicationBuilder app)
    {
        app.UseOcelot().Wait();
        return app;
    }

    public static void RegisterCoreOcelotConsulServices(this IServiceCollection services, IConfiguration configuration)
    {
        var consulOptions = services.BindValidateReturn<ConsulOptions>(configuration);

        var consulClient = CreateCoreOcelotConsulClient(consulOptions);

        services.AddSingleton(consulOptions);
        services.AddSingleton<IHostedService, OcelotHostedService>();
        services.AddSingleton<IConsulClient, ConsulClient>(p => consulClient);
    }

    private static ConsulClient CreateCoreOcelotConsulClient(ConsulOptions consulOptions)
        => new(config =>
        {
            config.Address = consulOptions.ServiceDiscoveryAddress;
        });
}
