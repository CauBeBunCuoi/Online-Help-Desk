using Microsoft.Extensions.DependencyInjection;
//using OnlineHelpDesk_BE.BusinessLogic.Services.db_services.interfaces;
using OnlineHelpDesk_BE.BusinessLogic.Services.db_services;

namespace OnlineHelpDesk_BE.BusinessLogic.Services.db_services
{
    public static class BackgroundServiceRegistration
    {
        public static IServiceCollection AddBackgroundServices(this IServiceCollection services)
        {
           
            return services;
        }
    }
}
