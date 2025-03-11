using Microsoft.Extensions.Configuration;

namespace OnlineHelpDesk_BE.Common.Configurations.Bcrypt
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
