using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using AttendanceDAL.Repositories;
using AttendanceDAL.ViewModels;
using System.Collections.Generic;

namespace AttendanceAPI.List
{
    [Common.Middleware.HistaffAuthorize()]
    [Produces("application/json")]
    [Route("api/hr/TimeSheetMonthly/[action]")]
    public class TimeSheetMonthlyController : BaseController2
    {
        public TimeSheetMonthlyController(IAttendanceBusiness unitOfWork) : base(unitOfWork)
        {

        }
        [HttpGet]
        public async Task<ActionResult> ListTimeSheetMonthly(TimeSheetMonthlyDTO param)
        {
            var r = await _unitOfWork.TimeSheetMonthlyRepository.ListTimeSheetMonthly(param);
            return Ok(r);
        }

        [HttpGet]
        public async Task<ActionResult> GetListFormula(TimeSheetFomulaDTO param)
        {
            var r = await _unitOfWork.TimeSheetMonthlyRepository.GetListFormula(param);
            return Ok(r);
        }
        [HttpPost]
        public async Task<ActionResult> UpdateFormula([FromBody] TimeSheetFomulaInputDTO param)
        {
            var r = await _unitOfWork.TimeSheetMonthlyRepository.UpdateFormula(param);
            return Ok(r);
        }


        [HttpPost]
        public async Task<ActionResult> SumWork([FromBody] TimeSheetInputDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.TimeSheetMonthlyRepository.SumWork(param);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> ImportSwipeData([FromBody] List<SwipeDataInput> param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.TimeSheetMonthlyRepository.ImportSwipeData(param);
            return TLAResult(r);
        }

        [HttpPost]
        public async Task<ActionResult> ImportSwipeDataNew([FromBody] SwipeImportnput param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.TimeSheetMonthlyRepository.ImportSwipeDataNew(param);
            return TLAResult(r);
        }

        [HttpGet]
        public async Task<ActionResult> ListSwipeData(SwipeDataDTO param)
        {
            var r = await _unitOfWork.TimeSheetMonthlyRepository.ListSwipeData(param);
            return Ok(r.Data);
        }

        [HttpGet]
        public async Task<ActionResult> LockTimeSheet(TimeSheetLockInputDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.TimeSheetMonthlyRepository.LockTimeSheet(param);
            return Ok(r);
        }
        [HttpGet]
        public async Task<ActionResult> IsLockTimeSheet(TimeSheetLockInputDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.TimeSheetMonthlyRepository.IsLockTimeSheet(param);
            return Ok(r);
        }

        [HttpGet]
        public async Task<ActionResult> PortalGetBY(int periodId)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            try
            {
                var r = await _unitOfWork.TimeSheetMonthlyRepository.PortalGetBY(periodId);
                return TLAResult(r);
            }
            catch (System.Exception ex)
            {

                return Ok(ex.Message);
            }
           
        }
    
        [HttpPost]
        public async Task<ActionResult> UpdateTimeSheetMachine([FromBody] MaChineInput param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            try
            {
                var r = await _unitOfWork.TimeSheetMonthlyRepository.UpdateTimeSheetMachine(param);
                return TLAResult(r);
            }
            catch (System.Exception ex)
            {

                return Ok(ex.Message);
            }

        }
        [HttpGet]
        public async Task<ActionResult> ListEntitlement(EntitlementDTO param)
        {
            var r = await _unitOfWork.TimeSheetMonthlyRepository.ListEntitlement(param);
            return Ok(r);
        }

        [HttpGet]
        public async Task<ActionResult> ReportSwipeData(SwipeDataReport param)
        {
            var r = await _unitOfWork.TimeSheetMonthlyRepository.ReportSwipeData(param);
            return Ok(r);
        }

        [HttpPost]
        public async Task<ActionResult> ReportSwipeDataExp([FromBody] SwipeDataReport param)
        {
            try
            {
                var stream = await _unitOfWork.TimeSheetMonthlyRepository.ReportSwipeDataExp(param);
                var fileName = "BaoCaoChamCong.xlsx";
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
        public async Task<ActionResult> CalEntitlement([FromBody] TimeSheetInputDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.TimeSheetMonthlyRepository.CalEntitlement(param);
            return TLAResult(r);
        }

        [HttpPost]
        public async Task<ActionResult> ReadMCC([FromBody] TimeSheetInputDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.TimeSheetMonthlyRepository.ReadMCC(param);
            return TLAResult(r);
        }

    }
}
