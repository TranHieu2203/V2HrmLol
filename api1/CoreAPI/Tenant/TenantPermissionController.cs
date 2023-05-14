using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using CoreDAL.ViewModels;
using CoreDAL.Repositories;
using Common.Extensions;

namespace CoreAPI.MultiTenant
{
    [Common.Middleware.HistaffAuthorize()]
    [Produces("application/json")]
    [Route("api/tenant/userpermission/[action]")]
    public class TenantUserPermissionController : BaseController
    {
        public TenantUserPermissionController(IUnitOfWork unitOfWork) : base(unitOfWork)
        {

        }

        [HttpGet]
        public async Task<ActionResult> GetAll(TenantUserPermissionDTO param)
        {
            var r = await _unitOfWork.TenantUserPermission.GetAll(param, SysERP.GoHR);
            return Ok(r);
        }

        [HttpGet]
        public async Task<ActionResult> GetBy(TenantUserPermissionDTO param)
        {
            var r = await _unitOfWork.TenantUserPermission.GetBy(param, SysERP.GoHR);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Update([FromBody]List<TenantUserPermissionInputDTO> param)
        {
            if (param == null)
            {
                return BadRequest();
            }

            var r = await _unitOfWork.TenantUserPermission.UpdateAsync(param, SysERP.GoHR);
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> GridFuntion(GridFunctionInput param)
        {
            if (param == null)
            {
                return BadRequest();
            }
            var r = await _unitOfWork.TenantUserPermission.GridPermission(param, SysERP.GoHR);
            return Ok(r);
        }

    }
}
