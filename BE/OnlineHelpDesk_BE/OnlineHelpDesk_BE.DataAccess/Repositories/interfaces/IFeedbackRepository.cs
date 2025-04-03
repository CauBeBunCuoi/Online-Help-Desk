using OnlineHelpDesk_BE.DataAccess.Data;
using OnlineHelpDesk_BE.DataAccess.Entities;

namespace OnlineHelpDesk_BE.DataAccess.Repositories.interfaces
{
    public interface IFeedbackRepository
    {
        Task<IEnumerable<Feedback>> FindByMajorId(int majorId);
        Task<IEnumerable<Feedback>> FindAllAsync();
        Task<bool> Deactivate(int id, bool deactivate);

    }
}
