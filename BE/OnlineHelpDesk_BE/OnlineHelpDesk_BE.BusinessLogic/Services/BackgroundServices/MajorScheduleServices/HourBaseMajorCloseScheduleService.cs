﻿using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;
using Microsoft.Extensions.DependencyInjection;
using OnlineHelpDesk_BE.BusinessLogic.Helpers;
using OnlineHelpDesk_BE.BusinessLogic.Services.DbServices.RequestServices;
using OnlineHelpDesk_BE.Common.AppConfigurations.Jwt;
using OnlineHelpDesk_BE.BusinessLogic.Services.DbServices.FacilityMajorServices;
using OnlineHelpDesk_BE.Common.AppConfigurations.FilePath.interfaces;

namespace OnlineHelpDesk_BE.BusinessLogic.Services.BackgroundServices.MajorScheduleServices
{
    public class HourBaseMajorCloseScheduleService : BackgroundService
    {
        // LOGGER
        private readonly ILogger<HourBaseMajorCloseScheduleService> _logger;

        // CONFIG
        public readonly IFilePathConfig _filePathConfig;

        // HELPERS
        private readonly FileHelpers _fileHelpers;
        private readonly DateHelpers _dateHelpers;

        // SERVICE PROVIDER
        private readonly IServiceProvider _serviceProvider;

        public HourBaseMajorCloseScheduleService(
            ILogger<HourBaseMajorCloseScheduleService> logger,
            FileHelpers fileHelpers,
            IFilePathConfig filePathConfig,
            DateHelpers dateHelpers,
            IServiceProvider serviceProvider
            )
        {
            _logger = logger;
            _fileHelpers = fileHelpers;
            _filePathConfig = filePathConfig;
            _dateHelpers = dateHelpers;
            _serviceProvider = serviceProvider;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("HourBaseMajorCloseScheduleService is starting.");

            while (!stoppingToken.IsCancellationRequested)
            {
                _logger.LogInformation("Checking majors close schedule requests...");
                Console.WriteLine("\n\n----Checking majors close schedule requests----\n\n");
                try
                {
                    await HandleMajorCloseSchedule();

                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "An error occurred while processing the requests.");
                }

                await Task.Delay(TimeSpan.FromHours(1), stoppingToken);
            }
        }

        private async Task HandleMajorCloseSchedule()
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var serviceRequestService = scope.ServiceProvider.GetRequiredService<MajorService>();
                await serviceRequestService.HandleMajorsSchedule();
            }
        }
    }
}