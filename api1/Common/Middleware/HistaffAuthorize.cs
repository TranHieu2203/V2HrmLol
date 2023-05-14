using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.Extensions.DependencyInjection;
using System.DirectoryServices.Protocols;
using System.Net;
using System.Security.Claims;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.AspNetCore.Mvc.Authorization;

namespace Common.Middleware
{
    public class HistaffAuthorizeAttribute : TypeFilterAttribute
    {
        public HistaffAuthorizeAttribute(string claimType="", string claimValue="") : base(typeof(HistaffAuthorizeFilter))
        {
            Arguments = new object[] { new Claim(claimType, claimValue) };
        }
    }
  

    public class HistaffAuthorizeFilter : IAuthorizationFilter
    {
        readonly Claim _claim;

        public HistaffAuthorizeFilter(Claim claim)
        {
            _claim = claim;
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var check = context.ActionDescriptor.EndpointMetadata.FirstOrDefault(x => x.GetType().Name == "AllowAnonymousAttribute");
            if (check != null)
            {
                return;
            }

            var hasClaim = context.HttpContext.User.Claims.Any(c => c.Type == _claim.Type && c.Value == _claim.Value);
            var UserName = context.HttpContext?.User.FindFirst(JwtRegisteredClaimNames.Typ)?.Value?.Trim();

            var authorization = context.HttpContext.Request.Headers.ContainsKey("Authorization");
            var token = context.HttpContext.Request.Headers["Authorization"][0].Substring("Bearer ".Length);

            var tokenInfo = JWTHelper.GetTokenInfo(token);

            if (tokenInfo.exp < DateTime.UtcNow)
            {
                context.Result = new UnauthorizedResult();
            }
           
        }
    }


}
