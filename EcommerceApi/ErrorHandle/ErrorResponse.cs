namespace EcommerceApi.ErrorHandle
{
    public class ErrorResponse
    {
        public ErrorResponse(int statusCode, string message = null)
        {
            StatusCode = statusCode;
            Message = message ?? GetDefaultMessage(statusCode);
        }

        public int StatusCode { get; set; }
        public string Message { get; set; }

        private string GetDefaultMessage(int statusCode)
        {
            return statusCode switch
            {
                400 => "bad request",
                401 => "unauthorized",
                404 => "not found",
                500 => "server error",
                _ => null
            };
        }
    }
}