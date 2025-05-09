﻿using Microsoft.Extensions.Configuration;
using OnlineHelpDesk_BE.Common.AppConfigurations.Jwt.interfaces;

namespace OnlineHelpDesk_BE.Common.AppConfigurations.Jwt
{
    public class JwtConfig : IJwtConfig
    {
        public int Exp { get; set; }
        public string Issuer { get; set; }
        public string Audience { get; set; }
        public double AccessTokenExpiration { get; set; }
        public double RefreshTokenExpiration { get; set; }

        public string SecretKey { get; set; }
        public string PrivateKey { get; set; }
        public string PublicKey { get; set; }

        public JwtConfig(IConfiguration configuration)
        {

            SecretKey = configuration["Jwt:SecretKey"];
            PrivateKey = GetKeyFromFile(configuration["Jwt:OpenSSL_PrivateKey_Path"]);
            PublicKey = GetKeyFromFile(configuration["Jwt:OpenSSL_PublicKey_Path"]);
            Exp = int.Parse(configuration["JWT:Exp"]);
            Issuer = configuration["Jwt:Issuer"];
            Audience = configuration["Jwt:Audience"];
            AccessTokenExpiration = double.Parse(configuration["Jwt:AccessTokenExpiration"]);
            RefreshTokenExpiration = double.Parse(configuration["Jwt:RefreshTokenExpiration"]);
        }

        public string GetKeyFromFile(string path)
        {
            try
            {
                path = path.Replace("\\", Path.DirectorySeparatorChar.ToString());
                string basePath = AppDomain.CurrentDomain.BaseDirectory.TrimEnd(Path.DirectorySeparatorChar);
                string relativePath = path.TrimStart(Path.DirectorySeparatorChar);

                string fullPath = Path.Combine(basePath, relativePath);
                var key = File.ReadAllText(fullPath);

                return key;
            } catch (Exception ex)
            {
                Console.WriteLine($"\n\n\n\nALOOOOOOOOOOOOOOOOOOO: {ex.Message}");
                return null;
            }


        }

        public override string ToString()
        {
            return $"Exp: {Exp}, Issuer: {Issuer}, Audience: {Audience}, AccessTokenExpiration: {AccessTokenExpiration}, RefreshTokenExpiration: {RefreshTokenExpiration}, SecretKey: {SecretKey}, PrivateKey: {PrivateKey}, PublicKey: {PublicKey}";
        }
    }
}
