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
    [Route("api/hr/Setting/[action]")]
    public class SettingController : BaseController1
    {
        public SettingController(IProfileBusiness unitOfWork) : base(unitOfWork)
        {

        }
        [HttpGet]
        public async Task<ActionResult> GetUserOrg(string userId)
        {
            var r = await _unitOfWork.UserOrganiRepository.GetUserOrg(userId);
            return Ok(r);
        }
        [HttpGet]
        public async Task<ActionResult> ListGroupPermission(int Id)
        {
            var r = await _unitOfWork.UserOrganiRepository.ListGroupPermission(Id);
            return Ok(r);
        }
        [HttpGet]
        public async Task<ActionResult> ListUserPermission(string Id)
        {
            var r = await _unitOfWork.UserOrganiRepository.ListUserPermission(Id);
            return Ok(r);
        }

        [HttpPost]
        public async Task<ActionResult> Update([FromBody] UserOrganiDTO param)
        {
            var r = await _unitOfWork.UserOrganiRepository.UpdateAsync(param);
            return Ok(r);
        }

        [HttpPost]
        public async Task<ActionResult> UpdateGroup([FromBody] UserOrganiDTO param)
        {
            var r = await _unitOfWork.UserOrganiRepository.UpdateGroupAsync(param);
            return Ok(r);
        }
    }
}
