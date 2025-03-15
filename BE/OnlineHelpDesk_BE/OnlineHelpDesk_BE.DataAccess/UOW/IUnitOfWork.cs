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


    int Complete();
}
