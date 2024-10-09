using Microsoft.EntityFrameworkCore;
using Persistence;
using MediatR;
using Application.Activities;
using Application.Core;
using FluentValidation.AspNetCore;
using FluentValidation;

// This method allowing you to add custom services to the DI container. we use this class of Extension method is bcz we cleanup our program.cs file. This code is in the program.cs file and now we create the new file and put this code in this file.
namespace API.Extensions
{
    // We use the static is bcz we don't want or need to create the instance of this class when we use an extension method.  
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, 
            IConfiguration config) 
        {
            // It add the different .NET library to the dependency injection container in an ASP.NET core application.
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            services.AddControllers(); // Add this line to register controllers.
            // This service registered the DbContext database in the application. 
            services.AddDbContext<DataContext>(opt => {
                opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });
            // This service allow the browser to fetch the data in any api like in our case Postman.For example this configuration enables CORS so that your application accepts requests from localhost://3000 with any method and headers.
            services.AddCors(opt => {
                opt.AddPolicy("CorsPolicy", policy => {
                    policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
                });
            });
            services.AddMediatR(typeof(List.Handler));
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);
            services.AddFluentValidationAutoValidation();
            services.AddValidatorsFromAssemblyContaining<Create>(); // Here we specify just one of our handler that contains some validation.

            return services;
        }
    }
}