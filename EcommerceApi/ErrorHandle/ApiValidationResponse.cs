using System.Collections.Generic;

namespace EcommerceApi.ErrorHandle
{
    public class ApiValidationResponse : ErrorResponse
    {
        public ApiValidationResponse() : base(400)
        {
        }

        public IEnumerable<string> Errors { get; set; }
    }
}