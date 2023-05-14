using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using AttendanceDAL.Repositories;
using AttendanceDAL.ViewModels;
using Common.Middleware;

namespace AttendanceAPI.List
{
    [HistaffAuthorize()]
    [Produces("application/json")]
    [Route("api/hr/DayOffYear/[action]")]
    public class DayOffYearController : BaseController2
    {
        public DayOffYearController(IAttendanceBusiness unitOfWork) : base(unitOfWork)
        {

        }
        [HttpGet]
        public async Task<ActionResult> GetAll(DayOffYearDTO param)
        {
            var r = await _unitOfWork.DayOffYearRepository.GetAll(param);
            return Ok(r);
        }
        [HttpGet]
        public async Task<ActionResult> GetById()
        {
            var r = await _unitOfWork.DayOffYearRepository.GetById();
            return Ok(r);
        }

        [HttpPost]
        public async Task<ActionResult> Update([FromBody] DayOffYearConfigDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.DayOffYearRepository.UpdateAsync(param);
            return TLAResult(r);
        }

    }
}
