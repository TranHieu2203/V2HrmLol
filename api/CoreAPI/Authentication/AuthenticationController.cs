using Microsoft.Extensions.Configuration;
using CoreDAL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Threading.Tasks;
using System.Security.Claims;
using CoreAPI.ViewModels;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using CoreDAL.Repositories;
using Common.Extensions;
using ProfileDAL.Repositories;
using Microsoft.AspNetCore.Http;
using CoreDAL.Utilities;
using CoreDAL.MultiTenancy.TenantUser.Models;
using Common.Middleware;

namespace CoreAPI
{
    [HistaffAuthorize()]
    [Produces("application/json")]
    [Route("api/authen/[action]")]
    public class AuthenticationController : BaseController
    {
        private readonly IConfiguration _config;
        private readonly UserManager<SysUser> _userManager;
        private readonly SignInManager<SysUser> _signInManager;
        private readonly IProfileBusiness _ProfileBusiness;
        private readonly IRefreshTokenService _refreshTokenService;

        public AuthenticationController(
            IConfiguration configuration,
            UserManager<SysUser> userManager,
            SignInManager<SysUser> signInManager,
            IUnitOfWork unitOfWork,
            IProfileBusiness ProfileBusiness,
            IRefreshTokenService refreshTokenService
        ) : base(unitOfWork)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _config = configuration;
            _ProfileBusiness = ProfileBusiness;
            _refreshTokenService = refreshTokenService;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> ClientsLogin([FromBody] LoginTenantViewModel Credentials)
        {
            try
            {
                if (Credentials == null) return Unauthorized();
                string ipAddress = IpAddress();
                var r = await _unitOfWork.Tenants.ClientsLogin(Credentials.Username, Credentials.Password, ipAddress);
                if (r.Error != null)
                {
                    return TLAResult(r);
                }

                AuthResponse user = r.Data as AuthResponse;
                if (user != null)
                {
                    var claims = new[]
                    {
                    new Claim(JwtRegisteredClaimNames.Sid, user.Id),
                    new Claim(JwtRegisteredClaimNames.Typ, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Iat, user.EmpId.ToString()),
                    new Claim("IsAdmin", user.IsAdmin.ToString())
                };

                    string tokenString = BuildToken(claims, 1, 1);
                    AuthResponse data = new AuthResponse();
                    data.UserName = user.UserName;
                    data.FullName = user.FullName;
                    data.Avatar = user.Avatar;
                    data.IsAdmin = user.IsAdmin;
                    data.Token = tokenString;
                    data.PermissionParams = user.PermissionParams;
                    data.RefreshToken = user.RefreshToken;

                    dynamic res = await _ProfileBusiness.UserOrganiRepository.GetOrgPermission(user.Id, (int)user.TenantId, (bool)user.IsAdmin);
                    data.OrgIds = res.Data;

                    SetTokenCookie(user.RefreshToken.TOKEN);

                    return TLAResult(new ResultWithError(data));
                }
                else
                {
                    return new JsonResult("WAR_UNABLE_TO_SIGN_IN") { StatusCode = 401 };
                }
            }
            catch (Exception ex)
            {
                return Ok(ex.Message);
            }
        }

