using OnlineHelpDesk_BE.DataAccess.Data;
using OnlineHelpDesk_BE.DataAccess.Entities;

namespace OnlineHelpDesk_BE.DataAccess.Repositories.interfaces
{
    public interface IAssigneeFacilityMajorAssignmentRepository
    {
        Task<IEnumerable<AssigneeFacilityMajorAssignment>> FindByAccountId(int accountId);
        Task<IEnumerable<AssigneeFacilityMajorAssignment>> FindByFacilityMajorId(int facilityMajorId);
        Task<AssigneeFacilityMajorAssignment> FindByFacilityMajorIdAndAccountId(int facilityMajorId, int accountId);
        Task<IEnumerable<AssigneeFacilityMajorAssignment>> FindAssignableAssigneeByMajorId(int facilityMajorId);

        Task UpdateAsync(AssigneeFacilityMajorAssignment newAssigneeFacilityMajorAssignment);
        Task DeleteByAccountId(int accountId);
        Task DeleteAsync(AssigneeFacilityMajorAssignment assigneeFacilityMajorAssignment);

    }
}
