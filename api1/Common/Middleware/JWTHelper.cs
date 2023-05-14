using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;

namespace Common.Middleware
{
    public class JWTHelper
    {
        public static DateTime GetIdTokenExpiry(string idtoken)
        {
            var token = new JwtSecurityToken(jwtEncodedString: idtoken);
            string expiry = token.Claims.First(c => c.Type == "exp").Value;
            return DateTimeOffset.FromUnixTimeSeconds(long.Parse(expiry)).DateTime; 
        }
        public static JWTTokenModel GetTokenInfo(string idtoken)
        {
            var token = new JwtSecurityToken(jwtEncodedString: idtoken);
            var jwtTokenModel = new JWTTokenModel();

            jwtTokenModel.exp = DateTimeOffset.FromUnixTimeSeconds(long.Parse(token.Claims.First(c => c.Type == "exp").Value)).DateTime;

            jwtTokenModel.iat = token.Claims.FirstOrDefault(c => c.Type == "iat")?.Value;
            jwtTokenModel.sid = token.Claims.FirstOrDefault(c => c.Type == "sid")?.Value;
            jwtTokenModel.IsAdmin = token.Claims.FirstOrDefault(c => c.Type == "IsAdmin")?.Value;
            jwtTokenModel.typ = token.Claims.FirstOrDefault(c => c.Type == "typ")?.Value;
            return jwtTokenModel;

        }
    }
}
