using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using ProfileDAL.Repositories;
using ProfileDAL.ViewModels;
using Microsoft.AspNetCore.Http;
using System.IdentityModel.Tokens.Jwt;

namespace ProfileAPI.List
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Produces("application/json")]
    [Route("api/hr/job")]
    public class HuJobController : BaseController1
    {
        private IHttpContextAccessor _accessor;
        public HuJobController(IProfileBusiness unitOfWork, IHttpContextAccessor accessor) : base(unitOfWork)
        {
            _accessor = accessor;
        }

        [HttpGet]
        [Route("jobs")]
        public async Task<ActionResult> GetJobs(HUJobInputDTO param)
        {
            var r = await _unitOfWork.HuJobRepository.GetJobs(param);
            return Ok(r);
        }
        [HttpGet]
        [Route("{id:int}")]
        public async Task<ActionResult> GetJob(int Id)
        {
            var r = await _unitOfWork.HuJobRepository.GetJob(Id);
            return TLAResult(r);
        }
        
        [HttpPost]
        [Route("update")]
        public async Task<ActionResult> Update([FromBody] HUJobInputDTO param)
        {
            if (param == null)
            {
                return TLAResult("PARAM_NOT_BLANK");
            }
            if (string.IsNullOrWhiteSpace(param.NameVN))
            {
                return TLAResult("NAME_VN_NOT_BLANK");
            }
            if (string.IsNullOrWhiteSpace(param.NameEN))
            {
                return TLAResult("NAME_EN_NOT_BLANK");
            }
            if (string.IsNullOrWhiteSpace(param.Code))
            {
                return TLAResult("CODE_NOT_BLANK");
            }
            var validate = await _unitOfWork.HuJobRepository.ValidateJob(param);
            if (validate)
            {
                return TLAResult("DATA_EXIST");
            }
            var userName = _accessor.HttpContext?.User.FindFirst(JwtRegisteredClaimNames.Typ)?.Value?.Trim();
            param.CreatedBy = userName;
            var r = await _unitOfWork.HuJobRepository.UpdateAsync(param);
            return TLAResult(r);
        }
        
        [HttpPost]
        [Route("change-status")]
        public async Task<ActionResult> ChangeStatus([FromBody] List<int> ids)
        {
            var userName = _accessor.HttpContext?.User.FindFirst(JwtRegisteredClaimNames.Typ)?.Value?.Trim();
            var r = await _unitOfWork.HuJobRepository.ChangeStatusAsync(ids,userName);
            return TLAResult(r);
        }

        [HttpPost]
        [Route("delete")]
        public async Task<ActionResult> Delete([FromBody] List<int> ids)
        {
            var r = await _unitOfWork.HuJobRepository.DeleteAsync(ids);
            return TLAResult(r);
        }

    }
}
