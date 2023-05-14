using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Common.Extensions;
using CoreDAL.ViewModels;
using CoreDAL.Repositories;

namespace CoreAPI.Authorization
{
    [Common.Middleware.HistaffAuthorize()]
    [Produces("application/json")]
    [Route("api/author/permission/[action]")]
    public class SysPermissionController : BaseController
    {
        public SysPermissionController(IUnitOfWork unitOfWork) : base(unitOfWork)
        {

        }

        [HttpGet]
        public async Task<ActionResult> GetAll(SysPermissionDTO values)
        {
            var r = await _unitOfWork.SysPermissions.GetAll(values);
            return Ok(r);
        }

        [HttpGet]
        public async Task<ActionResult> Get(int Id)
        {
            var r = await _unitOfWork.SysPermissions.Get(Id);
            if (r != null)
            {
                return Ok(r);
            }
            else
            {
                return BadRequest(new ResultWithError(400));
            }

        }
        [HttpPost]
        public async Task<ActionResult> Add([FromBody]SysPermissionInputDTO param)
        {
            //VALID REQUIRE
            if (param.Code == null)
            {
                return TLAResult("CODE_NOT_BLANK");
            }
            if (param.Name == null)
            {
                return TLAResult("NAME_NOT_BLANK");
            }
            var r = await _unitOfWork.SysPermissions.CreateAsync(param);
            return TLAResult(r);
        }

        [HttpPost]
        public async Task<ActionResult> Update([FromBody]SysPermissionInputDTO param)
        {
            //VALID REQUIRE
            if (param.Code == null)
            {
                return TLAResult("CODE_NOT_BLANK");
            }
            if (param.Name == null)
            {
                return TLAResult("NAME_NOT_BLANK");
            }
            var r = await _unitOfWork.SysPermissions.UpdateAsync(param);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> ChangeStatus([FromBody]List<int> ids)
        {
            if (ids.Count == 0)
            {
                return TLAResult("ID_NOT_BLANK");
            }
            var r = await _unitOfWork.SysPermissions.ChangeStatusAsync(ids);
            return TLAResult(r);
        }

        [HttpGet]
        public async Task<ActionResult> GetListPermission()
        {
            var r = await _unitOfWork.SysPermissions.GetListPermission();
            return TLAResult(r);
        }
    }
}
