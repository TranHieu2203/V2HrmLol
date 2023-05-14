using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using ProfileDAL.Repositories;
using ProfileDAL.ViewModels;

namespace ProfileAPI.Share
{
    [Common.Middleware.HistaffAuthorize()]
    [Produces("application/json")]
    [Route("api/hr/PositionSys/[action]")]
    public class PositionSysController : BaseController1
    {
        public PositionSysController(IProfileBusiness unitOfWork) : base(unitOfWork)
        {

        }
        [HttpGet]
        public async Task<ActionResult> GetAll(PositionSysViewDTO param)
        {
            var r = await _unitOfWork.PositionSysRepository.GetAll(param);
            return Ok(r);
        }
        [HttpGet]
        public async Task<ActionResult> Get(int Id)
        {
            var r = await _unitOfWork.PositionSysRepository.GetById(Id);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Add([FromBody] PositionSysInputDTO param)
        {
            if (param == null)
            {
                return TLAResult("PARAM_NOT_BLANK");
            }
            if (param.GroupId == null)
            {
                return TLAResult("GROUP_NOT_BLANK");
            }
            if (string.IsNullOrWhiteSpace(param.Code))
            {
                return TLAResult("CODE_NOT_BLANK");
            }
            if (string.IsNullOrWhiteSpace(param.Name))
            {
                return TLAResult("NAME_NOT_BLANK");
            }

            var r = await _unitOfWork.PositionSysRepository.CreateAsync(param);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Update([FromBody] PositionSysInputDTO param)
        {
            if (param == null)
            {
                return TLAResult("PARAM_NOT_BLANK");
            }
            if (param.Id == null)
            {
                return TLAResult("ID_NOT_BLANK");
            }
            if (param.GroupId == null)
            {
                return TLAResult("GROUP_NOT_BLANK");
            }
            if (string.IsNullOrWhiteSpace(param.Code))
            {
                return TLAResult("CODE_NOT_BLANK");
            }
            if (string.IsNullOrWhiteSpace(param.Name))
            {
                return TLAResult("NAME_NOT_BLANK");
            }

            var r = await _unitOfWork.PositionSysRepository.UpdateAsync(param);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> ChangeStatus([FromBody] List<int> ids)
        {
            var r = await _unitOfWork.PositionSysRepository.ChangeStatusAsync(ids);
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> GetList(int groupId)
        {
            var r = await _unitOfWork.PositionSysRepository.GetList(groupId);
            return TLAResult(r);
        }

    }
}
