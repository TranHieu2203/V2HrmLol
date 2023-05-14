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
    [Route("api/KpiEmployee/[action]")]
    public class KpiEmployeeController : BaseController
    {
        public KpiEmployeeController(IPayrollBusiness unitOfWork) : base(unitOfWork)
        {

        }

        [HttpGet]
        public async Task<ActionResult> GetAll(KpiEmployeeDTO values)
        {
            var r = await _unitOfWork.KpiEmployeeRepository.GetAll(values);
            return Ok(r);
        }

        [HttpGet]
        public async Task<ActionResult> Get(int Id)
        {
            var r = await _unitOfWork.KpiEmployeeRepository.GetById(Id);
            return TLAResult(r);
        }




        [HttpPost]
        public async Task<ActionResult> Update([FromBody] KpiEmployeeInputDTO param)
        {

            var r = await _unitOfWork.KpiEmployeeRepository.UpdateAsync(param);
            return TLAResult(r);
        }

        [HttpPost]
        public async Task<ActionResult> ChangeStatus([FromBody] List<int> ids)
        {
            var r = await _unitOfWork.KpiEmployeeRepository.ChangeStatusAsync(ids);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Delete([FromBody] List<int> ids)
        {
            var r = await _unitOfWork.KpiEmployeeRepository.Delete(ids);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> ExportTemplate([FromBody] KpiEmployeeInput param)
        {
            try
            {
                var stream = await _unitOfWork.KpiEmployeeRepository.ExportTemplate(param);
                var fileName = "template.xlsx";
                if (stream.StatusCode == "200")
                {
                    return new FileStreamResult(stream.memoryStream, "application/octet-stream") { FileDownloadName = fileName };
                }
                return TLAResult(stream);
            }
            catch (System.Exception ex)
            {
                return TLAResult(ex.Message);
            }

        }
        [HttpPost]
        public async Task<ActionResult> ImportFromTemplate([FromForm] KpiEmployeeImport param)
        {
            try
            {
                var res = await _unitOfWork.KpiEmployeeRepository.ImportFromTemplate(param);
                return TLAResult(res);

            }
            catch (System.Exception ex)
            {
                return TLAResult(ex.Message);
            }

        }
        [HttpPost]
        public async Task<ActionResult> CaclKpiSalary([FromBody] KpiEmployeeInput param)
        {
            try
            {
                var res = await _unitOfWork.KpiEmployeeRepository.CaclKpiSalary(param);
                return TLAResult(res);

            }
            catch (System.Exception ex)
            {
                return TLAResult(ex.Message);
            }

        }
        [HttpGet]
        public async Task<ActionResult> CheckKPILock(LockInputDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.KpiEmployeeRepository.IsLockKPI(param);
            return Ok(r);
        }
        [HttpGet]
        public async Task<ActionResult> LockKPI(LockInputDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.KpiEmployeeRepository.LockKPI(param);
            return Ok(r);
        }

    }
}
