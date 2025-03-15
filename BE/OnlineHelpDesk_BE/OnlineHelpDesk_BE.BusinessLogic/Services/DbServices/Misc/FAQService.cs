using Microsoft.Extensions.Logging;
using OnlineHelpDesk_BE.BusinessLogic.Helpers;
using OnlineHelpDesk_BE.BusinessLogic.Services.DbServices.FacilityMajor;
using OnlineHelpDesk_BE.DataAccess.Data;
using OnlineHelpDesk_BE.DataAccess.UOW;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineHelpDesk_BE.BusinessLogic.Services.DbServices.Misc
{
    public class FAQService
    {
        private readonly ILogger<FAQService> _logger;
        private readonly AppDbContext _dbContext;
        private readonly FileHelpers _fileHelpers;
        private readonly IUnitOfWork _unitOfWork;

        public FAQService(
            ILogger<FAQService> logger,
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
