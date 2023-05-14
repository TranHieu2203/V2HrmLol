using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using AttendanceDAL.Repositories;
using AttendanceDAL.ViewModels;

namespace AttendanceAPI.List
{
    [Common.Middleware.HistaffAuthorize()]
    [Produces("application/json")]
    [Route("api/v2/attendance/config/[action]")]
    public class ConfigController : BaseController2
    {
        public ConfigController(IAttendanceBusiness unitOfWork) : base(unitOfWork)
        {

        }

        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var r = await _unitOfWork.ConfigRepository.GetConfig();
            return Ok(r);
        }

        [HttpPost]
        public async Task<ActionResult> Update([FromBody] ConfigDTO param)
        {
            var r = await _unitOfWork.ConfigRepository.UpdateAsync(param);
            return Ok(r);
        }

    }
}
