using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using ProfileDAL.Repositories;
using ProfileDAL.ViewModels;
using System.Collections.Generic;
using Common.Extensions;

namespace ProfileAPI.List
{
    [Common.Middleware.HistaffAuthorize()]
    [Produces("application/json")]
    [Route("api/hr/working/[action]")]
    public class WorkingController : BaseController1
    {
        public WorkingController(IProfileBusiness unitOfWork) : base(unitOfWork)
        {

        }
        [HttpGet]
        public async Task<ActionResult> GetAll(WorkingDTO param)
        {
            var r = await _unitOfWork.WorkingRepository.GetAll(param);
            return Ok(r);
        }
        [HttpGet]
        public async Task<ActionResult> GetWorking(WorkingDTO param)
        {
            var r = await _unitOfWork.WorkingRepository.GetWorking(param);
            return Ok(r);
        }
        [HttpGet]
        public async Task<ActionResult> Get(long Id)
        {
            var r = await _unitOfWork.WorkingRepository.GetById(Id);
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> GetLastWorking(long Id)
        {
            var r = await _unitOfWork.WorkingRepository.GetLastWorking(Id);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Add([FromBody] WorkingInputDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.WorkingRepository.CreateAsync(param);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Update([FromBody] WorkingInputDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.WorkingRepository.UpdateAsync(param);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Remove([FromBody] List<long> id)
        {
            var r = await _unitOfWork.WorkingRepository.RemoveAsync(id);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> OpenStatus([FromBody] long id)
        {
            var r = await _unitOfWork.WorkingRepository.OpenStatus(id);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> TemplateImport([FromBody] int orgId)
        {
            try
            {
                var stream = await _unitOfWork.WorkingRepository.TemplateImport(orgId);
                var fileName = "tempWorking.xlsx";
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
        public async Task<ActionResult> ImportTemplate([FromBody] ImportParam param)
        {
            try
            {
                var r = await _unitOfWork.WorkingRepository.ImportTemplate(param);
                if (r.memoryStream != null && r.StatusCode == "200")
                {
                    var fileName = "tempWorkingError.xlsx";
                    return new FileStreamResult(r.memoryStream, "application/octet-stream") { FileDownloadName = fileName };
                }
                return ImportResult(r);
            }
            catch (System.Exception ex)
            {
                return TLAResult(ex.Message);
            }
        }


        [HttpGet]
        public async Task<ActionResult> PortalGetAll()
        {
            var r = await _unitOfWork.WorkingRepository.PortalGetAll();
            return TLAResult(r);
        }

        [HttpGet]
        public async Task<ActionResult> PortalGetBy(long id)
        {
            var r = await _unitOfWork.WorkingRepository.PortalGetBy(id);
            return TLAResult(r);
        }


    }
}
