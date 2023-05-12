using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace BACKEND.Extensions.Service.Static
{
    public static class StaticFile
    {
        public static void ConfigureCors(this IServiceCollection services) =>
        services.AddCors(options =>
        {
            options.AddPolicy("CorsPolicy", builder =>
            builder.WithOrigins("http://localhost:4200", "http://localhost:8100")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials());
        });

        public static void ConfigureIISIntegration(this IServiceCollection services) =>
        services.Configure<IISOptions>(options =>
        {
        });

    }
}
