using Microsoft.Extensions.Logging;
using OnlineHelpDesk_BE.BusinessLogic.Helpers;
using OnlineHelpDesk_BE.DataAccess.Data;
using OnlineHelpDesk_BE.DataAccess.UOW;

namespace OnlineHelpDesk_BE.BusinessLogic.Services.DbServices.FacilityMajor
{
    public class MajorServicesService
    {
        private readonly ILogger<MajorServicesService> _logger;
        private readonly AppDbContext _dbContext;
        private readonly FileHelpers _fileHelpers;
        private readonly IUnitOfWork _unitOfWork;

        public MajorServicesService(
            ILogger<MajorServicesService> logger,
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
