using OnlineHelpDesk_BE.DataAccess.Data;
using OnlineHelpDesk_BE.DataAccess.Entities;

namespace OnlineHelpDesk_BE.DataAccess.Repositories.interfaces
{
    public interface IServiceRequestRepository
    {
        Task<ServiceRequest> FindByIdAsync(int id);
        Task<IEnumerable<ServiceRequest>> FindAllAsync();
        Task<IEnumerable<ServiceRequest>> FindByFacilityMajorId(int facilityMajorId);
        Task<IEnumerable<ServiceRequest>> FindByAssignedAssigneeId(int assigneeId);
        Task<IEnumerable<ServiceRequest>> FindByRequesterId(int requesterId);
        Task<IEnumerable<ServiceRequest>> FindByAssignedAssigneeIdAndFacilityMajorId(int assigneeId, int facilityMajorId);
        Task<int> CountByMajorIdFromThisMonth(int majorId);

        Task<IEnumerable<ServiceRequest>> FindByServiceTypeId(int serviceTypeId);

    }
}
