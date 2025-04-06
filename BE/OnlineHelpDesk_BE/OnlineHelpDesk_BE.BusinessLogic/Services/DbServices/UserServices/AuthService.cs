using Microsoft.Extensions.Logging;
using OnlineHelpDesk_BE.BusinessLogic.Helpers;
using OnlineHelpDesk_BE.DataAccess.Data;
using OnlineHelpDesk_BE.DataAccess.Repositories.interfaces;
using OnlineHelpDesk_BE.DataAccess.UOW;
using OnlineHelpDesk_BE.DataAccess.Entities;
using System.Security.Claims;
using OnlineHelpDesk_BE.Common.AppConfigurations.Jwt;
using System.Linq;


using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Identity.Data;
using Newtonsoft.Json.Linq;
using HotChocolate.Execution;
using OnlineHelpDesk_BE.Common.AppConfigurations.Jwt.interfaces;
using OnlineHelpDesk_BE.BusinessLogic.Services.AWSServices.S3;

namespace OnlineHelpDesk_BE.BusinessLogic.Services.DbServices.UserServices
{
    public class AuthService
    {
        // LOGGER
        private readonly ILogger<AuthService> _logger;
        
        // CONFIG
        private readonly IJwtConfig _jwtConfig;

        // DB CONTEXT
        private readonly AppDbContext _dbContext;
        
        // HELPERS
        private readonly BcryptHelpers _bcryptHelpers;
        private readonly JwtHelpers _jwtHelpers;
        
        // UNIT OF WORK
        private readonly IUnitOfWork _unitOfWork;
        
        // REPOSITORIES
        private readonly IGenericRepository<Account> _accountRepository;

        // AWS SERVICE
        private readonly AWSS3Service _awsS3Service;

        // RECORDS
        public record LoginRequestBody(string Email, string Password);

        public AuthService(ILogger<AuthService> logger, AppDbContext dbContext, BcryptHelpers bcryptHelpers, JwtHelpers jwtHelpers,
            IUnitOfWork unitOfWork,
            IGenericRepository<Account> accountRepository,
            IJwtConfig jwtConfig
            )
        {
            _logger = logger;
            _dbContext = dbContext;
            _bcryptHelpers = bcryptHelpers;
            _jwtHelpers = jwtHelpers;
            _unitOfWork = unitOfWork;
            _accountRepository = accountRepository;
            _jwtConfig = jwtConfig;
        }

        public async Task<JObject> Login(dynamic loginRequest)
        {
            var account = await _unitOfWork.AccountRepository.FindByEmail(loginRequest.Email);
            if (account == null)
            {
                // throw new HttpRequestException("Email or password is incorrect");
                throw new HttpRequestException("Account is not exist");
            }

            if (!_bcryptHelpers.VerifyPassword(loginRequest.Password, account.Password))
            {
                throw new HttpRequestException("Email or password is incorrect");
            }

            try
            {
                var claims = new List<Claim>
                {
                    new Claim(JwtRegisteredClaimNames.Sub, account.Id.ToString()),
                    new Claim(JwtRegisteredClaimNames.Name, account.FullName),
                    new Claim(JwtRegisteredClaimNames.Email, account.Email),
                    new Claim("id", account.Id.ToString()),
                    new Claim("phone", account.Phone ?? string.Empty),
                    new Claim("dayOfBirth", account.DateOfBirth.ToString()),
                    new Claim("address", account.Address ?? string.Empty),
                    new Claim("role_id", account.Role.Id.ToString()),
                    new Claim(ClaimTypes.Role, account.Role.Name),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()), // Mã định danh JWT
                };

                var token = _jwtHelpers.GenerateJWT_TwoPublicPrivateKey(claims, _jwtConfig.Exp);

                var user = _jwtHelpers.DecodeToken_TwoPublicPrivateKey(token);

                return JObject.FromObject(new
                {
                    Token = token,
                    User = new
                    {

                        Id = user.FindFirst("id")?.Value,
                        FullName = user.FindFirst(JwtRegisteredClaimNames.Name)?.Value,
                        Email = user.FindFirst(JwtRegisteredClaimNames.Email)?.Value,
                        Phone = user.FindFirst("phone")?.Value,
                        DayOfBirth = user.FindFirst("dayOfBirth")?.Value,
                        Address = user.FindFirst("address")?.Value,
                        Role = user.FindFirst(ClaimTypes.Role)?.Value

                    }
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error generating JWT: " + ex.Message);
                throw new HttpRequestException(ex.Message);
                // throw new HttpRequestException("Could not generate JWT");
            }


        }


        /////////////////////////////////////////////////////////////
        public record DynamicTestRequestBody();
        public async void dynamicTest(dynamic jsonData, dynamic jsonData2, dynamic jsonData3, dynamic jsonData4)
        {
            string str1 = jsonData.name;
            int age = jsonData.age;
            Console.WriteLine(str1 + " " + age);

            // string str2 = jsonData2.name; // lỗi do jsonData2 không có thuộc tính name
            Console.WriteLine(jsonData2);  // ở đây in ra  { name = test, age = 20 }

            // string str3 = jsonData3.name; // lỗi do jsonData3 không có thuộc tính name
            // int age3 = jsonData3.age; // lỗi do jsonData3 không có thuộc tính age
            // Console.WriteLine(str3 + " " + age3);

            string str4 = jsonData4.name;
            int age4 = jsonData4.age;
            Console.WriteLine(str4 + " " + age4);


        }

    }
}
