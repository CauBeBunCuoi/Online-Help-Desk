using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineHelpDesk_BE.API.Filters.ExceptionFilters;

namespace OnlineHelpDesk_BE.API.Controllers.RequestControllers
{
    [Route("api/Request/service")]
    [ApiController]
    [TypeFilter(typeof(HttpExceptionFilter))]
    public class ServiceRequestController : ControllerBase
    {
    }
}
