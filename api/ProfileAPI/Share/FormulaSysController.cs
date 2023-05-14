using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using ProfileDAL.Repositories;
using ProfileDAL.ViewModels;

namespace ProfileAPI.Share
{
    [Common.Middleware.HistaffAuthorize()]
    [Produces("application/json")]
    [Route("api/hr/formulasys/[action]")]
    public class FormulaSysController : BaseController1
    {
        public FormulaSysController(IProfileBusiness unitOfWork) : base(unitOfWork)
        {

        }


        [HttpGet]
        public async Task<ActionResult> GetElementCal(FormulaSysDTO values)
        {
            var r = await _unitOfWork.FormulaSysRepository.GetElementCal(values);
            return Ok(r);
        }

        [HttpPost]
        public async Task<ActionResult> Update([FromBody] FormulaSysInputDTO param)
        {

            var r = await _unitOfWork.FormulaSysRepository.Update(param);
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> ListPayrollSum(PayrollSysSumDTO param)
        {

            var r = await _unitOfWork.FormulaSysRepository.ListPayrollSum(param);
            return Ok(r);
        }
        [HttpGet]
        public async Task<ActionResult> MBPayrollSum(PayrollSysInputMobile param)
        {

            var r = await _unitOfWork.FormulaSysRepository.MBPayrollSum(param);
            return Ok(r);
        }
        [HttpPost]
        public async Task<ActionResult> PayrollCal([FromBody] PayrollSysInputDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.FormulaSysRepository.PayrollCal(param);
            return Ok(r);
        }
        [HttpPost]
        public async Task<ActionResult> CheckTimesheetLock([FromBody] PayrollSysInputDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.FormulaSysRepository.CheckTimesheetLock(param);
            return Ok(r);
        }
        [HttpGet]
        public async Task<ActionResult> ListImportPayroll(PayrollSysSumDTO param)
        {

            var r = await _unitOfWork.FormulaSysRepository.ListImportPayroll(param);
            return Ok(r);
        }
    }
}
