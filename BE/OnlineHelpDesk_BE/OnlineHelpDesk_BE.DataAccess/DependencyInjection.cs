using Microsoft.Extensions.DependencyInjection;
using OnlineHelpDesk_BE.DataAccess.Registrations;

namespace OnlineHelpDesk_BE.DataAccess
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddDataAccessLayer(this IServiceCollection services)
        {
            services.AddDbContext();
            services.AddRepositories();
            return services;
        }
    }
}
