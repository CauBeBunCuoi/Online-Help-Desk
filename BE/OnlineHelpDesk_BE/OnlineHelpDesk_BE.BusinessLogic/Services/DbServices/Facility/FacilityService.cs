using Microsoft.Extensions.Logging;
using OnlineHelpDesk_BE.BusinessLogic.Helpers;
using OnlineHelpDesk_BE.DataAccess.Data;
using OnlineHelpDesk_BE.DataAccess.Repositories.interfaces;
using OnlineHelpDesk_BE.DataAccess.UOW;

namespace OnlineHelpDesk_BE.BusinessLogic.Services.DbServices.Facility
{
    public class FacilityService
    {
        private readonly ILogger<FacilityService> _logger;
        private readonly AppDbContext _dbContext;
        private readonly FileHelpers _fileHelpers;
        private readonly IUnitOfWork _unitOfWork;

        public FacilityService(
            ILogger<FacilityService> logger,
            AppDbContext dbContext,
            FileHelpers fileHelpers,
            IUnitOfWork unitOfWork
            )
        {
            _logger = logger;
            _dbContext = dbContext;
            _fileHelpers = fileHelpers;
            _unitOfWork = unitOfWork;
        }
    }
}
