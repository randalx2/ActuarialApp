Log.Information("Api Gateway Booting Up...");
try
{
    var builder = WebApplication.CreateBuilder(args);
    builder.AddGatewayServices();

    var app = builder.Build();
    app.UseGatewayServices();

    app.Run();
}
catch (Exception ex) when (!ex.GetType().Name.Equals("HostAbortedException", StringComparison.Ordinal))
{
    // StaticLogger.EnsureInitialized();
    Log.Fatal(ex, "Unhandled exception");
}
finally
{
    // StaticLogger.EnsureInitialized();
    Log.Information("Api Gateway Shutting down...");
    Log.CloseAndFlush();
}
