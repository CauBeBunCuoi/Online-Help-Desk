using OnlineHelpDesk_BE.DataAccess.Data;
using OnlineHelpDesk_BE.DataAccess.Entities;

namespace OnlineHelpDesk_BE.DataAccess.Repositories.interfaces
{
    public interface ITaskRequestRepository
    {
        Task<TaskRequest> FindByIdAsync(int id);
        Task<IEnumerable<TaskRequest>> FindByMajorHeadId(int majorHeadId);
        Task<IEnumerable<TaskRequest>> FindAllAsync();
        Task<IEnumerable<TaskRequest>> FindByFacilityMajorId(int facilityMajorId);

    }
}
