/* 3rd Party */
global using Consul;
global using Ocelot.Configuration.File;
global using Ocelot.DependencyInjection;
global using Ocelot.Middleware;
global using Ocelot.Provider.Consul;
global using Swashbuckle.AspNetCore.SwaggerGen;

/* Actuarial */
global using Core.Application.Abstractions.Options;
global using Core.Application.Options;
global using Core.Domain.Constants;
global using Core.Infrastructure.Ocelot.HostedServices;
global using Core.Infrastructure.Ocelot.Options;
global using Core.Infrastructure.OpenApi.Configurations;
global using Core.Infrastructure.OpenApi.Options;

/* Microsoft */
global using Asp.Versioning.ApiExplorer;
global using Asp.Versioning;
global using Microsoft.AspNetCore.Authentication.JwtBearer;
global using Microsoft.AspNetCore.Builder;
global using Microsoft.Extensions.Configuration;
global using Microsoft.Extensions.DependencyInjection;
global using Microsoft.Extensions.Hosting;
global using Microsoft.Extensions.Options;
global using Microsoft.OpenApi.Models;

/* System */
global using System.ComponentModel.DataAnnotations;
