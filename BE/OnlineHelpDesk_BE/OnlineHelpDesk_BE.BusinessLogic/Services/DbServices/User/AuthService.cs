using Microsoft.Extensions.Logging;
using OnlineHelpDesk_BE.BusinessLogic.Helpers;
using OnlineHelpDesk_BE.DataAccess.Data;
using OnlineHelpDesk_BE.DataAccess.Repositories.interfaces;

namespace OnlineHelpDesk_BE.BusinessLogic.Services.DbServices.User
{
    public class AuthService
    {
        private readonly ILogger<AuthService> _logger;
        private readonly AppDbContext _dbContext;
        private readonly BcryptHelpers _bcryptHelpers;
        private readonly JwtHelpers _jwtHelpers;
        private readonly IAccountRepository _accountRepository;

        public AuthService(ILogger<AuthService> logger, AppDbContext dbContext, BcryptHelpers bcryptHelpers, JwtHelpers jwtHelpers, IAccountRepository accountRepository)
        {
            _logger = logger;
            _dbContext = dbContext;
            _bcryptHelpers = bcryptHelpers;
            _jwtHelpers = jwtHelpers;
            _accountRepository = accountRepository;
        }

    }
}
