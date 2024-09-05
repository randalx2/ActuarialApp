var builder = DistributedApplication.CreateBuilder(args);

builder.AddProject<Projects.Core_Gateway>("Gateway");

builder.AddProject<Projects.Schema_Api>("Schema-Api");

builder.AddProject<Projects.Pipeline_Api>("Pipeline-Api");

builder.Build().Run();
