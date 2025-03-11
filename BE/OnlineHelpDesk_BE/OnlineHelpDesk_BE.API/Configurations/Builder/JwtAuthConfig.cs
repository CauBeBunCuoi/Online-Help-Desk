using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Security.Cryptography;
using System.Text;
using System.IO;


namespace OnlineHelpDesk_BE.API.Configurations.Builder
{
    public static class JwtAuthConfig
    {

        public static void AddBuilderJwtAuthConfig(this WebApplicationBuilder builder)
        {
            builder.AddOneSecretKeyJwtAuth();
            builder.AddPublicPrivateKeyJwtAuth();
        }

        public static void AddOneSecretKeyJwtAuth(this WebApplicationBuilder builder)
        {
            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = "SecretKeyAuth";
            })
            .AddJwtBearer("SecretKeyAuth", options =>
            {
                options.Events = new JwtBearerEvents
                {
                    OnAuthenticationFailed = context =>
                    {
                        Console.WriteLine("Authentication failed: " + context.Exception.Message);
                        return Task.CompletedTask;
                    },
                    OnTokenValidated = context =>
                    {
                        Console.WriteLine("Token validated: " + context.SecurityToken);
                        return Task.CompletedTask;
                    }
                };
                options.MapInboundClaims = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = builder.Configuration["Jwt:Issuer"],
                    ValidAudience = builder.Configuration["Jwt:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:SecretKey"]))
                };
            });
        }

        public static void AddPublicPrivateKeyJwtAuth(this WebApplicationBuilder builder)
        {
            builder.Services.AddAuthentication() // Bạn có thể không cần thiết lập Default ở đây nữa nếu đã cấu hình ở hàm trước
            .AddJwtBearer("PublicKeyAuth", options =>
            {
                //string basePath = AppDomain.CurrentDomain.BaseDirectory;
                //string fullPath = Path.Combine(basePath, builder.Configuration["Jwt:OpenSSL_PublicKey_Path"]);
                string basePath = AppDomain.CurrentDomain.BaseDirectory;
                string relativePath = builder.Configuration["Jwt:OpenSSL_PublicKey_Path"].TrimStart(Path.DirectorySeparatorChar);
                string fullPath = Path.Combine(basePath, relativePath);

                Console.WriteLine("basePath: " + basePath);
                //Console.WriteLine("Path: " + builder.Configuration["Jwt:OpenSSL_PublicKey_Path"]);

                //Console.WriteLine("publicKey fullPath: " + fullPath);

                var publicKey = File.ReadAllText(fullPath);
                // Console.WriteLine("publicKey " + publicKey);

                var rsa = RSA.Create();
                rsa.ImportFromPem(publicKey.ToCharArray());
                options.MapInboundClaims = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new RsaSecurityKey(rsa),
                    ValidIssuer = builder.Configuration["Jwt:Issuer"],
                    ValidAudience = builder.Configuration["Jwt:Audience"]
                };
            });
        }

    }
}
