using Microsoft.Extensions.DependencyInjection;
using OnlineHelpDesk_BE.BusinessLogic.Services.DbServices.UserServices;
using OnlineHelpDesk_BE.BusinessLogic.Services.DbServices.FacilityServices;
using OnlineHelpDesk_BE.BusinessLogic.Services.DbServices.FacilityMajorServices;
using OnlineHelpDesk_BE.BusinessLogic.Services.DbServices.RequestServices;
using OnlineHelpDesk_BE.BusinessLogic.Services.AWSServices.S3;

namespace OnlineHelpDesk_BE.BusinessLogic.Services.db_services
{
    public static class AWSServiceRegistration
    {
        public static IServiceCollection AddAWSServices(this IServiceCollection services)
        {
            services.AddScoped<AWSS3Service>();

            return services;
        }
    }
}
