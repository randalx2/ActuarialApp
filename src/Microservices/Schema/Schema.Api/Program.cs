Log.Information("Schema Api Booting Up...");
try
{

    var builder = WebApplication.CreateBuilder(args);
    builder.AddServiceDefaults();
    builder.AddSchemaApiServices();

    // Add services to the container.

    builder.Services.AddControllers();

    var app = builder.Build();
    app.UseSchemaApiServices();

    app.MapDefaultEndpoints();

    // Configure the HTTP request pipeline.

    app.UseHttpsRedirection();

    app.UseAuthorization();

    app.MapControllers();

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
    Log.Information("Schema Api Shutting down...");
    Log.CloseAndFlush();
}