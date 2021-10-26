namespace EcommerceApi.ErrorHandle
{
    public class ApiException : ErrorResponse
    {
        public ApiException(int statusCode, string message = null, string details = null) : base(statusCode, message)
        {
            Details = details;
        }

        public string Details { get; set; }
    }
}