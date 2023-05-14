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
    [Route("api/Advance/[action]")]
    public class AdvanceController : BaseController
    {
        public AdvanceController(IPayrollBusiness unitOfWork) : base(unitOfWork)
        {

        }

        [HttpGet]
        public async Task<ActionResult> GetAll(AdvanceDTO values)
        {
            var r = await _unitOfWork.AdvanceRepository.GetAll(values);
            return Ok(r);
        }

        [HttpGet]
        public async Task<ActionResult> Get(int Id)
        {
            var r = await _unitOfWork.AdvanceRepository.GetById(Id);
            return TLAResult(r);
        }

        [HttpPost]
        public async Task<ActionResult> Add([FromBody] AdvanceInputDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.AdvanceRepository.CreateAsync(param);

            return TLAResult(r);
        }


        [HttpPost]
        public async Task<ActionResult> Update([FromBody] AdvanceInputDTO param)
        {
            var r = await _unitOfWork.AdvanceRepository.UpdateAsync(param);
            return TLAResult(r);
        }

        [HttpPost]
        public async Task<ActionResult> Delete([FromBody] List<int> ids)
        {
            var r = await _unitOfWork.AdvanceRepository.Delete(ids);
            return TLAResult(r);
        }

        [HttpPost]
        public async Task<ActionResult> TemplateImport([FromBody] AdvanceTmpParam orgId)
        {
            try
            {
                var stream = await _unitOfWork.AdvanceRepository.TemplateImport(orgId);
                var fileName = "tempAdvance.xlsx";
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
        public async Task<ActionResult> ImportTemplate([FromBody] AdvanceTmpParam param)
        {
            try
            {
                var r = await _unitOfWork.AdvanceRepository.ImportTemplate(param);
                if (r.StatusCode == "200" && r.memoryStream != null)
                {
                    var fileName = "tempAdvanceError.xlsx";
                    return new FileStreamResult(r.memoryStream, "application/octet-stream") { FileDownloadName = fileName };
                }
                else
                {
                    return ImportResult(r);
                }
                
            }
            catch (System.Exception ex)
            {
                return TLAResult(ex.Message);
            }
        }

    }
}
