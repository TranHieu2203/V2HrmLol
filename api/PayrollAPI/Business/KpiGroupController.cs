using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using PayrollDAL.ViewModels;
using PayrollDAL.Repositories;
using System.Collections.Generic;

namespace PayrollAPI.List
{
    [Common.Middleware.HistaffAuthorize()]
    [Produces("application/json")]
    [Route("api/KpiGroup/[action]")]
    public class KpiGroupController : BaseController
    {
        public KpiGroupController(IPayrollBusiness unitOfWork) : base(unitOfWork)
        {

        }

        [HttpGet]
        public async Task<ActionResult> GetAll(KpiGroupDTO values)
        {
            var r = await _unitOfWork.KpiGroupRepository.GetAll(values);
            return Ok(r);
        }

        [HttpGet]
        public async Task<ActionResult> Get(int Id)
        {
            var r = await _unitOfWork.KpiGroupRepository.GetById(Id);
            return TLAResult(r);
        }

        [HttpGet]
        public async Task<ActionResult> GetList()
        {
            var r = await _unitOfWork.KpiGroupRepository.GetList();
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Add([FromBody] KpiGroupInputDTO param)
        {

            var r = await _unitOfWork.KpiGroupRepository.CreateAsync(param);
            return TLAResult(r);
        }

        [HttpPost]
        public async Task<ActionResult> Update([FromBody] KpiGroupInputDTO param)
        {

            var r = await _unitOfWork.KpiGroupRepository.UpdateAsync(param);
            return TLAResult(r);
        }

        [HttpPost]
        public async Task<ActionResult> ChangeStatus([FromBody] List<int> ids)
        {
            var r = await _unitOfWork.KpiGroupRepository.ChangeStatusAsync(ids);
            return TLAResult(r);
        }
    }
}
