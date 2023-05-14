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
    [Route("api/hr/contract/[action]")]
    public class ContractController : BaseController1
    {
      //  IAttendanceBusiness _attendanceBusiness;
        public ContractController(
            IProfileBusiness profileBusiness) : base(profileBusiness)
        {
          //  _attendanceBusiness = attendanceBusiness;
        }
        [HttpGet]
        public async Task<ActionResult> GetAll(ContractDTO param)
        {
            var r = await _unitOfWork.ContractRepository.GetAll(param);
            return Ok(r);
        }

   

        [HttpGet]
        public async Task<ActionResult> Get(long Id)
        {
            var r = await _unitOfWork.ContractRepository.GetById(Id);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Add([FromBody] ContractInputDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.ContractRepository.CreateAsync(param);
           

            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Update([FromBody] ContractInputDTO param)
        {
            var r = await _unitOfWork.ContractRepository.UpdateAsync(param);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Remove([FromBody] List<long> id)
        {
            var r = await _unitOfWork.ContractRepository.RemoveAsync(id);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> OpenStatus([FromBody] long id)
        {
            var r = await _unitOfWork.ContractRepository.OpenStatus(id);
            return TLAResult(r);
        }

        [HttpPost]
        public async Task<ActionResult> TemplateImport([FromBody] int orgId)
        {
            try
            {
                var stream = await _unitOfWork.ContractRepository.TemplateImport(orgId);
                var fileName = "TempContract.xlsx";
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
        public async Task<ActionResult> ImportTemplate([FromBody] ImportCTractParam param)
        {
            try
            {
                var r = await _unitOfWork.ContractRepository.ImportTemplate(param);
                if (r.memoryStream != null)
                {
                    var fileName = "TempContractError.xlsx";
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
            var r = await _unitOfWork.ContractRepository.PortalGetAll();
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> PortalGetBy(long id)
        {
            var r = await _unitOfWork.ContractRepository.PortalGetBy(id);
            return TLAResult(r);
        }
    }
}
