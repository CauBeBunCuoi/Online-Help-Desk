using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace OnlineHelpDesk_BE.API.Configurations.Builder
{
    public static class DefaultConfig
    {

        public static void AddBuilderDefaultConfig(this WebApplicationBuilder builder)
        {

            builder.Services.AddControllers().AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.PropertyNamingPolicy = null;
            });
            builder.Services.AddSingleton<IConfiguration>(builder.Configuration);


            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            // builder.Services.AddMvc().AddNewtonsoftJson(options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
            builder.Services.AddControllers().AddNewtonsoftJson(options =>
            {
                options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                options.SerializerSettings.ContractResolver = new DefaultContractResolver
                {
                    NamingStrategy = new DefaultNamingStrategy() // Giữ nguyên tên thuộc tính
                };

            });
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

        }


    }
}
