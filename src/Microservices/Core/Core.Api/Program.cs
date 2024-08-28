Log.Information("Core Api Booting Up...");
try
{
    var builder = WebApplication.CreateBuilder(args);
    builder.AddServiceDefaults();

    builder.Services.RegisterCoreOcelotConsulServices(builder.Configuration);

    builder.Services.AddSchemaApplicationServices(builder.Configuration);
    builder.Services.AddPipelineApplicationServices(builder.Configuration);
    builder.Services.AddCoreInfrastructureOpenApiServices(builder.Configuration);
    builder.Services.AddCoreInfrastructureOpenApiVersioning();

    // Add services to the container.

    builder.Services.AddControllers();

    var app = builder.Build();
    app.UseCoreInfrastructureOpenApiServices();

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
    Log.Information("Core Api Shutting down...");
    Log.CloseAndFlush();
}
