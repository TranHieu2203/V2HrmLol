using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using PayrollDAL.ViewModels;
using PayrollDAL.Repositories;
using Common.Extensions;
using System.Collections.Generic;

namespace PayrollAPI.List
{
    [Common.Middleware.HistaffAuthorize()]
    [Produces("application/json")]
    [Route("api/payroll/structure/[action]")]
    public class SalaryStructureController : BaseController
    {
        public SalaryStructureController(IPayrollBusiness unitOfWork) : base(unitOfWork)
        {

        }

        [HttpGet]
        public async Task<ActionResult> GetAll(SalaryStructureDTO values)
        {
            var r = await _unitOfWork.SalaryStructureRepository.GetAll(values);
            return Ok(r);
        }

        [HttpGet]
        public async Task<ActionResult> Get(int Id)
        {
            var r = await _unitOfWork.SalaryStructureRepository.GetById(Id);
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> GetList(int SalaryTypeId)
        {
            var r = await _unitOfWork.SalaryStructureRepository.GetList(SalaryTypeId);
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> GetListImport(int SalaryTypeId)
        {
            var r = await _unitOfWork.SalaryStructureRepository.GetListImport(SalaryTypeId);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Add([FromBody] SalaryStructureInputDTO param)
        {

            var r = await _unitOfWork.SalaryStructureRepository.CreateAsync(param);
            return TLAResult(r);
        }

        [HttpPost]
        public async Task<ActionResult> Update([FromBody] SalaryStructureInputDTO param)
        {

            var r = await _unitOfWork.SalaryStructureRepository.UpdateAsync(param);
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> GetSalaryElement(long salaryTypeId)
        {
            var r = await _unitOfWork.SalaryStructureRepository.GetElement(salaryTypeId);
            return TLAResult(r);
        }

        [HttpPost]
        public async Task<ActionResult> QuickUpdate([FromBody] SalaryStructureInputDTO param)
        {

            var r = await _unitOfWork.SalaryStructureRepository.QuickUpdate(param);
            return TLAResult(r);
        }

        [HttpPost]
        public async Task<ActionResult> MoveTableIndex([FromBody] List<TempSortInputDTO> param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.FormulaRepository.MoveTableIndex(param, OtherConfig.SORT_FML_STRUCT);
            return Ok(r);
        }

        [HttpPost]
        public async Task<ActionResult> Delete([FromBody] int id)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.SalaryStructureRepository.Delete(id);
            return Ok(r);
        }
    }
}
