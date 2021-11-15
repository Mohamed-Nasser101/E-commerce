using System.Security.Claims;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace EcommerceApi.Extensions
{
    public static class UserManagerExtensions
    {
        public static async Task<AppUser> GetUserWithAddressAsync(this UserManager<AppUser> userManager,
            ClaimsPrincipal user)
        {
            var email = user.FindFirstValue(ClaimTypes.Email);
            return await userManager.Users.Include(u => u.Address)
                .FirstOrDefaultAsync(u => u.Email == email);
        }

        public static async Task<AppUser> GetUserByEmailAsync(this UserManager<AppUser> userManager,
            ClaimsPrincipal user)
        {
            var email = user.FindFirstValue(ClaimTypes.Email);
            return await userManager.FindByEmailAsync(email);
        }
    }
}