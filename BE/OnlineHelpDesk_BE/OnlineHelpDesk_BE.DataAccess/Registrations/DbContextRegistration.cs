using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using OnlineHelpDesk_BE.DataAccess.Data;

namespace OnlineHelpDesk_BE.DataAccess.Registrations
{
    public static class DbContextRegistration
    {
        public static IServiceCollection AddDbContext(this IServiceCollection services)
        {
            services.AddDbContext<AppDbContext>(options =>
            {
                options.UseSqlServer("Server=HAOHA\\SQLEXPRESS;Database=OnlineHelpDeskDB_test;Trusted_Connection=True;TrustServerCertificate=True;");  // 1. Sử dụng SQL Server
                options.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);  // 2. Bật AsNoTracking cho toàn bộ truy vấn
                options.UseLazyLoadingProxies(false);  // 3. Kích hoạt Lazy Loading
            });
            return services;
        }
    }
}
