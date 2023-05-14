using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using AttendanceDAL.Repositories;
using Common.Extensions;

namespace AttendanceAPI.List
{
    [Common.Middleware.HistaffAuthorize()]
    [Produces("application/json")]
    [Route("api/attendance/report/[action]")]
    public class ReportController : BaseController2
    {
        public ReportController(IAttendanceBusiness unitOfWork) : base(unitOfWork)
        {

        }


        [HttpPost]
        public async Task<ActionResult> AT002([FromBody] ParaInputReport param)
        {
            try
            {
                var stream = await _unitOfWork.ReportRepository.AT002(param);
                var fileName = "KeHoachCong.xlsx";
                if (stream.StatusCode == "200")
                {
                    return new FileStreamResult(stream.memoryStream, "application/octet-stream") { FileDownloadName = fileName };
                }
                return TLAResult(stream);
            }
            catch (System.Exception ex)
            {
                return TLAResult(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult> AT003([FromBody] ParaInputReport param)
        {
            try
            {
                var stream = await _unitOfWork.ReportRepository.AT003(param);
                var fileName = "BangCong.xlsx";
                if (stream.StatusCode == "200")
                {
                    return new FileStreamResult(stream.memoryStream, "application/octet-stream") { FileDownloadName = fileName };
                }
                return TLAResult(stream);
            }
            catch (System.Exception ex)
            {
                return TLAResult(ex.Message);
            }
        }
    }
}
