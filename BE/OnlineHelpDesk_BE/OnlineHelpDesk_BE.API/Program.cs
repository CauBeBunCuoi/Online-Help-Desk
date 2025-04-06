
using OnlineHelpDesk_BE.API.Configurations.App;
using OnlineHelpDesk_BE.API.Configurations.Builder;
using OnlineHelpDesk_BE.BusinessLogic;
using OnlineHelpDesk_BE.Common;
using OnlineHelpDesk_BE.DataAccess;

namespace OnlineHelpDesk_BE.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add Layers
            builder.Services.AddCommonLayer();
            builder.Services.AddBusinessLogicLayer();
            builder.Services.AddDataAccessLayer(builder.Configuration);

            // appConf
            builder.AddBuilderDefaultConfig();
            builder.AddBuilderCorsConfig();

            // authConf
            builder.AddBuilderJwtAuthConfig();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.AppAppDefaultConfig();

            app.AddAppCorsConfig();

            app.AddAppMiddlewareConfig();


            app.MapControllers();

            app.Run();
        }
    }
}
