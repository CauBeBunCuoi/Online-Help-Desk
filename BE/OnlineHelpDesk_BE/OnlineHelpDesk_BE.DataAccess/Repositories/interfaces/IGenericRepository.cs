namespace OnlineHelpDesk_BE.DataAccess.Repositories.interfaces
{
    public interface IGenericRepository<T> where T : class
    {
        Task<T?> FindByIdAsync(object id);
        Task<IEnumerable<T>> FindAllAsync();
        Task CreateAsync(T entity);
        Task UpdateAsync(int id, T entity);
        Task DeleteAsync(object id);
    }
}
