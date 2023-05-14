using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using PayrollDAL.ViewModels;
using PayrollDAL.Repositories;
using System.Collections.Generic;
using Common.Middleware;

namespace PayrollAPI.List
{
    [Common.Middleware.HistaffAuthorize()]
    [Produces("application/json")]
    [Route("api/payroll/elementgroup/[action]")]
    public class ElementGroupController : BaseController
    {
        public ElementGroupController(IPayrollBusiness unitOfWork) : base(unitOfWork)
        {

        }

        [HttpGet]
        public async Task<ActionResult> GetAll(ElementGroupDTO values)
        {
            var r = await _unitOfWork.ElementGroupRepository.GetAll(values);
            return Ok(r);
        }

        [HttpGet]
        public async Task<ActionResult> Get(int Id)
        {
            var r = await _unitOfWork.ElementGroupRepository.GetById(Id);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Add([FromBody]ElementGroupInputDTO param)
        {

            var r = await _unitOfWork.ElementGroupRepository.CreateAsync(param);
            return TLAResult(r);
        }

        [HttpPost]
        // old update
        // new udateElement
        public async Task<ActionResult> UpdateElement([FromBody]ElementGroupInputDTO param)
        {

            var r = await _unitOfWork.ElementGroupRepository.UpdateAsync(param);
            return TLAResult(r);
        }

        [HttpPost]
        public async Task<ActionResult> Update([FromBody]List<int> ids)
        {

            var r = await _unitOfWork.ElementGroupRepository.ChangeStatusAsync(ids);
            return TLAResult(r);
        }

        [HttpGet]
        public async Task<ActionResult> GetList()
        {
            var r = await _unitOfWork.ElementGroupRepository.GetList();
            return TLAResult(r);
        }
    }
}
