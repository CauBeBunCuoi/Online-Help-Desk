using Microsoft.Extensions.DependencyInjection;
using OnlineHelpDesk_BE.Common.Registrations;

namespace OnlineHelpDesk_BE.Common
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddCommonLayer(this IServiceCollection services)
        {
            services.AddConfiguration();
            return services;
        }
    }
}
