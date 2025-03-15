using Microsoft.Extensions.Logging;
using OnlineHelpDesk_BE.BusinessLogic.Helpers;
using OnlineHelpDesk_BE.DataAccess.Data;
using OnlineHelpDesk_BE.DataAccess.UOW;

namespace OnlineHelpDesk_BE.BusinessLogic.Services.DbServices.FacilityMajor
{
    public class MajorAssignmentService
    {
        private readonly ILogger<MajorAssignmentService> _logger;
        private readonly AppDbContext _dbContext;
        private readonly FileHelpers _fileHelpers;
        private readonly IUnitOfWork _unitOfWork;

        public MajorAssignmentService(
            ILogger<MajorAssignmentService> logger,
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
