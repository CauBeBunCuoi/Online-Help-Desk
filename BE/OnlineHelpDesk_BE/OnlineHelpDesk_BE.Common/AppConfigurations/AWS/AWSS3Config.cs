using Microsoft.Extensions.Configuration;
using OnlineHelpDesk_BE.Common.AppConfigurations.AWS.interfaces;

namespace OnlineHelpDesk_BE.Common.AppConfigurations.AWS
{
    public class AWSS3Config : IAWSS3Config
    {
        public string Profile { get; set; }
        public string BucketName { get; set; }
        public string Region { get; set; }
        public string AccessKey { get; set; }
        public string SecretKey { get; set; }
        public int PresignedURLExpirationHours { get; set; }
        public int UploadImageMaxWidth { get; set; }
        public int UploadImageMaxHeight { get; set; }


        public AWSS3Config(IConfiguration configuration)
        {
            Profile = configuration["AWSS3:Profile"];
            BucketName = configuration["AWSS3:BucketName"];
            Region = configuration["AWSS3:Region"];
            AccessKey = configuration["AWSS3:AccessKey"];
            SecretKey = configuration["AWSS3:SecretKey"];
            PresignedURLExpirationHours = int.Parse(configuration["AWSS3:PresignedURLExpirationHours"].ToString());
            UploadImageMaxWidth = int.Parse(configuration["AWSS3:UploadImageMaxWidth"].ToString());
            UploadImageMaxHeight = int.Parse(configuration["AWSS3:UploadImageMaxHeight"].ToString());

        }

        
    }
}
