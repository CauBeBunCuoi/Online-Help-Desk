using Microsoft.Extensions.DependencyInjection;
using OnlineHelpDesk_BE.BusinessLogic.Services.DbServices.User;
using OnlineHelpDesk_BE.BusinessLogic.Services.DbServices.Facility;
using OnlineHelpDesk_BE.BusinessLogic.Services.DbServices.FacilityMajor;
using OnlineHelpDesk_BE.BusinessLogic.Services.DbServices.Request;
using OnlineHelpDesk_BE.BusinessLogic.Services.DbServices.Misc;

namespace OnlineHelpDesk_BE.BusinessLogic.Services.db_services
{
    public static class DbServiceRegistration
    {
        public static IServiceCollection AddDbServices(this IServiceCollection services)
        {
            services.AddScoped<AuthService>();
            services.AddScoped<AccountService>();

            services.AddScoped<FacilityService>();
            services.AddScoped<FacilityStructureService>();
            
            services.AddScoped<MajorService>();
            services.AddScoped<MajorAssignmentService>();
            services.AddScoped<MajorServicesService>();

            services.AddScoped<TaskRequestService>();
            services.AddScoped<ServiceRequestService>();
            services.AddScoped<BlacklistRequestService>();

            services.AddScoped<FAQService>();



            return services;
        }
    }
}
