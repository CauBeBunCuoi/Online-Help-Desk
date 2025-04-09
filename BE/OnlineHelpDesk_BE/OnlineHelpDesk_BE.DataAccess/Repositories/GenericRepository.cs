using OnlineHelpDesk_BE.DataAccess.Repositories.interfaces;
using Microsoft.EntityFrameworkCore;
using OnlineHelpDesk_BE.DataAccess.Data;
using OnlineHelpDesk_BE.DataAccess.Entities;

namespace OnlineHelpDesk_BE.DataAccess.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        private readonly AppDbContext _dbContext;
        internal DbSet<T> _dbSet;

        public GenericRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
            _dbSet = _dbContext.Set<T>();
        }

        public async Task<T?> FindByIdAsync(object id)
        {
            return await _dbSet.FindAsync(id);
        }

        public async Task<IEnumerable<T>> FindAllAsync()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task CreateAsync(T entity)
        {
            await _dbSet.AddAsync(entity);
            await _dbContext.SaveChangesAsync();
        }

        // public async Task UpdateAsync(int id, T entity)
        // {

        //     _dbSet.Update(entity);
        //     await _dbContext.SaveChangesAsync();
        // }
        public async Task UpdateAsync(int id, T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity), "Entity không được để null.");
            }

            var existingEntity = await _dbSet.FindAsync(id);
            if (existingEntity == null)
            {
                throw new Exception($"Entity với Id = {id} không tồn tại.");
            }

            Console.WriteLine("Entity: " + entity.ToString());

            // Đảm bảo entity được tracking
            _dbContext.Entry(existingEntity).State = EntityState.Detached; // Ngắt tracking entity cũ
            _dbContext.Entry(entity).State = EntityState.Modified; // Mark entity là Modified

            await _dbContext.SaveChangesAsync();
        }
        public async Task DeleteAsync(object id)
        {
            var entity = await _dbSet.FindAsync(id);
            if (entity != null)
            {
                _dbSet.Remove(entity);
                await _dbContext.SaveChangesAsync();
            }
        }
    }
}
