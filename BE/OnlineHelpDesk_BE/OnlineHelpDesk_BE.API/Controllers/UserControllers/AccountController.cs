using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineHelpDesk_BE.API.Controllers.UserControllers;
using OnlineHelpDesk_BE.API.Filters.ExceptionFilters;
using OnlineHelpDesk_BE.BusinessLogic.Services.DbServices.User;

namespace OnlineHelpDesk_BE.API.Controllers.AccountControllers
{
    [Route("api/User/accounts")]
    [ApiController]
    [TypeFilter(typeof(HttpExceptionFilter))]
    public class AccountController : ControllerBase
    {
        private ILogger<AccountController> _logger;
        private readonly AuthService _authService;
        private readonly AccountService _accountService;

        public AccountController(ILogger<AccountController> logger, AuthService authService, AccountService accountService)
        {
            _logger = logger;
            _authService = authService;
            _accountService = accountService;
        }
    }
}
