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
    [Route("api/portal/Employee/[action]")]
    public class PortalEmployeeController : BaseController1
    {
        public PortalEmployeeController(IProfileBusiness unitOfWork) : base(unitOfWork)
        {

        }
       

        [HttpPost]
        public async Task<ActionResult> EditInfomation([FromBody] EmployeeEditInput param)
        {
            var r = await _unitOfWork.EmployeeRepository.PortalEditInfomation(param);
            return Ok(r);
        }

        [HttpPost]
        public async Task<ActionResult> AddSituation([FromBody] SituationEditDTO param)
        {
            var r = await _unitOfWork.EmployeeRepository.PortalAddSituation(param);
            return Ok(r);
        }

    }
}
