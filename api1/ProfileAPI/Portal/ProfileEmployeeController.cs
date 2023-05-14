using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using ProfileDAL.Repositories;
using ProfileDAL.ViewModels;

namespace ProfileAPI.List
{
    [Common.Middleware.HistaffAuthorize()]
    [Produces("application/json")]
    [Route("api/clients/Employee/[action]")]
    public class ProfileEmployeeController : BaseController1
    {
        public ProfileEmployeeController(IProfileBusiness unitOfWork) : base(unitOfWork)
        {

        }

        //[HttpGet]
        //public async Task<ActionResult> GetEmployeeInfo(EmployeeDTO param)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return TLAValidation();
        //    }
        //    var r = await _unitOfWork.EmployeeRepository.GetEmployeeInfo(param);
        //    return TLAResult(r);

        //}


    }
}
