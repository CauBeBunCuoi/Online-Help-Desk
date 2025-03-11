using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OnlineHelpDesk_BE.BusinessLogic.Services.db_services;
using OnlineHelpDesk_BE.Common.Registrations;

namespace OnlineHelpDesk_BE.BusinessLogic
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddBusinessLogicLayer(this IServiceCollection services)
        {
            //services.AddConfiguration();
            services.AddDbServices();    
            services.AddHelpers();
            return services;
        }
    }
}
