using Microsoft.Extensions.DependencyInjection;
using OnlineHelpDesk_BE.BusinessLogic.Helpers;

namespace OnlineHelpDesk_BE.BusinessLogic.Services.db_services
{
    public static class HelperRegistration
    {
        public static IServiceCollection AddHelpers(this IServiceCollection services)
        {
            services.AddSingleton<BcryptHelpers>();
            services.AddSingleton<JwtHelpers>();
            services.AddSingleton<FileHelpers>();
            services.AddSingleton<DateHelpers>();
            return services;
        }
    }
}
