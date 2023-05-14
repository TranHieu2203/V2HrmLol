using Microsoft.AspNetCore.Http;
using CoreDAL.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Identity;
using CoreDAL.Models;

namespace CoreDAL
{
    public class HttpUnitOfWork : UnitOfWork
    {
        public HttpUnitOfWork(CoreDbContext context, UserManager<ApplicationUser> userManager,IHttpContextAccessor httpAccessor) : base(context, userManager)
        {
            context.CurrentUserId = httpAccessor.HttpContext?.User.FindFirst(JwtRegisteredClaimNames.Azp)?.Value?.Trim();
        }
    }
}
