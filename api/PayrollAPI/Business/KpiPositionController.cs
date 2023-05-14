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
    [Route("api/kpiposition/[action]")]
    public class KpiPositionController : BaseController
    {
        public KpiPositionController(IPayrollBusiness unitOfWork) : base(unitOfWork)
        {

        }

        [HttpGet]
        public async Task<ActionResult> GetAll(KpiPositionDTO values)
        {
            var r = await _unitOfWork.KpiPositionRepository.GetAll(values);
            return Ok(r);
        }

        [HttpGet]
        public async Task<ActionResult> Get(int Id)
        {
            var r = await _unitOfWork.KpiPositionRepository.GetById(Id);
            return TLAResult(r);
        }


        [HttpPost]
        public async Task<ActionResult> Add([FromBody] KpiPositionInputDTO param)
        {

            var r = await _unitOfWork.KpiPositionRepository.CreateAsync(param);
            return TLAResult(r);
        }

        [HttpPost]
        public async Task<ActionResult> Removes([FromBody] List<long> ids)
        {
            var r = await _unitOfWork.KpiPositionRepository.Removes(ids);
            return TLAResult(r);
        }
    }
}
