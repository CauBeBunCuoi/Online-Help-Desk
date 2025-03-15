using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineHelpDesk_BE.BusinessLogic.Services.DbServices.FacilityMajor;

namespace OnlineHelpDesk_BE.API.Controllers.FacilityMajorControllers
{
    [Route("api/Major/[controller]")]
    [ApiController]
    public class FacilityMajorServiceController : ControllerBase
    {
        private ILogger<FacilityMajorServiceController> _logger;
        private readonly MajorService _majorService;
        private readonly MajorAssignmentService _majorAssignmentService;
        private readonly MajorServicesService _majorServicesService;

        public FacilityMajorServiceController(ILogger<FacilityMajorServiceController> logger, MajorService majorService, MajorAssignmentService majorAssignmentService, MajorServicesService majorServicesService)
        {
            _logger = logger;
            _majorService = majorService;
            _majorAssignmentService = majorAssignmentService;
            _majorServicesService = majorServicesService;
        }
    }
}
