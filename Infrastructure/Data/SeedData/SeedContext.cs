using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Data.SeedData
{
    public class SeedContext
    {
        public static async Task SeedDataAsync(ApplicationDbContext context, ILoggerFactory loggerFactory)
        {
            try
            {
                if (!context.ProductTypes.Any())
                {
                    var typesData = await File.ReadAllTextAsync("../Infrastructure/Data/SeedData/types.json");

                    var types = JsonSerializer.Deserialize<List<ProductType>>(typesData);
                    await context.ProductTypes.AddRangeAsync(types);
                }

                if (!context.ProductBrands.Any())
                {
                    var brandData = await File.ReadAllTextAsync("../Infrastructure/Data/SeedData/brands.json");
                    var brands = JsonSerializer.Deserialize<List<ProductBrand>>(brandData);
                    await context.ProductBrands.AddRangeAsync(brands);
                }

                if (!context.Products.Any())
                {
                    var productsData = await File.ReadAllTextAsync("../Infrastructure/Data/SeedData/products.json");
                    var products = JsonSerializer.Deserialize<List<Product>>(productsData);
                    await context.Products.AddRangeAsync(products);
                }

                if (!context.DeliveryMethods.Any())
                {
                    var deliveryData = await File.ReadAllTextAsync("../Infrastructure/Data/SeedData/delivery.json");
                    var deliverMethods = JsonSerializer.Deserialize<List<DeliveryMethod>>(deliveryData);
                    await context.DeliveryMethods.AddRangeAsync(deliverMethods);
                }

                await context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                var logger = loggerFactory.CreateLogger<ApplicationDbContext>();
                logger.LogError(e.Message);
            }
        }
    }
}