        public class RefreshTokenObject
        {
            public string token { get; set; }
        }    
        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenObject refreshTokenObject )
        {
            try
            {
                string refreshTokenString;
                if (refreshTokenObject.token == null )
                {
                    refreshTokenString = Request.Cookies["HiStaffRefreshToken"];
                }
                else
                {
                    refreshTokenString = refreshTokenObject.token;// Request.Cookies["HiStaffRefreshToken"];

                }
                
                string ipAddress = IpAddress();

                var previousUser = await _refreshTokenService.GetUserByRefreshToken(refreshTokenString);

                if (previousUser == null)
                {
                    return BadRequest("RefreshToken would not return any user.");
                }

                var tokenCheck = await _refreshTokenService.CheckRefreshToken(refreshTokenString, ipAddress);

                if (!tokenCheck.Success) return BadRequest(tokenCheck.Message);

                var r = await _unitOfWork.Tenants.ClientsLogin(
                    previousUser.USER_NAME,
                    previousUser.PASSWORD_HASH,
                    ipAddress,
                    true,
                    tokenCheck.NewRefreshToken
                    );
                if (r.Error != null)
                {
                    return TLAResult(r);
                }

                AuthResponse user = r.Data as AuthResponse;

                if (user != null)
                {
                    var claims = new[]
                    {
                    new Claim(JwtRegisteredClaimNames.Sid, user.Id),
                    new Claim(JwtRegisteredClaimNames.Typ, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Iat, user.EmpId.ToString()),
                    new Claim("IsAdmin", user.IsAdmin.ToString())
                };

                    string tokenString = BuildToken(claims, 1, 1);
                    AuthResponse data = new AuthResponse();
                    data.UserName = user.UserName;
                    data.FullName = user.FullName;
                    data.Avatar = user.Avatar;
                    data.IsAdmin = user.IsAdmin;
                    data.Token = tokenString;
                    data.PermissionParams = user.PermissionParams;
                    data.RefreshToken = user.RefreshToken;

                    dynamic res = await _ProfileBusiness.UserOrganiRepository.GetOrgPermission(user.Id, (int)user.TenantId, (bool)user.IsAdmin);
                    data.OrgIds = res.Data;

                    SetTokenCookie(user.RefreshToken.TOKEN);

                    return TLAResult(new ResultWithError(data));
                }
                else
                {
                    return new JsonResult("WAR_UNABLE_TO_REFRESH_TOKEN") { StatusCode = 401 };
                }
            }
            catch (Exception ex)
            {
                return Ok(ex.Message);
            }
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> SignInSys([FromBody] LoginModel Credentials)
        {
            try
            {
                if (Credentials == null) return Unauthorized();
                string tokenString = string.Empty;
                var user = await _userManager.FindByNameAsync(Credentials.Username);

                if (user != null)
                {
                    if (!user.LockoutEnabled)
                    {
                        return new JsonResult("WAR_USER_LOCKED") { StatusCode = 400 };
                    }
                    var result = await _signInManager.CheckPasswordSignInAsync(user, Credentials.Password, false);
                    if (result.Succeeded)
                    {
                        var r = await _unitOfWork.SysUsers.GetPermissonByUser(user.Id);

                        if (r.Error != null)
                        {
                            return TLAResult(r);
                        }
                        LoginParam userData = r.Data as LoginParam;
                        var claims = new[]
                        {
                            new Claim(JwtRegisteredClaimNames.Iat, user.UserName),
                            new Claim(JwtRegisteredClaimNames.Sid, user.Id),
                            new Claim(JwtRegisteredClaimNames.Sub, userData.IsAdmin.ToString())
                        };
                        tokenString = BuildToken(claims, 1, 1);
                        userData.Token = tokenString;
                        return TLAResult(new ResultWithError(userData));
                    }
                    else
                    {
                        return new JsonResult("WAR_PASSWORD_ISCORECT") { StatusCode = 400 };
                    }
                }
                else
                {
                    return new JsonResult("WAR_UNABLE_TO_SIGN_IN") { StatusCode = 400 };
                }
            }
            catch (Exception ex)
            {

                return new JsonResult(ex.Message) { StatusCode = 401 };
            }
        }


        [HttpGet]
        public async Task<ActionResult> GetAll(SysUserDTO param)
        {
            var r = await _unitOfWork.SysUsers.GetAll(param);
            return Ok(r);
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] SysUserInputDTO Credentials)
        {
            // VALID REQUIRE
            if (Credentials.UserName == null || Credentials.UserName.Trim().Length == 0)
            {
                return TLAResult("USERNAME_NOT_BLANK");
            }
            if (Credentials.Password == null || Credentials.Password.Trim().Length == 0)
            {
                return TLAResult("PASSWORD_NOT_BLANK");
            }
            if (Credentials.GroupId == 0)
            {
                return TLAResult("GROUP_NOT_BLANK");
            }
            var r = await _unitOfWork.SysUsers.CreateUserAsync(Credentials);
            return new JsonResult(r);
        }

