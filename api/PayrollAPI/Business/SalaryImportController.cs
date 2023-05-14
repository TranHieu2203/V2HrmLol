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
    [Route("api/hr/salimport/[action]")]
    public class SalaryImportController : BaseController
    {
        public SalaryImportController(IPayrollBusiness unitOfWork) : base(unitOfWork)
        {

        }

        [HttpGet]
        public async Task<ActionResult> GetAll(SalImportDTO values)
        {
            var r = await _unitOfWork.SalaryImportRepository.GetAll(values);
            return Ok(r);
        }


        [HttpPost]
        public async Task<ActionResult> ExportTemplate([FromBody] SalImpSearchParam param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            try
            {
                var stream = await _unitOfWork.SalaryImportRepository.ExportTemplate(param);
                var fileName = "TempImpSal.xlsx";
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
        public async Task<ActionResult> ImportTemplate([FromBody] SalImpImportParam param)
        {
            var r = await _unitOfWork.SalaryImportRepository.ImportTemplate(param);
            return TLAResult(r);
        }

        [HttpPost]
        public async Task<ActionResult> Delete([FromBody] SalImportDelParam param)
        {
            var r = await _unitOfWork.SalaryImportRepository.Delete(param);
            return TLAResult(r);
        }
    }
}
