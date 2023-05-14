using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using CoreDAL.ViewModels;
using CoreDAL.Repositories;

namespace CoreAPI.Authorization
{
    [Common.Middleware.HistaffAuthorize()]
    [Produces("application/json")]
    [Route("api/author/grouppermission/[action]")]
    public class SysGroupPermissionController : BaseController
    {
        public SysGroupPermissionController(IUnitOfWork unitOfWork) : base(unitOfWork)
        {

        }

        [HttpGet]
        public async Task<ActionResult> GetAll(SysGroupPermissionDTO param)
        {
            var r = await _unitOfWork.SysGroupPermissions.GetAll(param);
            return Ok(r);
        }

        [HttpGet]
        public async Task<ActionResult> GetBy(SysGroupPermissionDTO param)
        {
            var r = await _unitOfWork.SysGroupPermissions.GetBy(param);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Update([FromBody]List<GroupPermissionInputDTO> param)
        {
            if (param == null)
            {
                return BadRequest();
            }
            var r = await _unitOfWork.SysGroupPermissions.UpdateAsync(param);
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> GridFuntion(GridFunctionInput param)
        {
            if (param == null)
            {
                return BadRequest();
            }
            var r = await _unitOfWork.SysGroupPermissions.GridPermission(param);
            return Ok(r);
        }
    }
}
