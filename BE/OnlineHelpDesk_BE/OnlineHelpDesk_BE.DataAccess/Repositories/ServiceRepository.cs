using OnlineHelpDesk_BE.DataAccess.Data;
using OnlineHelpDesk_BE.DataAccess.Repositories.interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineHelpDesk_BE.DataAccess.Repositories
{
    public class ServiceRepository : IServiceRepository
    {
        private readonly AppDbContext _dbContext;

        public ServiceRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }
    }
}
