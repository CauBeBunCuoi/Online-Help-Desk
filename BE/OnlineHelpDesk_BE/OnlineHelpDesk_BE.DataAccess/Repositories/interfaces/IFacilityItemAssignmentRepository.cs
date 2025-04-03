using OnlineHelpDesk_BE.DataAccess.Data;
using OnlineHelpDesk_BE.DataAccess.Entities;

namespace OnlineHelpDesk_BE.DataAccess.Repositories.interfaces
{
    public interface IFacilityItemAssignmentRepository
    {
        Task<IEnumerable<FacilityItemAssignment>> FindByFacilityItemId(int facilityItemId);
        Task<int> GetInUseItemCount(int facilityItemId);
        Task<IEnumerable<FacilityItemAssignment>> FindByFacilityItemIdAndFacilityMajorId(int facilityItemId, int facilityMajorId);

        Task UpdateAsync(FacilityItemAssignment newFacilityItemAssignment);
        Task DeleteRangeAsync(IEnumerable<FacilityItemAssignment> facilityItemAssignments);
    }
}
