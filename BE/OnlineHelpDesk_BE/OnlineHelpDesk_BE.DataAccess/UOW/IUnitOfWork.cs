using OnlineHelpDesk_BE.DataAccess.Repositories;
using OnlineHelpDesk_BE.DataAccess.Repositories.interfaces;

namespace OnlineHelpDesk_BE.DataAccess.UOW;
public interface IUnitOfWork
{
    IAccountRepository AccountRepository { get; }
    IFacilityRepository FacilityRepository  { get; }
    IFacilityMajorRepository FacilityMajorRepository  { get; }
    IServiceRepository ServiceRepository  { get; }
    IFeedbackRepository FeedbackRepository  { get; }
    IFacilityItemAssignmentRepository FacilityItemAssignmentRepository  { get; }
    IAssigneeFacilityMajorAssignmentRepository AssigneeFacilityMajorAssignmentRepository  { get; }
    IReportRepository ReportRepository  { get; }
    IServiceAvailabilityRepository ServiceAvailabilityRepository  { get; }
    ITaskRequestRepository TaskRequestRepository  { get; }
    IServiceRequestRepository ServiceRequestRepository  { get; }


    int Complete();
}
