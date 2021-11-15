using System.ComponentModel.DataAnnotations;
using EcommerceApi.Helpers;

namespace EcommerceApi.Dtos
{
    public class RegisterDto
    {
        [Required]
        [EmailAddress]
        [ValidateEmailExist]
        public string Email { get; set; }

        [Required] public string DisplayName { get; set; }

        [Required]
        [RegularExpression(
            "(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\\s).*$",
            ErrorMessage = "password should be complex enough"
        )]
        public string Password { get; set; }
    }
}