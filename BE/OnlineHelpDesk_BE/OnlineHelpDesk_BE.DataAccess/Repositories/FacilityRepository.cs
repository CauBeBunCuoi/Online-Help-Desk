using OnlineHelpDesk_BE.DataAccess.Data;
using OnlineHelpDesk_BE.DataAccess.Repositories.interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineHelpDesk_BE.DataAccess.Repositories
{
    public class FacilityRepository : IFacilityRepository
    {
        private readonly AppDbContext _dbContext;

        public FacilityRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }
    }
}
