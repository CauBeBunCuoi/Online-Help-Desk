using Microsoft.Extensions.DependencyInjection;
// using OnlineHelpDesk_BE.BusinessLogic.Services.db_services.interfaces;
using OnlineHelpDesk_BE.BusinessLogic.Services.db_services;

namespace OnlineHelpDesk_BE.BusinessLogic.Services.db_services
{
    public static class SignalRHubServiceRegistration
    {
        public static IServiceCollection AddSignalRHubServices(this IServiceCollection services)
        {
           
            return services;
        }
    }
}
