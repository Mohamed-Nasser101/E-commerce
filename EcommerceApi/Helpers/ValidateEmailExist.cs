using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace EcommerceApi.Helpers
{
    public class ValidateEmailExist : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var userManager = (UserManager<AppUser>) validationContext.GetService(typeof(UserManager<AppUser>));
            if (userManager == null) return new ValidationResult("something went wrong");
            var exist = userManager.FindByEmailAsync((string) value).Result != null;
            return exist ? new ValidationResult("Email already exists") : ValidationResult.Success;
        }
    }
}