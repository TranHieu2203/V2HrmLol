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
    [Route("api/SettingMap/[action]")]
    public class SettingMapController : BaseController1
    {
        public SettingMapController(IProfileBusiness unitOfWork) : base(unitOfWork)
        {

        }
        [HttpGet]
        public async Task<ActionResult> GetAll(SettingMapDTO param)
        {
            var r = await _unitOfWork.SettingMapRepository.GetAll(param);
            return Ok(r);
        }
        [HttpGet]
        public async Task<ActionResult> Get(int Id)
        {
            var r = await _unitOfWork.SettingMapRepository.GetById(Id);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Add([FromBody] SettingMapInputDTO param)
        {
            if (param == null)
            {
                return TLAResult("PARAM_NOT_BLANK");
            }
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }

            var r = await _unitOfWork.SettingMapRepository.CreateAsync(param);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Update([FromBody] SettingMapInputDTO param)
        {
            if (param == null)
            {
                return TLAResult("PARAM_NOT_BLANK");
            }
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }

            var r = await _unitOfWork.SettingMapRepository.UpdateAsync(param);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> ChangeStatus([FromBody] List<int> ids)
        {
            var r = await _unitOfWork.SettingMapRepository.ChangeStatusAsync(ids);
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> GetList()
        {
            var r = await _unitOfWork.SettingMapRepository.GetList();
            return TLAResult(r);
        }
        [HttpGet]
        public ActionResult GetIP()
        {
            var r = _unitOfWork.SettingMapRepository.GetIP();
            return TLAResult(r);
        }

        [HttpGet]
        public ActionResult GetBSSID()
        {
            var r = _unitOfWork.SettingMapRepository.GetBSSID();
            return TLAResult(r);
        }
    }
}
