Log.Information("Pipeline Api Booting Up...");
try
{
    var builder = WebApplication.CreateBuilder(args);
    builder.AddServiceDefaults();
    builder.AddPipelineApiServices();

    // Add services to the container.

    builder.Services.AddControllers();

    var app = builder.Build();
    app.UsePipelineApiServices();

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
    Log.Information("Pipeline Api Shutting down...");
    Log.CloseAndFlush();
}
