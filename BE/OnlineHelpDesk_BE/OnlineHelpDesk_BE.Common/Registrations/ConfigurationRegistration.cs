using Microsoft.Extensions.DependencyInjection;
using OnlineHelpDesk_BE.Common.Configurations.Bcrypt;
using OnlineHelpDesk_BE.Common.Configurations.Jwt;

namespace OnlineHelpDesk_BE.Common.Registrations
{
    public static class ConfigurationRegistration
    {
        public static IServiceCollection AddConfiguration(this IServiceCollection services)
        {
            services.AddSingleton<IJwtConfig, JwtConfig>();
            services.AddSingleton<IBcryptConfig, BcryptConfig>();
            return services;
        }
    }
}
