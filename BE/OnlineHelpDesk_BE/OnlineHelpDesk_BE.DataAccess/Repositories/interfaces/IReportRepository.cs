using OnlineHelpDesk_BE.DataAccess.Data;
using OnlineHelpDesk_BE.DataAccess.Entities;

namespace OnlineHelpDesk_BE.DataAccess.Repositories.interfaces
{
    public interface IReportRepository
    {
        Task<IEnumerable<Report>> FindByMajorId(int majorId);
        Task<Report> FindByIdAsync(int id);
        Task<IEnumerable<Report>> FindAllAsync();
        Task<bool> Resolve(int id, bool resolve);

    }
}
