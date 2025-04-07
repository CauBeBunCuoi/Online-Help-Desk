using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using OnlineHelpDesk_BE.API.Filters.ExceptionFilters;
using OnlineHelpDesk_BE.BusinessLogic.Helpers;
using OnlineHelpDesk_BE.BusinessLogic.Services.AWSServices.S3;
using OnlineHelpDesk_BE.BusinessLogic.Services.DbServices.UserServices;
using OnlineHelpDesk_BE.Common.AppConfigurations.FilePath.interfaces;
using System.Dynamic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineHelpDesk_BE.API.Controllers.UserControllers
{
    [Route("api/User/auth")]
    [ApiController]
    [TypeFilter(typeof(HttpExceptionFilter))]
    public class AuthController : ControllerBase
    {
        private ILogger<AuthController> _logger;
        private readonly AuthService _authService;
        private readonly AccountService _accountService;
        private readonly AWSS3Service _awsS3Service;
        private readonly BcryptHelpers _bcryptHelpers;
        private readonly IFilePathConfig _filePathConfig;
        private readonly MailHelpers _mailHelpers;

        // Records
        public record LoginRequestBody(string Email, string Password);

        public AuthController(ILogger<AuthController> logger, AuthService authService, AccountService accountService,
            BcryptHelpers bcryptHelpers,
            AWSS3Service awsS3Service,
            IFilePathConfig filePathConfig,
            MailHelpers mailHelpers
            )
        {
            _logger = logger;
            _authService = authService;
            _accountService = accountService;
            _bcryptHelpers = bcryptHelpers;
            _awsS3Service = awsS3Service;
            _filePathConfig = filePathConfig;
            _mailHelpers = mailHelpers;
        }


        // [POST] /User/auth/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] JToken jsonData)
        {
            LoginRequestBody loginRequestBody = jsonData["login"].ToObject<LoginRequestBody>();

            JObject login = await _authService.Login(loginRequestBody);



            return Ok(new
            {
                // message = "Đăng nhập thành công",
                message = "Login successfully",
                Token = login["Token"].ToString(),
                User = login["User"],
                //Data = login.Properties().ToDictionary(p => p.Name, p => p.Value.ToString()),

            });
        }


        /////////////////////////////////////////////////////////////////////////
        [HttpPost("get-hash")]
        public IActionResult GetHash([FromBody] JToken jsonData)
        {
            try
            {
                var password = jsonData["password"].ToString();
                var hashedPassword = _bcryptHelpers.HashPassword(password);
                return Ok(hashedPassword);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("dynamic-test")]
        public IActionResult DynamicTest([FromBody] JToken jsonData)
        {
            try
            {
                dynamic data = jsonData["data"].ToObject<dynamic>();
                dynamic data2 = new
                {
                    name = "data2 test",
                    age = 20
                };

                var data3 = new
                {
                    name = "data3 testtttt",
                    age = 20000
                };

                Console.WriteLine(data2.name + " " + data2.age);

                dynamic data4 = new ExpandoObject();
                data4.name = "data4 testtttt";
                data4.age = 20000;


                _authService.dynamicTest(data, data2, data3, data4);

                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("S3-test")]
        public async Task<IActionResult> S3Test([FromBody] JToken jsonData)
        {
            try
            {
                var file = jsonData["file"].ToString();
                var fileName = jsonData["fileName"].ToString();
                var folder = jsonData["folder"].ToString();

                dynamic fileToGetUrl = jsonData["fileToGetUrl"].ToObject<dynamic>();

                var path = $"{folder}/{fileName}";

                // Console.WriteLine(file);
                //await _awsS3Service.UploadBase64FileAsync(file, path);


                // await _awsS3Service.CopyFileAsync(_filePathConfig.MAJOR_IMAGE_PATH + "/unknown.jpg", "nhap/ngu2");

                await _awsS3Service.DeleteFolderAsync("nhap/ngu");

                return Ok(new
                {
                    message = "S3 test successfully",
                    // url = await _awsS3Service.GeneratePresignedUrlAsync(_filePathConfig.MAJOR_IMAGE_PATH , fileToGetUrl.Id.ToString(), fileToGetUrl.Name.ToString(), 1),
                    filekey = await _awsS3Service.GetFullFileKeyAsync(_filePathConfig.MAJOR_IMAGE_PATH, "background"),
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("test-mail")]
        public async Task<IActionResult> TestMail([FromBody] JToken jsonData)
        {
            try
            {
                var email = jsonData["email"].ToString();
                var subject = jsonData["subject"].ToString();
                var viewPath = jsonData["viewPath"].ToString();
                var viewData = jsonData["viewData"].ToObject<dynamic>();

                await _mailHelpers.SendEmailAsync(email, subject, viewPath, viewData);

                return Ok(new
                {
                    message = "Send mail successfully"
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine("\n\n\n" + ex.ToString() + "\n\n\n");
                return BadRequest(ex.Message);
            }
        }


    }




}

