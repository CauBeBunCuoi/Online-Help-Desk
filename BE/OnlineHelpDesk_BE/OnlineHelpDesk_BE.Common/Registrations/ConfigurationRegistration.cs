using Microsoft.Extensions.DependencyInjection;
using OnlineHelpDesk_BE.Common.AppConfigurations.AWS;
using OnlineHelpDesk_BE.Common.AppConfigurations.AWS.interfaces;
using OnlineHelpDesk_BE.Common.AppConfigurations.Bcrypt;
using OnlineHelpDesk_BE.Common.AppConfigurations.Bcrypt.interfaces;
using OnlineHelpDesk_BE.Common.AppConfigurations.FilePath;
using OnlineHelpDesk_BE.Common.AppConfigurations.FilePath.interfaces;
using OnlineHelpDesk_BE.Common.AppConfigurations.Jwt;
using OnlineHelpDesk_BE.Common.AppConfigurations.Jwt.interfaces;
using OnlineHelpDesk_BE.Common.AppConfigurations.Mail;
using OnlineHelpDesk_BE.Common.AppConfigurations.Mail.interfaces;

namespace OnlineHelpDesk_BE.Common.Registrations
{
    public static class ConfigurationRegistration
    {
        public static IServiceCollection AddConfiguration(this IServiceCollection services)
        {
            services.AddSingleton<IJwtConfig, JwtConfig>();
            services.AddSingleton<IBcryptConfig, BcryptConfig>();
            services.AddSingleton<IFilePathConfig, FilePathConfig>();
            services.AddSingleton<IAWSS3Config, AWSS3Config>();
            services.AddSingleton<IMailConfig, MailConfig>();
            return services;
        }
    }
}
