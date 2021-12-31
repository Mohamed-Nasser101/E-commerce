using System;
using System.IO;
using System.Threading.Tasks;
using Core.Entities.Identity;
using EcommerceApi.Helpers;
using EcommerceApi.Middleware;
using Infrastructure.Data;
using Infrastructure.Data.SeedData;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using StackExchange.Redis;

namespace EcommerceApi.Extensions;

public static class ConfigureStartupExtenstion
{
    public static WebApplicationBuilder ConfigureAppServices(this WebApplicationBuilder builder)
    {
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddAutoMapper(typeof(MappingProfile));
        builder.Services.AddContextWithIdentityServices(builder.Configuration);
        builder.Services.AddSingleton<IConnectionMultiplexer>(_ =>
        {
            var config = ConfigurationOptions.Parse(builder.Configuration.GetConnectionString("Redis"), true);
            return ConnectionMultiplexer.Connect(config);
        });
        builder.Services.AddControllers();
        builder.Services.AddApplicationServices();
        builder.Services.AddSwaggerDocumentation();
        builder.Services.AddCors(opt =>
        {
            opt.AddPolicy("corsPolicy",
                policy => policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200"));
        });
        return builder;
    }

    public static WebApplication ConfigureAppPipeLine(this WebApplication app)
    {
        app.UseMiddleware<ExceptionMiddleware>();

        if (app.Environment.IsDevelopment())
        {
            // app.UseDeveloperExceptionPage();
            app.UseSwaggerDocumentation();
        }

        app.UseStatusCodePagesWithReExecute("/error/{0}");

        app.UseHttpsRedirection();
        app.UseRouting();
        app.UseStaticFiles();
        app.UseStaticFiles(new StaticFileOptions
        {
            FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "Content")),
            RequestPath = "/content"
        });
        app.UseCors("corsPolicy");
        app.UseAuthentication();
        app.UseAuthorization();
        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
            endpoints.MapFallbackToController("Index", "Fallback");
        });

        return app;
    }

    public static async Task MigrateDatabase(IServiceProvider service)
    {
        var loggerFactory = service.GetRequiredService<ILoggerFactory>();
        try
        {
            var db = service.GetRequiredService<ApplicationDbContext>();
            await db.Database.MigrateAsync();
            await SeedContext.SeedDataAsync(db, loggerFactory);

            var userManager = service.GetRequiredService<UserManager<AppUser>>();
            var identityContext = service.GetRequiredService<AppIdentityDbContext>();
            await identityContext.Database.MigrateAsync();
            await IdentityDbSeed.SeedUser(userManager);
        }
        catch (Exception e)
        {
            var logger = loggerFactory.CreateLogger<Program>();
            logger.LogError(e, "Error Occurred");
        }
    }
}