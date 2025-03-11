using Google;
//using OnlineHelpDesk_BE.DataAccess.Data;
using OnlineHelpDesk_BE.DataAccess.Repositories.interfaces;

namespace OnlineHelpDesk_BE.DataAccess.UOW;
public class UnitOfWork : IUnitOfWork
{
    //private readonly AppDbContext _dbContext;
    //public IAccountRepository Accounts { get; }
    //public ITransactionDetailRepository TransactionDetails { get; }

    public UnitOfWork(
        //AppDbContext context, 
        //IAccountRepository accountRepository,
        //ITransactionDetailRepository transactionDetails
        )
    {
        //_context = context;
        //Accounts = accountRepository;
        //TransactionDetails = transactionDetails;
    }

    //public int Complete()
    //{
    //    return _context.SaveChanges();
    //}
}
