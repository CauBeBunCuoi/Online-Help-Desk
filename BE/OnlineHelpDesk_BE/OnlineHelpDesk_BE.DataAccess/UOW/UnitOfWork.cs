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

    public UnitOfWork(
        AppDbContext dbContext,
        IAccountRepository accountRepository,
        IFacilityRepository facilityRepository,
        IFacilityMajorRepository facilityMajorRepository,
        IServiceRepository serviceRepository,
        IFeedbackRepository feedbackRepository
        )
    {
        _dbContext = dbContext;
        this.AccountRepository = accountRepository;
        this.FacilityRepository = facilityRepository;
        this.FacilityMajorRepository = facilityMajorRepository;
        this.ServiceRepository = serviceRepository;
        this.FeedbackRepository = feedbackRepository;
    }

    public int Complete()
    {
        return _dbContext.SaveChanges();
    }
}
