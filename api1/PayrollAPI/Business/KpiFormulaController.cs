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
    [Route("api/KpiFormula/[action]")]
    public class KpiFormulaController : BaseController
    {
        public KpiFormulaController(IPayrollBusiness unitOfWork) : base(unitOfWork)
        {

        }

        [HttpGet]
        public async Task<ActionResult> GetAll(KpiFormulaDTO values)
        {
            var r = await _unitOfWork.KpiFormulaRepository.GetAll(values);
            return Ok(r);
        }

        [HttpGet]
        public async Task<ActionResult> Get(int Id)
        {
            var r = await _unitOfWork.KpiFormulaRepository.GetById(Id);
            return TLAResult(r);
        }

        [HttpGet]
        public async Task<ActionResult> GetList()
        {
            var r = await _unitOfWork.KpiFormulaRepository.GetList();
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> GetListFomula()
        {
            var r = await _unitOfWork.KpiTargetRepository.GetListFomula();
            return TLAResult(r);
        }
       

        [HttpPost]
        public async Task<ActionResult> Update([FromBody] KpiFormulaCreateDTO param)
        {

            var r = await _unitOfWork.KpiFormulaRepository.UpdateAsync(param);
            return TLAResult(r);
        }

        [HttpPost]
        public async Task<ActionResult> ChangeStatus([FromBody] List<int> ids)
        {
            var r = await _unitOfWork.KpiFormulaRepository.ChangeStatusAsync(ids);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> MoveTableIndex([FromBody] List<TempSortInputDTO> param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.FormulaRepository.MoveTableIndex(param, OtherConfig.SORT_FML_KPI);
            return Ok(r);
        }
    }
}
