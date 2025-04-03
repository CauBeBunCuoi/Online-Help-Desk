using Microsoft.Extensions.Configuration;
using OnlineHelpDesk_BE.Common.AppConfigurations.Bcrypt.interfaces;

namespace OnlineHelpDesk_BE.Common.AppConfigurations.Bcrypt
{
    public class BcryptConfig : IBcryptConfig
    {
        public int SALT_ROUNDS { get; set; }


        public BcryptConfig(IConfiguration configuration)
        {
            SALT_ROUNDS = int.Parse(configuration["Bcrypt:SALT_ROUNDS"]);
        }

        
    }
}
