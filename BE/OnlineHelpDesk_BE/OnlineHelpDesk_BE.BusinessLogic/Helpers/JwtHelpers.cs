﻿using Microsoft.Extensions.Configuration;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using OnlineHelpDesk_BE.Common.Configurations.Jwt;

namespace OnlineHelpDesk_BE.BusinessLogic.Helpers
{
    public class JwtHelpers
    {
        private readonly IJwtConfig _jwtConfig;

        private readonly string _secretKey;
        private readonly string _privateKeyKey;
        private readonly string _publicKeyKey;

        public JwtHelpers(IJwtConfig _jwtConfig)
        {
            _secretKey = _jwtConfig.SecretKey;
            _privateKeyKey = _jwtConfig.PrivateKey;
            _publicKeyKey = _jwtConfig.PublicKey;
            this._jwtConfig = _jwtConfig;
        }

        //public string  getPublicKey()
        //{
        //    return this._publicKeyKey;
        //}

        // Tạo JWT với Secret Key
        public string GenerateJWT_OneSecretKey(object payload, double expiresInMinutes)
        {
            try
            {
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey));
                var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(
                    claims: ConvertObjectToClaims(payload),
                    expires: DateTime.UtcNow.AddMinutes(expiresInMinutes),
                    signingCredentials: credentials
                );

                return new JwtSecurityTokenHandler().WriteToken(token);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error generating JWT: " + ex.Message);
                throw new Exception("Could not generate JWT");
            }
        }

        // Tạo JWT với Public/Private Key
        public string GenerateJWT_TwoPublicPrivateKey(List<Claim> payload, double expiresInMinutes)
        {
            
            try
            {
                
                var rsa = RSA.Create();
                rsa.ImportFromPem(_privateKeyKey.ToCharArray());

                // Sử dụng private key để ký token
                var signingCredentials = new SigningCredentials(new RsaSecurityKey(rsa), SecurityAlgorithms.RsaSha256);

                var token = new JwtSecurityToken(
                    issuer: _jwtConfig.Issuer,
                    audience: _jwtConfig.Audience,
                    claims: payload,
                    expires: DateTime.UtcNow.AddMinutes(expiresInMinutes),
                    signingCredentials: signingCredentials
                );

                return new JwtSecurityTokenHandler().WriteToken(token);
            } catch (Exception ex)
            {
                Console.WriteLine("Error generating JWT: " + ex.Message);
                throw new Exception("Could not generate JWT");
            }
        }

        // Giải mã JWT sử dụng Secret Key
        public ClaimsPrincipal DecodeToken_OneSecretKey(string token)
        {
            try
            {
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey));
                var validationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = key,
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
                };

                return new JwtSecurityTokenHandler().ValidateToken(token, validationParameters, out _);
            }
            catch (Exception ex)
            {
                throw new Exception("Invalid token");
            }
        }

        // Giải mã JWT sử dụng Public Key
        public ClaimsPrincipal DecodeToken_TwoPublicPrivateKey(string token)
        {
            try
            {
                var publicKey = File.ReadAllText(_publicKeyKey);
                Console.WriteLine("publicKey: " + publicKey);
                var rsa = RSA.Create();
                rsa.ImportFromPem(publicKey);

                var key = new RsaSecurityKey(rsa);
                var validationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = key,
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
                };

                return new JwtSecurityTokenHandler().ValidateToken(token, validationParameters, out _);
            }
            catch (Exception ex)
            {
                throw new Exception("Invalid token");
            }
        }

        // Lấy token từ Header Authorization
        public static string ExtractAuthorizationHeaderToken(string authorizationHeader)
        {
            if (string.IsNullOrEmpty(authorizationHeader))
                throw new UnauthorizedAccessException("Authorization header is missing");

            if (!authorizationHeader.StartsWith("Bearer "))
                throw new UnauthorizedAccessException("Invalid authorization header format");

            return authorizationHeader.Replace("Bearer ", "");
        }

        // Chuyển object thành danh sách Claims
        private static Claim[] ConvertObjectToClaims(object payload)
        {
            if (payload is not IDictionary<string, object> dict)
                throw new ArgumentException("Payload must be a dictionary");

            return dict.Select(kv => new Claim(kv.Key, kv.Value?.ToString() ?? "")).ToArray();
        }
    }
}
