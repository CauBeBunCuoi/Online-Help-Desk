using OnlineHelpDesk_BE.DataAccess.Data;
using OnlineHelpDesk_BE.DataAccess.Entities;

namespace OnlineHelpDesk_BE.DataAccess.Repositories.interfaces
{
    public interface IFacilityRepository
    {
        Task<Facility> FindByIdAsync(int id);
        Task<bool> Deactivate(int id, bool deactivate);

    }
}
