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
    [Route("api/tenant/group/[action]")]
    public class TenantGroupController : BaseController
    {
        public TenantGroupController(IUnitOfWork unitOfWork) : base(unitOfWork)
        {

        }

        /// <summary>
        /// Get All Group User HR
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult> GetAll(TenantGroupDTO param)
        {
            var r = await _unitOfWork.TenantGroups.GetAll(param, SysERP.GoHR);
            return Ok(r);
        }


        /// <summary>
        /// Get by ID Group User HR
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult> GetById(int id)
        {
            var r = await _unitOfWork.TenantGroups.GetById(id, SysERP.GoHR);
            return Ok(r);
        }

        [HttpPost]
        public async Task<ActionResult> Create([FromBody]TenantGroupInputDTO item)
        {
            if (item == null)
            {
                return BadRequest();
            }
            var r = await _unitOfWork.TenantGroups.CreateAsync(item, SysERP.GoHR);
            return TLAResult(r);
        }

        [HttpPost]
        public async Task<ActionResult> Update([FromBody]TenantGroupInputDTO item)
        {
            if (item == null)
            {
                return BadRequest();
            }
            var r = await _unitOfWork.TenantGroups.UpdateAsync(item, SysERP.GoHR);
            return TLAResult(r);
        }


        [HttpPost]
        public async Task<ActionResult> ChangeStatus([FromBody]List<int> ids)
        {
            var r = await _unitOfWork.TenantGroups.ChangeStatusAsync(ids, SysERP.GoHR);
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> GetListGroup()
        {
            var r = await _unitOfWork.TenantGroups.GetListGroup(SysERP.GoHR);
            return TLAResult(r);
        }
    }
}
