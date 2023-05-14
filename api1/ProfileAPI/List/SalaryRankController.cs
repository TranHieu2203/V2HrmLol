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
    [Route("api/hr/SalaryRank/[action]")]
    public class SalaryRankController : BaseController1
    {
        public SalaryRankController(IProfileBusiness unitOfWork) : base(unitOfWork)
        {

        }
        [HttpGet]
        public async Task<ActionResult> GetAll(SalaryRankDTO param)
        {
            var r = await _unitOfWork.SalaryRankRepository.GetAll(param);
            return Ok(r);
        }
        [HttpGet]
        public async Task<ActionResult> Get(int Id)
        {
            var r = await _unitOfWork.SalaryRankRepository.GetById(Id);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Add([FromBody]SalaryRankInputDTO param)
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
            var r = await _unitOfWork.SalaryRankRepository.CreateAsync(param);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Update([FromBody]SalaryRankInputDTO param)
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

            var r = await _unitOfWork.SalaryRankRepository.UpdateAsync(param);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> ChangeStatus([FromBody] List<int> ids)
        {
            var r = await _unitOfWork.SalaryRankRepository.ChangeStatusAsync(ids);
            return TLAResult(r);
        }
        
        [HttpGet]
        public async Task<ActionResult> GetList(int? scaleId)
        {
            var r = await _unitOfWork.SalaryRankRepository.GetListByScale(scaleId);
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> GetRankList()
        {
            var r = await _unitOfWork.SalaryRankRepository.GetRankList();
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> GetRankListAll()
        {
            var r = await _unitOfWork.SalaryRankRepository.GetRankListAll();
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> UpdateLevelStart([FromBody] SalaryRankStart param)
        {
            var r = await _unitOfWork.SalaryRankRepository.UpdateLevelStart(param);
            return TLAResult(r);
        }
    }
}
