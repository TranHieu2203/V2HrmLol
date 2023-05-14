using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using AttendanceDAL.Repositories;
using AttendanceDAL.ViewModels;
using Common.Extensions;
using System.Collections.Generic;
using Common.Middleware;

namespace AttendanceAPI.List
{
    [HistaffAuthorize()]
    [Produces("application/json")]
    [Route("api/hr/entitlement/[action]")]
    public class EntitlementEditController : BaseController2
    {
        public EntitlementEditController(IAttendanceBusiness unitOfWork) : base(unitOfWork)
        {

        }

        [HttpGet]
        public async Task<ActionResult> GetAll(EntitlementEditDTO param)
        {
            var r = await _unitOfWork.EntitlementEditRepository.GetAll(param);
            return Ok(r);
        }

        [HttpPost]
        public async Task<ActionResult> Create([FromBody] EntitlementEditInputDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.EntitlementEditRepository.CreateAsync(param);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Update([FromBody] EntitlementEditInputDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.EntitlementEditRepository.UpdateAsync(param);
            return TLAResult(r);
        }
      
        [HttpPost]
        public async Task<ActionResult> Delete([FromBody] List<int> param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.EntitlementEditRepository.Delete(param);
            return TLAResult(r);
        }

        [HttpGet]
        public async Task<ActionResult> Get(int id)
        {
            var r = await _unitOfWork.EntitlementEditRepository.GetBy(id);
            return Ok(r);
        }

        [HttpPost]
        public async Task<ActionResult> ExportTemplate([FromBody] ParaOrg param)
        {
            try
            {
                var stream = await _unitOfWork.EntitlementEditRepository.ExportTemplate(param);
                var fileName = "ImportPhepNam.xlsx";
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
        public async Task<ActionResult> ImportTemplate([FromBody]  EntitlementEditParam param )
        {
            try
            {
                var r = await _unitOfWork.EntitlementEditRepository.ImportTemplate(param);
                if (r.memoryStream != null)
                {
                    var fileName = "ImportPhepNamError.xlsx";
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
