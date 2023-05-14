using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using ProfileDAL.Repositories;
using ProfileDAL.ViewModels;
using Common.Extensions;

namespace ProfileAPI.List
{
    [Common.Middleware.HistaffAuthorize()]
    [Produces("application/json")]
    [Route("api/hr/Employee/[action]")]
    public class EmployeeController : BaseController1
    {
        public EmployeeController(IProfileBusiness unitOfWork) : base(unitOfWork)
        {

        }
        [HttpGet]
        public async Task<ActionResult> GetAll(EmployeeDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.EmployeeRepository.GetAll(param);
            return Ok(r);

        }
        [HttpGet]
        public async Task<ActionResult> GetPopup(EmployeePopup param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.EmployeeRepository.GetPopup(param);
            return Ok(r);

        }
        [HttpGet]
        public async Task<ActionResult> Get(int Id)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.EmployeeRepository.GetById(Id);
            return TLAResult(r);

        }
        [HttpGet]
        public async Task<ActionResult> GetList()
        {
            var r = await _unitOfWork.EmployeeRepository.GetList();
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> GetListByOrg(int OrgId)
        {
            var r = await _unitOfWork.EmployeeRepository.GetListByOrg(OrgId);
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> ListSituation(long empId)
        {
            var r = await _unitOfWork.EmployeeRepository.ListSituation(empId);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> AddSituation([FromBody] SituationDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }

            var r = await _unitOfWork.EmployeeRepository.CreateSituation(param);
            return TLAResult(r);

        }
        [HttpPost]
        public async Task<ActionResult> Add([FromBody] EmployeeInput param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }

            var r = await _unitOfWork.EmployeeRepository.CreateAsync(param);
            return TLAResult(r);

        }
       

        [HttpPost]
        public async Task<ActionResult> Update([FromBody] EmployeeInput param)
        {

            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }


            var r = await _unitOfWork.EmployeeRepository.UpdateAsync(param);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> RemoveRelation([FromBody] int id)
        {

            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.EmployeeRepository.RemoveRelation(id);
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> PortalGetCurriculum()
        {
            var r = await _unitOfWork.EmployeeRepository.PortalGetBy(1);
            return TLAResult(r);
        }

        [HttpGet]
        public async Task<ActionResult> PortalGetadditional()
        {
            var r = await _unitOfWork.EmployeeRepository.PortalGetBy(2);
            return TLAResult(r);
        }

        [HttpGet]
        public async Task<ActionResult> PortalGetCultural()
        {
            var r = await _unitOfWork.EmployeeRepository.PortalGetBy(4);
            return TLAResult(r);
        }

        [HttpGet]
        public async Task<ActionResult> PortalGetBank()
        {
            var r = await _unitOfWork.EmployeeRepository.PortalGetBy(3);
            return TLAResult(r);
        }

        [HttpGet]
        public async Task<ActionResult> PortalGetFamily()
        {
            var r = await _unitOfWork.EmployeeRepository.PortalGetFamily();
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> GetInforLeaveJob(long Id)
        {
            var r = await _unitOfWork.EmployeeRepository.GetInforLeaveJob(Id);
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> GetInforContract(long Id)
        {
            var r = await _unitOfWork.EmployeeRepository.GetInforContract(Id);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> GetEmpAlowance([FromBody] List<long> Ids)
        {
            var r = await _unitOfWork.EmployeeRepository.GetEmpAlowance(Ids);
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> GetListEmpToImport()
        {
            var r = await _unitOfWork.EmployeeRepository.GetListEmpToImport();
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> TemplateImport()
        {
            try
            {
                var stream = await _unitOfWork.EmployeeRepository.TemplateImport();
                var fileName = "templateProfile.xlsx";
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
        public async Task<ActionResult> ImportProfile([FromBody] EmpImportParam param)
        {

            try
            {
                if (param== null)
                {
                    return TLAValidation();
                }

                var r = await _unitOfWork.EmployeeRepository.ImportProfile(param);
                if (r.memoryStream != null)
                {
                    var fileName = "TemplateProfileError.xlsx";
                    return new FileStreamResult(r.memoryStream, "application/octet-stream") { FileDownloadName = fileName };
                }
                else
                {
                    return TLAResult(int.Parse(r.StatusCode));
                }
            }
            catch (System.Exception ex)
            {
                return TLAResult(ex.Message);
            }
        }
        [HttpPost]
        public async Task<ActionResult> Delete([FromBody] List<int> param)
        {
            var r = await _unitOfWork.EmployeeRepository.Delete(param);
            return TLAResult(r);
        }

        [HttpGet]
        public async Task<ActionResult> GetListPaper(int EmpId)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.EmployeeRepository.GetListPaper(EmpId);
            return Ok(r);
        }
        [HttpPost]
        public async Task<ActionResult> CreatePaper([FromBody] PaperInput param)
        {
            var r = await _unitOfWork.EmployeeRepository.CreatePaperAsync(param);
            return TLAResult(r);
        }

        [HttpGet]
        public async Task<ActionResult> PortalContactBook(string name)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.EmployeeRepository.PortalContactBook(name);
            return Ok(r);
        }

        [HttpGet]
        public async Task<ActionResult> PortalGetContact(int EmpId)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.EmployeeRepository.PortalGetContact(EmpId);
            return Ok(r);
        }

        [HttpGet]
        public async Task<ActionResult> ScanQRCode()
        {
            var r = await _unitOfWork.EmployeeRepository.ScanQRCode();
            return Ok(r);
        }

        [HttpGet]
        public async Task<ActionResult> GetAllProfileEdit(EmployeeEditDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.EmployeeRepository.GetAllProfileEdit(param);
            return Ok(r);
        }

        [HttpGet]
        public async Task<ActionResult> GetAllFamilyAdd(FamilyEditDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.EmployeeRepository.GetAllFamilyAdd(param);
            return Ok(r);

        }

        [HttpGet]
        public async Task<ActionResult> EditInfomationBy(int id)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.EmployeeRepository.EditInfomationBy(id);
            return Ok(r);

        }

        [HttpPost]
        public async Task<ActionResult> ApproveProfileEdit([FromBody] int id)
        {
            var r = await _unitOfWork.EmployeeRepository.ApproveProfileEdit(id, OtherConfig.STATUS_APPROVE);
            return TLAResult(r);
        }

        [HttpPost]
        public async Task<ActionResult> RejectProfileEdit([FromBody] int id)
        {
            var r = await _unitOfWork.EmployeeRepository.ApproveProfileEdit(id, OtherConfig.STATUS_DECLINE);
            return TLAResult(r);
        }
    }
}
