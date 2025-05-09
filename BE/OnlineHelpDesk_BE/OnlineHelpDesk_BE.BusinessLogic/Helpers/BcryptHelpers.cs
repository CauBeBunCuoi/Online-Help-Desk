﻿using Microsoft.Extensions.Configuration;
using BCrypt.Net;
using OnlineHelpDesk_BE.Common.AppConfigurations.Bcrypt;
using OnlineHelpDesk_BE.Common.AppConfigurations.Bcrypt.interfaces;


namespace OnlineHelpDesk_BE.BusinessLogic.Helpers
{
    public class BcryptHelpers
    {
        private readonly IBcryptConfig _bcryptConfig;
        private readonly int _saltRounds;

        public BcryptHelpers(IBcryptConfig bcryptConfig)
        {
            _bcryptConfig = bcryptConfig;
            _saltRounds = _bcryptConfig.SALT_ROUNDS;
        }

        public string HashPassword(string password)
        {
            try
            {
                return BCrypt.Net.BCrypt.HashPassword(password, _saltRounds);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error OnlineHelpDesk_BE password: " + ex.Message);
                throw new Exception("Could not hash password");
            }
        }

        public bool VerifyPassword(string password, string hashedPassword)
        {
            try
            {
                return BCrypt.Net.BCrypt.Verify(password, hashedPassword);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error verifying password: " + ex.Message);
                throw new Exception("Could not verify password");
            }
        }
    }
}
