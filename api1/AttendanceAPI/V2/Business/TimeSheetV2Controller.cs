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
    [Route("api/v2/TimeSheetDaily/[action]")]
    public class TimeSheetV2Controller : BaseController2
    {
        public TimeSheetV2Controller(IAttendanceBusiness unitOfWork) : base(unitOfWork)
        {

        }

        [HttpGet]
        public async Task<ActionResult> GetAll(TimeSheetDailyDTO param)
        {
            var r = await _unitOfWork.TimeSheetDailyRepository.V2GetAll(param);
            return Ok(r);
        }

    }
}
