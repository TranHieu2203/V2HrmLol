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
    [Route("api/payroll/element/[action]")]
    public class SalaryElementController : BaseController
    {
        public SalaryElementController(IPayrollBusiness unitOfWork) : base(unitOfWork)
        {

        }

        [HttpGet]
        public async Task<ActionResult> GetAll(SalaryElementDTO values)
        {
            var r = await _unitOfWork.SalaryElementRepository.GetAll(values);
            return Ok(r);
        }

        [HttpGet]
        public async Task<ActionResult> Get(int Id)
        {
            var r = await _unitOfWork.SalaryElementRepository.GetById(Id);
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> GetListGroup()
        {
            var r = await _unitOfWork.SalaryElementRepository.GetListGroup();
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> GetList(int groupid)
        {
            var r = await _unitOfWork.SalaryElementRepository.GetList(groupid);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Add([FromBody] SalaryElementInputDTO param)
        {

            var r = await _unitOfWork.SalaryElementRepository.CreateAsync(param);
            return TLAResult(r);
        }

        [HttpPost]
        public async Task<ActionResult> Update([FromBody] SalaryElementInputDTO param)
        {

            var r = await _unitOfWork.SalaryElementRepository.UpdateAsync(param);
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> GetSalaryElement(long groupId)
        {
            var r = await _unitOfWork.SalaryElementRepository.GetSalaryElement(groupId);
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> GetSalaryElementSys()
        {
            var r = await _unitOfWork.SalaryElementRepository.GetSalaryElementSys();
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> GetListCal(int SalaryTypeId)
        {
            var r = await _unitOfWork.SalaryElementRepository.GetListCal(SalaryTypeId);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> ChangeStatus([FromBody] List<int> ids)
        {
            var r = await _unitOfWork.SalaryElementRepository.ChangeStatusAsync(ids);
            return TLAResult(r);
        }

        [HttpPost]
        public async Task<ActionResult> ShiftToElement([FromBody] ReferParam param)
        {
            var r = await _unitOfWork.SalaryElementRepository.AllowanceToElement(param, 2);
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> GetListAll()
        {
            var r = await _unitOfWork.SalaryElementRepository.GetListAll();
            return TLAResult(r);
        }
        
    }
}
