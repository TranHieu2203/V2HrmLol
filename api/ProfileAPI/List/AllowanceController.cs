using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using ProfileDAL.Repositories;
using ProfileDAL.ViewModels;
using PayrollDAL.Repositories;
using Common.Extensions;

namespace ProfileAPI.List
{
    [Common.Middleware.HistaffAuthorize()]
    [Produces("application/json")]
    [Route("api/hr/Allowance/[action]")]
    public class AllowanceController : BaseController1
    {
        public AllowanceController(IProfileBusiness unitOfWork, IPayrollBusiness payrollBusiness ) : base(unitOfWork, payrollBusiness)
        {

        }
        [HttpGet]
        public async Task<ActionResult> GetAll(AllowanceViewDTO param)
        {
            var r = await _unitOfWork.AllowanceRepository.GetAll(param);
            return Ok(r);
        }
        [HttpGet]
        public async Task<ActionResult> Get(int Id)
        {
            var r = await _unitOfWork.AllowanceRepository.GetById(Id);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Add([FromBody] AllowanceInputDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = new ReferParam();
            r.Name = param.Name;
            r.Code = param.Code;
            var x = await _payrollBusiness.SalaryElementRepository.AllowanceToElement(r,1);
            if(x.StatusCode == "400")
            {
                return TLAResult(x);
            }
            var y = await _unitOfWork.AllowanceRepository.CreateAsync(param);
            
            return TLAResult(y);
        }
        [HttpPost]
        public async Task<ActionResult> Update([FromBody] AllowanceInputDTO param)
        {

            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.AllowanceRepository.UpdateAsync(param);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> ChangeStatus([FromBody] List<int> ids)
        {
            var r = await _unitOfWork.AllowanceRepository.ChangeStatusAsync(ids);
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> GetList()
        {
            var r = await _unitOfWork.AllowanceRepository.GetList();
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> CheckAllowIsUsed(string code)
        {
            var r = await _unitOfWork.AllowanceRepository.CheckAllowIsUsed(code);
            return TLAResult(r);
        }
    }
}
