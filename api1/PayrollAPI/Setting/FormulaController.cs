using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using PayrollDAL.ViewModels;
using PayrollDAL.Repositories;
using System.Collections.Generic;
using Common.Extensions;

namespace PayrollAPI.List
{
    [Common.Middleware.HistaffAuthorize()]
    [Produces("application/json")]
    [Route("api/payroll/formula/[action]")]
    public class FormulaController : BaseController
    {
        public FormulaController(IPayrollBusiness unitOfWork) : base(unitOfWork)
        {

        }


        [HttpGet]
        public async Task<ActionResult> GetElementCal(FormulaDTO values)
        {
            var r = await _unitOfWork.FormulaRepository.GetElementCal(values);
            return Ok(r);
        }

        [HttpPost]
        public async Task<ActionResult> Update([FromBody] FormulaInputDTO param)
        {

            var r = await _unitOfWork.FormulaRepository.Update(param);
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> ListPayrollSum(PayrollSumDTO param)
        {

            var r = await _unitOfWork.FormulaRepository.ListPayrollSum(param);
            return Ok(r.Data);
        }
        [HttpGet]
        public async Task<ActionResult> MBPayrollSum(PayrollInputMobile param)
        {

            var r = await _unitOfWork.FormulaRepository.MBPayrollSum(param);
            return Ok(r);
        }
        [HttpPost]
        public async Task<ActionResult> PayrollCal([FromBody] PayrollInputDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.FormulaRepository.PayrollCal(param);
            return Ok(r);
        }
        [HttpPost]
        public async Task<ActionResult> CheckTimesheetLock([FromBody] PayrollInputDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.FormulaRepository.CheckTimesheetLock(param);
            return Ok(r);
        }
        [HttpPost]
        public async Task<ActionResult> MoveTableIndex([FromBody] List<TempSortInputDTO> param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.FormulaRepository.MoveTableIndex(param, OtherConfig.SORT_FML_PAYROLL);
            return Ok(r);
        }
    }
}
