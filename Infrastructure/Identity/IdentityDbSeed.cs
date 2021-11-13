using System.Linq;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    public class IdentityDbSeed
    {
        public static async Task SeedUser(UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new AppUser
                {
                    DisplayName = "moh",
                    Email = "moh@test.com",
                    UserName = "moh@test.com",
                    Address = new Address
                    {
                        FirstName = "mm",
                        LastName = "mmm",
                        Street = "10 The street",
                        City = "asd",
                        State = "asd",
                        ZipCode = "11111"
                    }
                };
                await userManager.CreateAsync(user, "asdASD123@");
            }
        }
    }
}