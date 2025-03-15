using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineHelpDesk_BE.API.Controllers.FacilityControllers;
using OnlineHelpDesk_BE.BusinessLogic.Services.DbServices.Facility;
using OnlineHelpDesk_BE.BusinessLogic.Services.DbServices.FacilityMajor;

namespace OnlineHelpDesk_BE.API.Controllers.FacilityMajorControllers
{
    [Route("api/Major/[controller]")]
    [ApiController]
    public class FacilityMajorAssignmentController : ControllerBase
    {
        private ILogger<FacilityMajorAssignmentController> _logger;
        private readonly MajorService _majorService;
        private readonly MajorAssignmentService _majorAssignmentService;
        private readonly MajorServicesService _majorServicesService;

        public FacilityMajorAssignmentController(ILogger<FacilityMajorAssignmentController> logger, MajorService majorService, MajorAssignmentService majorAssignmentService, MajorServicesService majorServicesService)
        {
            _logger = logger;
            _majorService = majorService;
            _majorAssignmentService = majorAssignmentService;
            _majorServicesService = majorServicesService;
        }
    }
}
