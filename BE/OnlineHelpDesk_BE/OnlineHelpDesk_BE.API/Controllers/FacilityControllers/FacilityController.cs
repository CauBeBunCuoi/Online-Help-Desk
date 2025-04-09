using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using OnlineHelpDesk_BE.API.Controllers.UserControllers;
using OnlineHelpDesk_BE.API.Filters.ExceptionFilters;
using OnlineHelpDesk_BE.BusinessLogic.Services.DbServices.FacilityServices;
using OnlineHelpDesk_BE.BusinessLogic.Services.DbServices.UserServices;

namespace OnlineHelpDesk_BE.API.Controllers.FacilityControllers
{
    [Route("api/Facility/facilities")]
    [ApiController]
    [TypeFilter(typeof(HttpExceptionFilter))]
    public class FacilityController : ControllerBase
    {
        private ILogger<FacilityController> _logger;
        private readonly FacilityService _facilityService;

        public FacilityController(ILogger<FacilityController> logger, FacilityService facilityService)
        {
            _logger = logger;
            _facilityService = facilityService;
        }

        // [GET] /Facility/facilities
        [HttpGet]
        public async Task<IActionResult> GetFacilities()
        {
            var facilities = await _facilityService.GetFacilities();

            return Ok(new
            {
                Facilities = facilities
            });
        }

        // [POST] /Facility/facilities
        [HttpPost]
        public async Task<IActionResult> CreateFacility([FromBody] JToken jsonData)
        {
            dynamic facility = jsonData["Facility"].ToObject<dynamic>();

            await _facilityService.CreateFacility(facility);

            return Ok(new
            {
                // message = "Tạo cơ sở vật chất thành công",
                message = "Create facility successfully",
            });
        }

        // [GET] /Facility/facilities/{facilityId}
        [HttpGet("{facilityId:int}")]
        public async Task<IActionResult> GetFacility(int facilityId)
        {
            var facility = await _facilityService.GetFacilityDetail(facilityId);

            return Ok(facility);
        }  

        // [PUT] /Facility/facilities/{facilityId}
        [HttpPut("{facilityId:int}")]
        public async Task<IActionResult> UpdateFacility(int facilityId, [FromBody] JToken jsonData)
        {
            dynamic facility = jsonData["Facility"].ToObject<dynamic>();

            await _facilityService.UpdateFacility(facilityId, facility);

            return Ok(new
            {
                // message = "Cập nhật cơ sở vật chất thành công",
                message = "Update facility successfully",
            });
        }     

        // [DELETE] /Facility/facilities/{facilityId}
        [HttpDelete("{facilityId:int}")]
        public async Task<IActionResult> DeleteFacility(int facilityId)
        {
            await _facilityService.DeactivateFacility(facilityId);

            return Ok(new
            {
                // message = "Xóa cơ sở vật chất thành công",
                message = "Delete facility successfully",
            });
        } 
    }
}
