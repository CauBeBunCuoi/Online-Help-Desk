using OnlineHelpDesk_BE.DataAccess.Data;
using OnlineHelpDesk_BE.DataAccess.Entities;

namespace OnlineHelpDesk_BE.DataAccess.Repositories.interfaces
{
    public interface IFacilityMajorRepository
    {
        Task<FacilityMajor> FindByIdAsync(int id);
        Task<IEnumerable<FacilityMajor>> FindByFacilityId(int facilityId);
        Task<IEnumerable<FacilityMajor>> FindByAllAsync();
        Task<bool> Deactivate(int id, bool deactivate);
    }
}
