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
    //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Produces("application/json")]
    [Route("api/hr/CompanyInfo/[action]")]
    public class CompanyInfoController : BaseController1
    {
        public CompanyInfoController(IProfileBusiness unitOfWork) : base(unitOfWork)
        {

        }
        [HttpGet]
        public async Task<ActionResult> GetAll(CompanyInfoDTO param)
        {
            var r = await _unitOfWork.CompanyInfoRepository.GetAll(param);
            return Ok(r);
        }

        [HttpPost]
        public async Task<ActionResult> Add([FromBody] CompanyInfoInputDTO param)
        {
            if (param == null)
            {
                return TLAResult("PARAM_NOT_BLANK");
            }
            var r = await _unitOfWork.CompanyInfoRepository.CreateAsync(param);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Update([FromBody] CompanyInfoInputDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.CompanyInfoRepository.UpdateAsync(param);
            return TLAResult(r);
        }

        [HttpGet]
        public async Task<ActionResult> Get(int Id)
        {
            var r = await _unitOfWork.CompanyInfoRepository.GetById(Id);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> ChangeStatus([FromBody] List<int> ids)
        {
            var r = await _unitOfWork.CompanyInfoRepository.ChangeStatusAsync(ids);
            return TLAResult(r);
        }

        [HttpPost]
        public async Task<ActionResult> Delete([FromBody] List<int> ids)
        {
            var r = await _unitOfWork.CompanyInfoRepository.DeleteAsync(ids);
            return TLAResult(r);
        }
    }
}
