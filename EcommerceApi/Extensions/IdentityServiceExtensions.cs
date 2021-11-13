using Core.Entities.Identity;
using Infrastructure.Data;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace EcommerceApi.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddContextWithIdentityServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddDbContext<ApplicationDbContext>(
                opt => opt.UseSqlite(config.GetConnectionString("DefaultConnection"))
            );
            services.AddDbContext<AppIdentityDbContext>(
                opt => opt.UseSqlite(config.GetConnectionString("IdentityConnection"))
            );

            var builder = services.AddIdentityCore<AppUser>();
            builder = new IdentityBuilder(builder.UserType, builder.Services);
            builder.AddEntityFrameworkStores<AppIdentityDbContext>();
            builder.AddSignInManager<SignInManager<AppUser>>();

            services.AddAuthentication();
            return services;
        }
    }
}