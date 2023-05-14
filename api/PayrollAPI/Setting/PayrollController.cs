using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using PayrollDAL.ViewModels;
using PayrollDAL.Repositories;

namespace PayrollAPI.List
{
    [Common.Middleware.HistaffAuthorize()]
    [Produces("application/json")]
    [Route("api/payroll/[action]")]
    public class PayrollController : BaseController
    {
        public PayrollController(IPayrollBusiness unitOfWork) : base(unitOfWork)
        {

        }

        [HttpGet]
        public async Task<ActionResult> PortalGetBy(int periodId)
        {

            var r = await _unitOfWork.FormulaRepository.PortalGetBy(periodId);
            return Ok(r);
        }
        [HttpGet]
        public async Task<ActionResult> CheckPayrollLock(LockInputDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.FormulaRepository.IsLockPayroll(param);
            return Ok(r);
        }
        [HttpGet]
        public async Task<ActionResult> LockPayroll(LockInputDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.FormulaRepository.LockPayroll(param);
            return Ok(r);
        }
    }
}
