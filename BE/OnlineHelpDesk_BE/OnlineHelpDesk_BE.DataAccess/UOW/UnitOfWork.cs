using Google;
using OnlineHelpDesk_BE.DataAccess.Data;
using OnlineHelpDesk_BE.DataAccess.Repositories.interfaces;

namespace OnlineHelpDesk_BE.DataAccess.UOW;
public class UnitOfWork : IUnitOfWork
{
    private readonly AppDbContext _dbContext;
    public IAccountRepository AccountRepository { get; }
    public IFacilityRepository FacilityRepository { get; }
    public IFacilityMajorRepository FacilityMajorRepository { get; }
    public IServiceRepository ServiceRepository { get; }
    public IFeedbackRepository FeedbackRepository { get; }
    public IFacilityItemAssignmentRepository FacilityItemAssignmentRepository { get; }
    public IAssigneeFacilityMajorAssignmentRepository AssigneeFacilityMajorAssignmentRepository { get; }
    public IReportRepository ReportRepository { get; }
    public IServiceAvailabilityRepository ServiceAvailabilityRepository { get; }
    public ITaskRequestRepository TaskRequestRepository { get; }
    public IServiceRequestRepository ServiceRequestRepository { get; }

    public UnitOfWork(
        AppDbContext dbContext,
        IAccountRepository accountRepository,
        IFacilityRepository facilityRepository,
        IFacilityMajorRepository facilityMajorRepository,
        IServiceRepository serviceRepository,
        IFeedbackRepository feedbackRepository,
        IFacilityItemAssignmentRepository facilityItemAssignmentRepository,
        IAssigneeFacilityMajorAssignmentRepository assigneeFacilityMajorAssignmentRepository,
        IReportRepository reportRepository,
        IServiceAvailabilityRepository serviceAvailabilityRepository,
        ITaskRequestRepository taskRequestRepository,
        IServiceRequestRepository serviceRequestRepository
        )
    {
        _dbContext = dbContext;
        this.AccountRepository = accountRepository;
        this.FacilityRepository = facilityRepository;
        this.FacilityMajorRepository = facilityMajorRepository;
        this.ServiceRepository = serviceRepository;
        this.FeedbackRepository = feedbackRepository;
        this.FacilityItemAssignmentRepository = facilityItemAssignmentRepository;
        this.AssigneeFacilityMajorAssignmentRepository = assigneeFacilityMajorAssignmentRepository;
        this.ReportRepository = reportRepository;
        this.ServiceAvailabilityRepository = serviceAvailabilityRepository;
        this.TaskRequestRepository = taskRequestRepository;
        this.ServiceRequestRepository = serviceRequestRepository;
    }

    public int Complete()
    {
        return _dbContext.SaveChanges();
    }
}
