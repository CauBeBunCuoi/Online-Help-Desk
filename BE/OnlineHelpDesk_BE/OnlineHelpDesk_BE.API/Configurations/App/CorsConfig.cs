namespace OnlineHelpDesk_BE.API.Configurations.App
{
    public static class CorsConfig
    {
        public static void AddAppCorsConfig(this WebApplication app)
        {
            app.UseCors("AllowAllOrigins");
        }

    }
}
