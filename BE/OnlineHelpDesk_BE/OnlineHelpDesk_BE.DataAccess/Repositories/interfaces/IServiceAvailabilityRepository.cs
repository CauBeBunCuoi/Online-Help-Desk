using OnlineHelpDesk_BE.DataAccess.Data;
using OnlineHelpDesk_BE.DataAccess.Entities;

namespace OnlineHelpDesk_BE.DataAccess.Repositories.interfaces
{
    public interface IServiceAvailabilityRepository
    {
        Task<ServiceAvailability> FindByAvailability(ServiceAvailability serviceAvailability);
        Task<IEnumerable<ServiceAvailability>> FindByServiceId(int serviceId);

        Task DeleteAsync(ServiceAvailability serviceAvailability);
    }
}
