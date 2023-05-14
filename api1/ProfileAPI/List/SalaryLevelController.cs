using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using ProfileDAL.Repositories;
using ProfileDAL.ViewModels;

namespace ProfileAPI.List
{
    [Common.Middleware.HistaffAuthorize()]
    [Produces("application/json")]
    [Route("api/hr/SalaryLevel/[action]")]
    public class SalaryLevelController : BaseController1
    {
        public SalaryLevelController(IProfileBusiness unitOfWork) : base(unitOfWork)
        {

        }
        [HttpGet]
        public async Task<ActionResult> GetAll(SalaryLevelDTO param)
        {
            var r = await _unitOfWork.SalaryLevelRepository.GetAll(param);
            return Ok(r);
        }
        [HttpGet]
        public async Task<ActionResult> Get(int Id)
        {
            var r = await _unitOfWork.SalaryLevelRepository.GetById(Id);
            return Ok(r);
        }
        [HttpPost]
        public async Task<ActionResult> Add([FromBody]SalaryLevelInputDTO param)
        {
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
            var r = await _unitOfWork.SalaryLevelRepository.CreateAsync(param);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Update([FromBody]SalaryLevelInputDTO param)
        {
            if (param == null)
            {
                return TLAResult("PARAM_NOT_BLANK");
            }
            if (param.Id == null)
            {
                return TLAResult("ID_NOT_BLANK");
            }
            if (string.IsNullOrWhiteSpace(param.Code))
            {
                return TLAResult("CODE_NOT_BLANK");
            }
            if (string.IsNullOrWhiteSpace(param.Name))
            {
                return TLAResult("NAME_NOT_BLANK");
            }

            var r = await _unitOfWork.SalaryLevelRepository.UpdateAsync(param);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> ChangeStatus([FromBody] List<int> ids)
        {
            var r = await _unitOfWork.SalaryLevelRepository.ChangeStatusAsync(ids);
            return TLAResult(r);
        }
        
        [HttpGet]
        public async Task<ActionResult> GetList(int rankId)
        {
            var r = await _unitOfWork.SalaryLevelRepository.GetList(rankId);
            return TLAResult(r);
        }
    }
}
