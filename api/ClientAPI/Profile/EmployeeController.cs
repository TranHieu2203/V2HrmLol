
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using ClientDAL.Models;
using ClientDAL.Repositories;
using ClientDAL.ViewModels;

namespace ClientAPI.Profile
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Produces("application/json")]
    [Route("api/profile/[action]")]
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

        public async Task<ActionResult> GetEmployee(EmployeeDTO param)
        {
            try
            {
                var r = await _unitOfWork.Employees.GetAll(param);
                return Ok(r);
            }
            catch (System.Exception ex)
            {
                var s = ex;
                throw;
            }
           
        }
    
    }
}
