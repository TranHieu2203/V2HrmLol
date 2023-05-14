using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using ProfileDAL.Repositories;
using ProfileDAL.ViewModels;

namespace ProfileAPI.List
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Produces("application/json")]
    [Route("api/hr/job-band")]
    public class HuJobBandController : BaseController1
    {
        public HuJobBandController(IProfileBusiness unitOfWork) : base(unitOfWork)
        {

        }

        [HttpGet]
        [Route("job-bands")]
        public async Task<ActionResult> GetJobBands(HUJobBandInputDTO param)
        {
            var r = await _unitOfWork.HuJobBandRepository.GetJobBands(param);
            return Ok(r);
        }
        [HttpGet]
        [Route("{id:int}")]
        public async Task<ActionResult> GetJobBand(int Id)
        {
            var r = await _unitOfWork.HuJobBandRepository.GetJobBand(Id);
            return TLAResult(r);
        }
        [HttpPost]
        [Route("update")]
        public async Task<ActionResult> Update([FromBody] HUJobBandInputDTO param)
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
            if (string.IsNullOrWhiteSpace(param.LevelFrom))
            {
                return TLAResult("LEVEL_FROM_NOT_BLANK");
            }
            var validate = await _unitOfWork.HuJobBandRepository.ValidateJobBand(param);
            if (validate)
            {
                return TLAResult("DATA_EXIST");
            }
            var r = await _unitOfWork.HuJobBandRepository.UpdateAsync(param);
            return TLAResult(r);
        }
        
        [HttpPost]
        [Route("change-status")]
        public async Task<ActionResult> ChangeStatus([FromBody] List<int> ids)
        {
            var r = await _unitOfWork.HuJobBandRepository.ChangeStatusAsync(ids);
            return TLAResult(r);
        }

        [HttpPost]
        [Route("delete")]
        public async Task<ActionResult> Delete([FromBody] List<int> ids)
        {
            var r = await _unitOfWork.HuJobBandRepository.DeleteAsync(ids);
            return TLAResult(r);
        }

        [HttpGet]
        [Route("cbo-job-bands")]
        public async Task<ActionResult> GetCboJobBands()
        {
            var r = await _unitOfWork.HuJobBandRepository.GetCboJobBand();
            return TLAResult(r);
        }

    }
}