        [HttpPost]
        public async Task<IActionResult> UpdateUser([FromBody] SysUserInputDTO Credentials)
        {
            // VALID REQUIRE
            if (Credentials.Id == null)
            {
                return TLAResult("USER_NOT_EXIST");
            }
            if (Credentials.UserName == null || Credentials.UserName.Trim().Length == 0)
            {
                return TLAResult("USERNAME_NOT_BLANK");
            }
            if (Credentials.Password == null || Credentials.Password.Trim().Length == 0)
            {
                return TLAResult("PASSWORD_NOT_BLANK");
            }
            if (Credentials.GroupId == 0)
            {
                return TLAResult("GROUP_NOT_BLANK");
            }

            var r = await _unitOfWork.SysUsers.UpdateUserAsync(Credentials);
            return TLAResult(r);
        }

        [HttpPost]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordParam param)
        {
            if (param.UserName == null || param.UserName.Trim().Length == 0)
            {
                return TLAResult("USERNAME_NOT_BLANK");
            }
            if (param.CurrentPassword == null || param.CurrentPassword.Trim().Length == 0)
            {
                return TLAResult("CURRENT_PASS_NOT_BLANK");
            }
            if (param.NewPassword == null || param.NewPassword.Trim().Length == 0)
            {
                return TLAResult("NEW_PASS_NOT_BLANK");
            }
            var r = await _unitOfWork.SysUsers.ChangePasswordAsync(param.UserName, param.CurrentPassword, param.NewPassword);
            return TLAResult(r);
        }

        [HttpPost]
        public async Task<IActionResult> SetLockoutEnabledAsync([FromBody] SetEnableParam param)
        {
            if (param.UserName == null || param.UserName.Trim().Length == 0)
            {
                return TLAResult("USERNAME_NOT_BLANK");
            }
            var r = await _unitOfWork.SysUsers.SetLockoutEnabledAsync(param.UserName, param.Enable);
            return TLAResult(r);
        }

        [HttpPost]
        public async Task<IActionResult> Logout([FromBody] SysUserInputDTO Credentials)
        {
            // var accessToken = await HttpContext.GetTokenAsync("Bearer", "access_token");
            //  HttpContext.Abort();

            await _signInManager.SignOutAsync();
            return Ok();
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> SignInTenantHR([FromBody] LoginTenantViewModel Credentials)
        {
            try
            {
                if (Credentials == null) return Unauthorized();

                var r = await _unitOfWork.Tenants.TenantLogin(Credentials.Username, Credentials.Password);
                if (r.Error != null)
                {
                    return TLAResult(r);
                }

                LoginParam user = r.Data as LoginParam;
                if (user != null)
                {
                    var claims = new[]
                    {
                    new Claim(JwtRegisteredClaimNames.Sid, user.Id),
                    new Claim(JwtRegisteredClaimNames.Typ, user.UserName),
                    new Claim("IsAdmin", user.IsAdmin.ToString())
                };

                    string tokenString = BuildToken(claims, 1, 1);
                    LoginOutput data = new LoginOutput();
                    data.UserName = user.UserName;
                    data.FullName = user.FullName;
                    data.Avatar = user.Avatar;
                    data.IsAdmin = user.IsAdmin;
                    data.Token = tokenString;
                    data.PermissionParams = user.PermissionParams;

                    dynamic res = await _ProfileBusiness.UserOrganiRepository.GetOrgPermission(user.Id, (int)user.TenantId, (bool)user.IsAdmin);
                    data.OrgIds = res.Data;

                    return TLAResult(new ResultWithError(data));
                }
                else
                {
                    return new JsonResult("WAR_UNABLE_TO_SIGN_IN") { StatusCode = 401 };
                }
            }
            catch (Exception ex)
            {
                return Ok(ex.Message);
            }
        }



        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> SignInPortalHR([FromBody] LoginTenantViewModel Credentials)
        {
            if (Credentials == null) return Unauthorized();
            var r = await _unitOfWork.Tenants.SignInPortalHR(Credentials.Username, Credentials.Password, SysERP.HR, Credentials.FcmToken, Credentials.DeviceId);
            if (r.Error != null)
            {
                return TLAResult(r);
            }

            LoginParam user = r.Data as LoginParam;
            if (user != null)
            {
                string[] username = user.UserName.Split("_");
                var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sid, user.Id),
                    new Claim(JwtRegisteredClaimNames.Typ, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Iat, user.EmpId.ToString()),
                    new Claim(JwtRegisteredClaimNames.Azp, user.TenantId.ToString())
                };

                string tokenString = BuildToken(claims, 300, 1);
                LoginOutput data = new LoginOutput();
                data.Id = user.Id;
                data.UserName = username[1];
                data.FullName = user.FullName;
                data.Avatar = user.Avatar;
                data.IsAdmin = user.IsAdmin;
                data.Token = tokenString;
                data.PermissionParams = user.PermissionParams;
                return TLAResult(new ResultWithError(data));

            }
            else
            {
                return new JsonResult("WAR_UNABLE_TO_SIGN_IN") { StatusCode = 401 };
            }
        }

        private string BuildToken(Claim[] claims, int day, int type)
        {
            /*
            var tokenHandler = new JwtSecurityTokenHandler();
            var secretKey = Encoding.ASCII.GetBytes(_config["JwtToken:SecretKey"]);
            var expires = DateTime.Now.AddSeconds(50); // for testing
            //var expires = DateTime.UtcNow.AddMinutes(15);
            var utcMilliseconds = new DateTimeOffset(expires).ToUnixTimeMilliseconds();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = expires,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(secretKey), SecurityAlgorithms.HmacSha256Signature)
            };
            var jwtToken = tokenHandler.CreateToken(tokenDescriptor);
            string tokenString = tokenHandler.WriteToken(jwtToken);
            return tokenString;
            */

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JwtToken:SecretKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            if (type == 1)
            {
                var token = new JwtSecurityToken(
                _config["JwtToken:Issuer"],
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

                //For testing
                // expires: DateTime.Now.AddSeconds(30),

                 signingCredentials: creds);
                return new JwtSecurityTokenHandler().WriteToken(token);
            }

        }
        public class LoginModel
        {
            public string Username { get; set; }
            public string Password { get; set; }
        }

        public class LoginTenantViewModel
        {

            public string Username { get; set; }
            public string Password { get; set; }
            public string FcmToken { get; set; }
            public string DeviceId { get; set; }
        }
        [HttpGet]
        public async Task<ActionResult> GetList()
        {
            var r = await _unitOfWork.SysUsers.GetList();

            return TLAResult(r);
        }

        private void SetTokenCookie(string token)
        {
            // append cookie with refresh token to the http response
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTime.UtcNow.AddDays(7)
            };
            Response.Cookies.Append("HiStaffRefreshToken", token, cookieOptions);
        }

        private void DeleteTokenCookie()
        {
            Response.Cookies.Delete("HiStaffRefreshToken");
        }

        private string IpAddress()
        {
            // get source ip address for the current request
            if (Request.Headers.ContainsKey("X-Forwarded-For"))
                return Request.Headers["X-Forwarded-For"];
            else
                return HttpContext.Connection.RemoteIpAddress.MapToIPv4().ToString();
        }
    }
}
