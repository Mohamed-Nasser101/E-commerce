using EcommerceApi.Extensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder = builder.ConfigureAppServices();

var app = builder.Build();

// Configure the HTTP request pipeline.
app = app.ConfigureAppPipeLine();

using (var scope = app.Services.CreateScope())
{
    var service = scope.ServiceProvider;
    await ConfigureStartupExtenstion.MigrateDatabase(service);
}

app.Run();