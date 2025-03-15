using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineHelpDesk_BE.BusinessLogic.Services.DbServices.User;

namespace OnlineHelpDesk_BE.API.Controllers.UserControllers
{
    [Route("api/User/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private ILogger<AuthController> _logger;
        private readonly AuthService _authService;
        private readonly AccountService _accountService;

        public AuthController(ILogger<AuthController> logger, AuthService authService, AccountService accountService)
        {
            _logger = logger;
            _authService = authService;
            _accountService = accountService;
        }
    }
}
