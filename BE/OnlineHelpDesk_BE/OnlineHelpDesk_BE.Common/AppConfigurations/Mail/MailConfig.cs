using Microsoft.Extensions.Configuration;
using OnlineHelpDesk_BE.Common.AppConfigurations.Mail.interfaces;

namespace OnlineHelpDesk_BE.Common.AppConfigurations.Mail
{
    public class MailConfig : IMailConfig
    {
        public string FromEmail { get; set; }
        public string FromName { get; set; }
        public string SmtpPassword { get; set; }
        public string SmtpHost { get; set; }
        public int SmtpPort { get; set; }
        public bool EnableSsl { get; set; }
        // public string SmtpUser { get; set; }
        // public bool UseDefaultCredentials { get; set; }
        // public bool IsBodyHtml { get; set; }

        public MailConfig(IConfiguration configuration)
        {
            FromEmail = configuration["Mail:FromEmail"];
            FromName = configuration["Mail:FromName"];
            SmtpPassword = configuration["Mail:SmtpPassword"];
            SmtpHost = configuration["Mail:SmtpHost"];
            SmtpPort = int.Parse(configuration["Mail:SmtpPort"]);
            EnableSsl = bool.Parse(configuration["Mail:EnableSsl"]);
            // SmtpUser = configuration["Mail:SmtpUser"];
            // UseDefaultCredentials = bool.Parse(configuration["Mail:UseDefaultCredentials"]);
            // IsBodyHtml = bool.Parse(configuration["Mail:IsBodyHtml"]);
        }

        
    }
}
