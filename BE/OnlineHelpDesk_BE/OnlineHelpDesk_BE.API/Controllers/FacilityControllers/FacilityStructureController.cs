using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineHelpDesk_BE.BusinessLogic.Services.DbServices.Facility;

namespace OnlineHelpDesk_BE.API.Controllers.FacilityControllers
{
    [Route("api/Facility/[controller]")]
    [ApiController]
    public class FacilityStructureController : ControllerBase
    {
        private ILogger<FacilityStructureController> _logger;
        private readonly FacilityService _facilityService;
        private readonly FacilityStructureService _facilityStructureService;

        public FacilityStructureController(ILogger<FacilityStructureController> logger, FacilityService facilityService, FacilityStructureService facilityStructureService)
        {
            _logger = logger;
            _facilityService = facilityService;
            _facilityStructureService = facilityStructureService;
        }
    }
}
