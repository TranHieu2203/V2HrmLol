using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using AttendanceDAL.Repositories;
using AttendanceDAL.ViewModels;
using System.Collections.Generic;

namespace AttendanceAPI.List
{
    [Common.Middleware.HistaffAuthorize()]
    [Produces("application/json")]
    [Route("api/hr/WorkSign/[action]")]
    public class WorkSignController : BaseController2
    {
        public WorkSignController(IAttendanceBusiness unitOfWork) : base(unitOfWork)
        {

        }
        [HttpGet]
        public async Task<ActionResult> GetAll(WorkSignDTO param)
        {
            var r = await _unitOfWork.WorkSignRepository.GetAll(param);
            return Ok(r);
        }
        [HttpPost]
        public async Task<ActionResult> Add([FromBody] WorkSignInputDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.WorkSignRepository.CreateAsync(param);
            return TLAResult(r);
        }
        [HttpPost]  
        public async Task<ActionResult> ImportTimeSort([FromBody] List<ImportExcelDTO> param)
        {
            var r = await _unitOfWork.WorkSignRepository.ImportTimeSort(param, 1);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> ImportDutySort([FromBody] List<ImportExcelDTO> param)
        {
            var r = await _unitOfWork.WorkSignRepository.ImportTimeSort(param, 2);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Update([FromBody] WorkSignInputDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.WorkSignRepository.UpdateAsync(param);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Delete([FromBody] WorkSignDeleteDTO param )
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.WorkSignRepository.Delete(param);
            return TLAResult(r);
        }

       

        [HttpPost]
        public async Task<ActionResult> TemplateExport([FromBody] ExportTemplateDTO param)
        {
            try
            {
                var stream = await _unitOfWork.WorkSignRepository.TemplateExport(param);
                var fileName = "templateShiftSort.xlsx";
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
        public async Task<ActionResult> ImportTemplateNew([FromBody] ImportWorkSignParam param)
        {
            try
            {
                var r = await _unitOfWork.WorkSignRepository.ImportTimeSortNew(param);
                if (r.memoryStream != null && r.StatusCode == "200")
                {
                    var fileName = "tempWorkingError.xlsx";
                    return new FileStreamResult(r.memoryStream, "application/octet-stream") { FileDownloadName = fileName };
                }
                return TLAResult(204);
            }
            catch (System.Exception ex)
            {
                return TLAResult(ex.Message);
            }
        }
    }
}
