using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineHelpDesk_BE.API.Controllers.PublicControllers;
using OnlineHelpDesk_BE.API.Filters.ExceptionFilters;
using OnlineHelpDesk_BE.BusinessLogic.Services.DbServices.Misc;
using OnlineHelpDesk_BE.BusinessLogic.Services.DbServices.Request;

namespace OnlineHelpDesk_BE.API.Controllers.RequestControllers
{
    [Route("api/Request/blacklist")]
    [ApiController]
    [TypeFilter(typeof(HttpExceptionFilter))]
    public class BlacklistRequestController : ControllerBase
    {
        private ILogger<BlacklistRequestController> _logger;
        private readonly TaskRequestService _taskRequestService;
        private readonly ServiceRequestService _serviceRequestService;
        private readonly BlacklistRequestService _blacklistRequestService;

        public BlacklistRequestController(ILogger<BlacklistRequestController> logger, TaskRequestService taskRequestService, ServiceRequestService serviceRequestService, BlacklistRequestService blacklistRequestService)
        {
            _logger = logger;
            _taskRequestService = taskRequestService;
            _serviceRequestService = serviceRequestService;
            _blacklistRequestService = blacklistRequestService;
        }
    }
}
