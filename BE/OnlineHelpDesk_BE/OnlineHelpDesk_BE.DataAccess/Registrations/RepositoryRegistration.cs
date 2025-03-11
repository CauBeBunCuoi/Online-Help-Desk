using Microsoft.Extensions.DependencyInjection;
using OnlineHelpDesk_BE.DataAccess.Repositories;
using OnlineHelpDesk_BE.DataAccess.Repositories.interfaces;
using OnlineHelpDesk_BE.DataAccess.UOW;

namespace OnlineHelpDesk_BE.DataAccess.Registrations
{
    public static class RepositoryRegistration
    {
        public static IServiceCollection AddRepositories(this IServiceCollection services)
        {
            services.AddDbRepository();
            services.AddGenericRepository();
            services.AddUnitOfWork();

            return services;
        }

        public static IServiceCollection AddDbRepository (this IServiceCollection services) {
           
            return services;
        }

        public static IServiceCollection AddGenericRepository(this IServiceCollection services)
        {
            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));

            return services;
        }

        public static IServiceCollection AddUnitOfWork(this IServiceCollection services)
        {
            services.AddScoped<IUnitOfWork, UnitOfWork>();

            return services;
        }
    }
}
