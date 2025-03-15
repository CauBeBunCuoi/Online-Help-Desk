using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineHelpDesk_BE.API.Controllers.UserControllers;
using OnlineHelpDesk_BE.API.Filters.ExceptionFilters;
using OnlineHelpDesk_BE.BusinessLogic.Services.DbServices.Facility;
using OnlineHelpDesk_BE.BusinessLogic.Services.DbServices.User;

namespace OnlineHelpDesk_BE.API.Controllers.FacilityControllers
{
    [Route("api/Facility/[controller]")]
    [ApiController]
    [TypeFilter(typeof(HttpExceptionFilter))]
    public class FacilityController : ControllerBase
    {
        private ILogger<FacilityController> _logger;
        private readonly FacilityService _facilityService;
        private readonly FacilityStructureService _facilityStructureService;

        public FacilityController(ILogger<FacilityController> logger, FacilityService facilityService, FacilityStructureService facilityStructureService)
        {
            _logger = logger;
            _facilityService = facilityService;
            _facilityStructureService = facilityStructureService;
        }
    }
}
