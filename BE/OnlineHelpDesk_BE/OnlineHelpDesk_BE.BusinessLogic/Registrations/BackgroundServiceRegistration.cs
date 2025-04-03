using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using OnlineHelpDesk_BE.BusinessLogic.Services.BackgroundServices.MajorScheduleServices;
using OnlineHelpDesk_BE.BusinessLogic.Services.BackgroundServices.NonTimeRequiredRequestServices;
using OnlineHelpDesk_BE.BusinessLogic.Services.BackgroundServices.TimeRequiredRequestServices;

//using OnlineHelpDesk_BE.BusinessLogic.Services.db_services.interfaces;
using OnlineHelpDesk_BE.BusinessLogic.Services.db_services;

namespace OnlineHelpDesk_BE.BusinessLogic.Services.db_services
{
    public static class BackgroundServiceRegistration
    {
        public static IServiceCollection AddBackgroundServices(this IServiceCollection services)
        {
            services.AddHostedService<HourBaseMajorCloseScheduleService>();
            services.AddHostedService<HourBaseMajorServiceCloseScheduleService>();

            services.AddHostedService<MinuteBaseRequestCancellationService>();
            services.AddHostedService<HourBaseRequestCancellationService>();
            
            services.Configure<HostOptions>(options =>
            {
                options.BackgroundServiceExceptionBehavior = BackgroundServiceExceptionBehavior.Ignore;
            });
            return services;
        }
    }
}
