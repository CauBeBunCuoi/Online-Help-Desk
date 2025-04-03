using Microsoft.Extensions.DependencyInjection;
using OnlineHelpDesk_BE.BusinessLogic.Services.DbServices.UserServices;
using OnlineHelpDesk_BE.BusinessLogic.Services.DbServices.FacilityServices;
using OnlineHelpDesk_BE.BusinessLogic.Services.DbServices.FacilityMajorServices;
using OnlineHelpDesk_BE.BusinessLogic.Services.DbServices.RequestServices;

namespace OnlineHelpDesk_BE.BusinessLogic.Services.db_services
{
    public static class DbServiceRegistration
    {
        public static IServiceCollection AddDbServices(this IServiceCollection services)
        {
            services.AddScoped<AuthService>();
            services.AddScoped<AccountService>();

            services.AddScoped<FacilityService>();
            services.AddScoped<FacilityItemService>();

            services.AddScoped<MajorService>();
            services.AddScoped<MajorAssignmentService>();
            services.AddScoped<MajorServicesService>();

            services.AddScoped<TaskRequestService>();
            services.AddScoped<ServiceRequestService>();




            return services;
        }
    }
}
