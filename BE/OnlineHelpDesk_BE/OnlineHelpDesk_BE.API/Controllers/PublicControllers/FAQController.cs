using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineHelpDesk_BE.API.Controllers.FacilityMajorControllers;
using OnlineHelpDesk_BE.API.Filters.ExceptionFilters;
using OnlineHelpDesk_BE.BusinessLogic.Services.DbServices.FacilityMajor;
using OnlineHelpDesk_BE.BusinessLogic.Services.DbServices.Misc;

namespace OnlineHelpDesk_BE.API.Controllers.PublicControllers
{
    [Route("api/Public/faq")]
    [ApiController]
    [TypeFilter(typeof(HttpExceptionFilter))]
    public class FAQController : ControllerBase
    {
        private ILogger<FAQController> _logger;
        private readonly FAQService _faqService;

        public FAQController(ILogger<FAQController> logger, FAQService faqService)
        {
            _logger = logger;
            _faqService = faqService;
        }
    }
}
