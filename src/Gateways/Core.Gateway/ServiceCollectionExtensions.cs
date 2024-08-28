namespace Core.Gateway;

internal static class ServiceCollectionExtensions
{
    internal static void AddGatewayServices(this WebApplicationBuilder builder)
    {
        builder.AddServiceDefaults();
        builder.Services.AddControllers();

        builder.AddOcelotInfrastructureServices();
    }

    internal static void UseGatewayServices(this WebApplication application)
    {
        application.UseOcelotInfrastructureServices();
        application.MapDefaultEndpoints();
    }
}
