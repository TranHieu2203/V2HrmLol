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
    [Route("api/kpiTarget/[action]")]
    public class KpiTargetController : BaseController
    {
        public KpiTargetController(IPayrollBusiness unitOfWork) : base(unitOfWork)
        {

        }

        [HttpGet]
        public async Task<ActionResult> GetAll(KpiTargetDTO values)
        {
            var r = await _unitOfWork.KpiTargetRepository.GetAll(values);
            return Ok(r);
        }

        [HttpGet]
        public async Task<ActionResult> Get(int Id)
        {
            var r = await _unitOfWork.KpiTargetRepository.GetById(Id);
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> GetList()
        {
            var r = await _unitOfWork.KpiTargetRepository.GetList();
            return TLAResult(r);
        }
        //[HttpGet]
        //public async Task<ActionResult> GetList(int KpiGroupId, int? typeId)
        //{
        //    var r = await _unitOfWork.KpiTargetRepository.GetList(KpiGroupId, typeId);
        //    return TLAResult(r);
        //}
        [HttpPost]
        public async Task<ActionResult> Add([FromBody] KpiTargetInputDTO param)
        {

            var r = await _unitOfWork.KpiTargetRepository.CreateAsync(param);
            return TLAResult(r);
        }

        [HttpPost]
        public async Task<ActionResult> Update([FromBody] KpiTargetInputDTO param)
        {

            var r = await _unitOfWork.KpiTargetRepository.UpdateAsync(param);
            return TLAResult(r);
        }

        [HttpPost]
        public async Task<ActionResult> ChangeStatus([FromBody] List<int> ids)
        {
            var r = await _unitOfWork.KpiTargetRepository.ChangeStatusAsync(ids);
            return TLAResult(r);
        }


        [HttpPost]
        public async Task<ActionResult> QuickUpdate([FromBody] KpiTargetQickDTO param)
        {

            var r = await _unitOfWork.KpiTargetRepository.QuickUpdate(param);
            return TLAResult(r);
        }
    }
}
