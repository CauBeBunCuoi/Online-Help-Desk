using OnlineHelpDesk_BE.DataAccess.Data;
using OnlineHelpDesk_BE.DataAccess.Entities;

namespace OnlineHelpDesk_BE.DataAccess.Repositories.interfaces
{
    public interface IServiceRepository
    {
        Task<Service> FindByIdAsync(int id);
        Task<IEnumerable<Service>> FindByFacilityMajorId(int facilityMajorId);
        Task<IEnumerable<Service>> FindAllAsync();
        Task<bool> Deactivate(int id, bool deactivate);
    }
}
