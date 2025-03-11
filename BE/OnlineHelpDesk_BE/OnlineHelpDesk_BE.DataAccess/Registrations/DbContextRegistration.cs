using Microsoft.Extensions.DependencyInjection;
// using OnlineHelpDesk_BE.DataAccess.Data;

namespace OnlineHelpDesk_BE.DataAccess.Registrations
{
    public static class DbContextRegistration
    {
        public static IServiceCollection AddDbContext(this IServiceCollection services)
        {
            // services.AddDbContext<AppDbContext>();
            return services;
        }
    }
}
