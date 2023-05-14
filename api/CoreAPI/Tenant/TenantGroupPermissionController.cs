using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Common.Extensions;
using CoreDAL.Repositories;
using CoreDAL.ViewModels;

namespace CoreAPI.MultiTenant
{
    [Common.Middleware.HistaffAuthorize()]
    [Produces("application/json")]
    [Route("api/tenant/grouppermission/[action]")]
    public class TenantGroupPermissionController : BaseController
    {
        public TenantGroupPermissionController(IUnitOfWork unitOfWork) : base(unitOfWork)
        {

        }

        /// <summary>
        /// Get All Group User HR
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult> GetAll(TenantGroupPermisstionDTO param)
        {
            var r = await _unitOfWork.TenantGroupPermissions.GetAll(param, SysERP.GoHR);
            return Ok(r);
        }

        /// <summary>
        /// Get by ID Group User HR
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult> GetBy(TenantGroupPermisstionDTO param)
        {
            var r = await _unitOfWork.TenantGroupPermissions.GetBy(param, SysERP.GoHR);
            return Ok(r);
        }
       

        [HttpPost]
        public async Task<ActionResult> Update([FromBody]List<TenantGroupPermisstionInputDTO> param)
        {
            if (param.Count == 0)
            {
                return BadRequest();
            }
            var r = await _unitOfWork.TenantGroupPermissions.UpdateAsync(param, SysERP.GoHR);
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> GridFuntion(GridFunctionInput param)
        {
            if (param == null)
            {
                return BadRequest();
            }
            var r = await _unitOfWork.TenantGroupPermissions.GridPermission(param, SysERP.GoHR);
            return Ok(r);
        }
    }
}
