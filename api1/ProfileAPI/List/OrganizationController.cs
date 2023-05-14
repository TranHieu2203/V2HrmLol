using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using ProfileDAL.Repositories;
using ProfileDAL.ViewModels;
using Common.Paging;
using Common.Extensions;

namespace ProfileAPI.List
{
    [Common.Middleware.HistaffAuthorize()]
    [Produces("application/json")]
    [Route("api/hr/Organization/[action]")]
    public class OrganizationController : BaseController1
    {
        public OrganizationController(IProfileBusiness unitOfWork) : base(unitOfWork)
        {

        }
        [HttpGet]
        public async Task<ActionResult> GetAll(OrganizationInputDTO param)
        {
            var r = await _unitOfWork.OrganizationRepository.GetAll(param);
            return Ok(r);
        }
        [HttpGet]
        public async Task<ActionResult> GetTreeView()
        {
            var r = await _unitOfWork.OrganizationRepository.GetTreeView();
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> Get(int Id)
        {
            var r = await _unitOfWork.OrganizationRepository.GetById(Id);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Add([FromBody] OrganizationInputDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            if (param == null)
            {
                return TLAResult("PARAM_NOT_BLANK");
            }
            if (string.IsNullOrWhiteSpace(param.Code))
            {
                return TLAResult("CODE_NOT_BLANK");
            }
            if (string.IsNullOrWhiteSpace(param.Name))
            {
                return TLAResult("NAME_NOT_BLANK");
            }

            var r = await _unitOfWork.OrganizationRepository.CreateAsync(param);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Update([FromBody] OrganizationInputDTO param)
        {
            if (param == null)
            {
                return TLAResult("PARAM_NOT_BLANK");
            }
          

            var r = await _unitOfWork.OrganizationRepository.UpdateAsync(param);
            return TLAResult(r);
        }

        [HttpPost]
        public async Task<ActionResult> Sort([FromBody] OrganizationInputDTO param)
        {
            if (param.Id == null)
            {
                return TLAResult("PARAM_ID_NOT_BLANK");
            }
            if (param.ParentId == null)
            {
                return TLAResult("PARAM_PARENT_NOT_BLANK");
            }
            var r = await _unitOfWork.OrganizationRepository.SortAsync(param);
            return TLAResult(r);
        }
        
        [HttpGet]
        public async Task<ActionResult> GetList()
        {
            var r = await _unitOfWork.OrganizationRepository.GetList();
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> Delete(int Id)
        {
            if (Id == 0)
            {
                return TLAResult("PARAM_NOT_BLANK");
            }
            var r = await _unitOfWork.OrganizationRepository.Delete(Id);
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> GetOrgPermission()
        {
            var r = await _unitOfWork.UserOrganiRepository.GetOrgPermission();
            return Ok(r);
        }
        [HttpGet]
        public async Task<ActionResult> GetAllOrgChartPosition(OrgChartRptInputDTO param)
        {
            var r = await _unitOfWork.OrganizationRepository.GetAllOrgChartPosition(param);
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> GetJobPosTree(JobPositionTreeInputDTO param)
        {
            var r = await _unitOfWork.OrganizationRepository.GetJobPosTree(param);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> UpdateCreateRptJobPosHis(JobPositionTreeInputDTO param)
        {
            var r = _unitOfWork.OrganizationRepository.UpdateCreateRptJobPosHisAsync(param);
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> GetJobChildTree(JobChildTreeInputDTO param)
        {
            var r = await _unitOfWork.OrganizationRepository.GetJobChildTree(param);
            return TLAResult(r);
        }
    }
}
