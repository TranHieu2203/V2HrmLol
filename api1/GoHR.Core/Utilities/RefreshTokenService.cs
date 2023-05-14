using CoreDAL.Models;
using CoreDAL.MultiTenancy.TenantUser.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace CoreDAL.Utilities
{

    public interface IRefreshTokenService
    {
        Task<SysRefreshToken> UpdateRefreshTokens(string userID, string ipAddress, SysRefreshToken refreshToken = null);
        Task<SysRefreshToken> GenerateRefreshToken(string ipAddress, string userID);
        Task<CheckRefreshTokenResponse> CheckRefreshToken(string tokenString, string ipAddress);
        Task<TenantUser> GetUser(string ID);
        Task<TenantUser> GetUserByRefreshToken(string refreshTokenString);
    }
    public class RefreshTokenService : IRefreshTokenService
    {
        private RefreshTokenContext _refreshTokenContext;

        public RefreshTokenService(RefreshTokenContext refreshTokenContext)
        {
            _refreshTokenContext = refreshTokenContext;
        }


        public async Task<SysRefreshToken> UpdateRefreshTokens(string userID, string ipAddress, SysRefreshToken refreshToken = null)
        {

            if (refreshToken == null) refreshToken = await GenerateRefreshToken(ipAddress, userID);
            await _refreshTokenContext.SysRefreshTokens.AddAsync(refreshToken);


            var user = await _refreshTokenContext.TenantUsers.FirstAsync(x => x.ID == userID);

            // remove old refresh tokens from user
            RemoveOldRefreshTokens(userID);

            // save changes to db
            _refreshTokenContext.Update(user);
            await _refreshTokenContext.SaveChangesAsync();
            return refreshToken;

        }

        public async Task<SysRefreshToken> GenerateRefreshToken(string ipAddress, string userID)
        {
            // generate token that is valid for 7 days
            var rngCryptoServiceProvider = await Task.Run(() => new RNGCryptoServiceProvider());
            var randomBytes = new byte[64];
            rngCryptoServiceProvider.GetBytes(randomBytes);
            var refreshToken = new SysRefreshToken
            {
                USER = userID,
                TOKEN = Convert.ToBase64String(randomBytes),
                EXPIRES = DateTime.UtcNow.AddDays(7),
                CREATED = DateTime.UtcNow,
                CREATED_BY_IP = ipAddress
            };

            return refreshToken;
        }

        public async Task<CheckRefreshTokenResponse> CheckRefreshToken(string tokenString, string ipAddress)
        {
            var refreshToken = await _refreshTokenContext.SysRefreshTokens.SingleAsync(x => x.TOKEN == tokenString);
            var user = await GetUser(refreshToken.USER);
            var list = await (from p in _refreshTokenContext.SysRefreshTokens where p.USER == refreshToken.USER select p).ToListAsync();

            if (refreshToken.IS_REVOKED)
            {
                // revoke all descendant tokens in case this token has been compromised
                RevokeDescendantRefreshTokens(refreshToken, list, ipAddress, $"Attempted reuse of revoked ancestor token: {tokenString}");
                _refreshTokenContext.UpdateRange(list);
                _refreshTokenContext.SaveChanges();
                return new CheckRefreshTokenResponse() { Success = false, Message = "The Token Revoked!" };
            }

            if (!refreshToken.IS_ACTIVE)
            {
                return new CheckRefreshTokenResponse() { Success = false, Message = "The Token Inactivated!" };
            }

            // replace old refresh token with a new one (rotate token)
            var newRefreshToken = await rotateRefreshToken(refreshToken, ipAddress);
            _refreshTokenContext.Update(newRefreshToken);
            _refreshTokenContext.SaveChanges();


            return new CheckRefreshTokenResponse() { Success = true, Message = "", NewRefreshToken = newRefreshToken };
        }

        public async Task<TenantUser> GetUser(string ID)
        {
            var user = await (from p in _refreshTokenContext.TenantUsers.Where(x => x.ID == ID) select p).FirstOrDefaultAsync();
            return user;
        }

        public async Task<TenantUser> GetUserByRefreshToken(string refreshTokenString)
        {
            var userID = await (from p in _refreshTokenContext.SysRefreshTokens.Where(x => x.TOKEN == refreshTokenString) select p.USER).FirstOrDefaultAsync();
            if (userID == null) return null;
            var user = await (from p in _refreshTokenContext.TenantUsers.Where(x => x.ID == userID) select p).FirstOrDefaultAsync();
            return user;
        }

        private async Task<SysRefreshToken> rotateRefreshToken(SysRefreshToken refreshToken, string ipAddress)
        {
            var newRefreshToken = await GenerateRefreshToken(ipAddress, refreshToken.USER);
            RevokeRefreshToken(refreshToken, ipAddress, "Replaced by new token", newRefreshToken.TOKEN);
            return newRefreshToken;
        }


        private void RemoveOldRefreshTokens(string userID)
        {
            // remove old inactive refresh tokens from user based on TTL in app settings
            try
            {
                var lst =  (from p in _refreshTokenContext.SysRefreshTokens.Where(x => x.USER == userID & DateTime.UtcNow >= x.EXPIRES & x.REVOKED==null & x.CREATED.AddDays(7) <= DateTime.UtcNow) select p);

                _refreshTokenContext.SysRefreshTokens.RemoveRange(lst);


                //foreach (var item in lst)
                //{
                //    _refreshTokenContext.SysRefreshTokens.Remove(item);

                //}
            }
            catch (Exception )
            {
            }


        }

        private void RevokeDescendantRefreshTokens(SysRefreshToken refreshToken, List<SysRefreshToken> list, string ipAddress, string reason)
        {
            // recursively traverse the refresh token chain and ensure all descendants are revoked
            if (!string.IsNullOrEmpty(refreshToken.REPLACED_BY_TOKEN))
            {
                var childToken = list.SingleOrDefault(x => x.TOKEN == refreshToken.REPLACED_BY_TOKEN);
                if (childToken.IS_ACTIVE)
                    RevokeRefreshToken(childToken, ipAddress, reason);
                else
                    RevokeDescendantRefreshTokens(childToken, list, ipAddress, reason);
            }
        }

        private void RevokeRefreshToken(SysRefreshToken token, string ipAddress, string reason = null, string replacedByToken = null)
        {
            token.REVOKED = DateTime.UtcNow;
            token.REVOKED_BY_IP = ipAddress;
            token.REASON_REVOKED = reason;
            token.REPLACED_BY_TOKEN = replacedByToken;
        }

    }
}
