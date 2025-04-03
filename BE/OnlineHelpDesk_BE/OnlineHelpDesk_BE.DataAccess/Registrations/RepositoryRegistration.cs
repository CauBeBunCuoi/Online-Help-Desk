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
            services.AddScoped<IAccountRepository, AccountRepository>();
            services.AddScoped<IFacilityRepository, FacilityRepository>();
            services.AddScoped<IFacilityMajorRepository, FacilityMajorRepository>();    
            services.AddScoped<IServiceRepository, ServiceRepository>();
            services.AddScoped<IFeedbackRepository, FeedbackRepository>();
            services.AddScoped<IFacilityItemAssignmentRepository, FacilityItemAssignmentRepository>();
            services.AddScoped<IAssigneeFacilityMajorAssignmentRepository, AssigneeFacilityMajorAssignmentRepository>();
            services.AddScoped<IReportRepository, ReportRepository>();
            services.AddScoped<IServiceAvailabilityRepository, ServiceAvailabilityRepository>();
            services.AddScoped<ITaskRequestRepository, TaskRequestRepository>();
            services.AddScoped<IServiceRequestRepository, ServiceRequestRepository>();
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
