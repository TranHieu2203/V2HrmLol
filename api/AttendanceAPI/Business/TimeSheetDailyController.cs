using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using AttendanceDAL.Repositories;
using AttendanceDAL.ViewModels;
using Common.Extensions;

namespace AttendanceAPI.List
{
    [Common.Middleware.HistaffAuthorize()]
    [Produces("application/json")]
    [Route("api/hr/TimeSheetDaily/[action]")]
    public class TimeSheetDailyController : BaseController2
    {
        public TimeSheetDailyController(IAttendanceBusiness unitOfWork) : base(unitOfWork)
        {

        }

        [HttpGet]
        public async Task<ActionResult> GetAll(TimeSheetDailyDTO param)
        {
            var r = await _unitOfWork.TimeSheetDailyRepository.GetAll(param);
            return Ok(r);
        }

        [HttpGet]
        public async Task<ActionResult> CheckQRCode(string code, string ip)
        {
            var r = await _unitOfWork.TimeSheetDailyRepository.CheckQRCode(code, ip);
            return Ok(r);
        }

        [HttpPost]
        public async Task<ActionResult> Update([FromBody] TimeSheetDailyInputDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.TimeSheetDailyRepository.UpdateAsync(param);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> CalTimesheetDaily([FromBody] TimeSheetInputDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.TimeSheetDailyRepository.CalTimesheetDaily(param);
            return TLAResult(r);
        }

        /// <summary>
        /// CHấm công ScanQR code
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult> PortalUpTime([FromBody] SwipeDataGPRSDTO param)
        {

            var check = await _unitOfWork.TimeSheetDailyRepository.CheckWifi(param.WifiIp);
            if (check.StatusCode == "400")
            {
                return Ok(new ResultWithError("WIFI_INCORRECT"));
            }

            var r = await _unitOfWork.TimeSheetDailyRepository.PortalUpTimeGPRS(param);

            return TLAResult(r);



        }
        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult> TenantUpTime([FromBody] SwipeDataTenantDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.TimeSheetDailyRepository.TenantUpTime(param);
            return TLAResult(r);
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult> GetWifiMac()
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = _unitOfWork.TimeSheetDailyRepository.GetWifiMac();
            return TLAResult(r);
        }

        [HttpGet]
        public async Task<ActionResult> MapKeeping(paramSearch param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.TimeSheetDailyRepository.MapKeeping(param);
            return TLAResult(r);
        }

        [HttpGet]
        public async Task<ActionResult> V2GetAll(TimeSheetDailyDTO param)
        {
            var r = await _unitOfWork.TimeSheetDailyRepository.V2GetAll(param);
            return Ok(r);
        }

    }
}
