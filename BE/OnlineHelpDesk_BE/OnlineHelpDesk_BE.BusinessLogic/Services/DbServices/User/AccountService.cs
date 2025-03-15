using Microsoft.Extensions.Logging;
using OnlineHelpDesk_BE.BusinessLogic.Helpers;
using OnlineHelpDesk_BE.DataAccess.Data;
using OnlineHelpDesk_BE.DataAccess.Repositories.interfaces;
using OnlineHelpDesk_BE.DataAccess.UOW;

namespace OnlineHelpDesk_BE.BusinessLogic.Services.DbServices.User
{
    public class AccountService
    {
        private readonly ILogger<AccountService> _logger;
        private readonly AppDbContext _dbContext;
        private readonly BcryptHelpers _bcryptHelpers;
        private readonly JwtHelpers _jwtHelpers;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAccountRepository _accountRepository;


        public AccountService(ILogger<AccountService> logger, AppDbContext dbContext, BcryptHelpers bcryptHelpers, JwtHelpers jwtHelpers, IUnitOfWork unitOfWork, IAccountRepository accountRepository)
        {
            _logger = logger;
            _dbContext = dbContext;
            _bcryptHelpers = bcryptHelpers;
            _jwtHelpers = jwtHelpers;
            _unitOfWork = unitOfWork;
            _accountRepository = accountRepository;
        }
    }
}
