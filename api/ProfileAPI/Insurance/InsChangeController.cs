using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using ProfileDAL.Repositories;
using ProfileDAL.ViewModels;
using System.Collections.Generic;

namespace ProfileAPI.List
{
    [Common.Middleware.HistaffAuthorize()]
    [Produces("application/json")]
    [Route("api/hr/InsChange/[action]")]
    public class InsChangeController : BaseController1
    {
        public InsChangeController(IProfileBusiness unitOfWork) : base(unitOfWork)
        {

        }
        [HttpGet]
        public async Task<ActionResult> GetAll(InsChangeDTO param)
        {
            var r = await _unitOfWork.InsChangeRepository.GetAll(param);
            return Ok(r);
        }
        [HttpGet]
        public async Task<ActionResult> Get(long Id)
        {
            var r = await _unitOfWork.InsChangeRepository.GetById(Id);
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> GetListType()
        {
            var r = await _unitOfWork.InsuranceTypeRepository.GetList();
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Add([FromBody] InsChangeInputDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.InsChangeRepository.CreateAsync(param);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Update([FromBody] InsChangeInputDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.InsChangeRepository.UpdateAsync(param);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Remove([FromBody] List<int> id)
        {
            var r = await _unitOfWork.InsChangeRepository.RemoveAsync(id);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> TemplateImport([FromBody] int orgId)
        {
            try
            {
                var stream = await _unitOfWork.InsChangeRepository.TemplateImport(orgId);
                var fileName = "TempInsurance.xlsx";
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
        public async Task<ActionResult> ImportTemplate([FromBody] ImportInsParam param)
        {
            try
            {
                var r = await _unitOfWork.InsChangeRepository.ImportTemplate(param);
                if (r.memoryStream != null)
                {
                    var fileName = "TempInsuranceError.xlsx";
                    return new FileStreamResult(r.memoryStream, "application/octet-stream") { FileDownloadName = fileName };
                }
                return ImportResult(r);
            }
            catch (System.Exception ex)
            {
                return TLAResult(ex.Message);
            }
        }

    }
}
