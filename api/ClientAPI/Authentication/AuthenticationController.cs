
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Threading.Tasks;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Common.Extensions;
using ClientDAL.Models;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using ClientDAL.Repositories;

namespace ClientAPI.Authentication
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Produces("application/json")]
    [Route("api/client-authen/[action]")]
    public class EmployeeController : BaseController
    {
        private readonly IConfiguration _config;
        public EmployeeController(
            IConfiguration configuration,
            IClientBusiness unitOfWork
        ) : base(unitOfWork)
        {
            _config = configuration;
            
        }
        [AllowAnonymous]
        [HttpGet]

        public async Task<string> GetSomething()
        {
            return "something";
        }
    
        public class LoginModel
        {
            public string Username { get; set; }
            public string Password { get; set; }
        }

        private string BuildToken(Claim[] claims, int day, int type)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JwtToken:SecretKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            if (type == 1)
            {
                var token = new JwtSecurityToken(_config["JwtToken:Issuer"],
                _config["JwtToken:Issuer"],
                claims: claims,
                expires: DateTime.Now.AddDays(day),
                signingCredentials: creds);
                return new JwtSecurityTokenHandler().WriteToken(token);
            }
            else
            {
                var token = new JwtSecurityToken(_config["JwtToken:Issuer"],
                 _config["JwtToken:Issuer"],
                 claims: claims,
                 expires: DateTime.Now.AddMinutes(day),
                 signingCredentials: creds);
                return new JwtSecurityTokenHandler().WriteToken(token);
            }

        }
    }
}
