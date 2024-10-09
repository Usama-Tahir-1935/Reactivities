using System.Net;
using System.Text.Json;
using Application.Core;

//  This middleware is responsible for global exception handling in the application.
// This middleware ensures that the application doesn't crash due to unhandled exceptions and provides a consistent, predictable error response for the clients.
namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly IHostEnvironment _env;

        // RequestDelegate next: Represents the next middleware in the HTTP pipeline. This allows the middleware to pass the request to the next middleware or handle it.
        // ILogger<ExceptionMiddleware> logger: Used for logging errors, particularly for logging exception details.
        // IHostEnvironment env: Provides information about the hosting environment, such as whether the app is running in Development or Production mode.
        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
        {
            _next = next;
            _logger = logger;
            _env = env;
        }

        // This method is executed for each incoming HTTP request. It is where the main functionality of the middleware is implemented.
        // Purpose: To handle exceptions that occur while processing the request.
        public async Task InvokeAsync(HttpContext context) {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                context.Response.ContentType = "application/json"; // Yai path hum nai is liay set kia hai Q k hum Controller sai baahir react k andr error indicate kr rahy hai is liay humay path ko set krna parra hai. Agr hum controller mai hi hotay to path set na krty. 
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError; // "InternalServerError" = 5000

                // In development mode, detailed error information (message and stack trace) is returned for debugging purposes.
                // In production mode, it hides the sensitive error details and returns a generic error message for security reasons.
                var response = _env.IsDevelopment() 
                ? new AppException(context.Response.StatusCode, ex.Message, ex.StackTrace?.ToString())
                : new AppException(context.Response.StatusCode, "Internal Server Error.");

                var options = new JsonSerializerOptions{ PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

                var json = JsonSerializer.Serialize(response, options);

                await context.Response.WriteAsync(json);
            }
        }

    }
}