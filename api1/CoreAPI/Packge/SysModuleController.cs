using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using CoreDAL.ViewModels;
using CoreDAL.Repositories;

namespace CoreAPI.Packge
{
    [Common.Middleware.HistaffAuthorize()]
    [Produces("application/json")]
    [Route("api/package/module/[action]")]
    public class SysModuleController : BaseController
    {
        public SysModuleController(IUnitOfWork unitOfWork) : base(unitOfWork)
        {

        }

        [HttpGet]
        public async Task<ActionResult> GetAll(SysModuleDTO values)
        {
            var r = await _unitOfWork.SysModules.GetAll(values);
            return Ok(r);
        }

        [HttpGet]
        public async Task<ActionResult> Get(int Id)
        {
            var r = await _unitOfWork.SysModules.GetById(Id);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Add([FromBody]SysModuleInputDTO param)
        {
            // Valid Require
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.SysModules.CreateAsync(param);
            return TLAResult(r);
        }

        [HttpPost]
        public async Task<ActionResult> Update([FromBody]SysModuleInputDTO param)
        {
            // Valid Require
            if (param == null)
            {
                return BadRequest();
            }
            if (param.Id == 0)
            {
                return TLAResult("ID_NOT_BLANK");
            }
            if (param.Name == null)
            {
                return TLAResult("NAME_NOT_BLANK");
            }
            if (param.Code == null)
            {
                return TLAResult("CODE_NOT_BLANK");
            }
            var r = await _unitOfWork.SysModules.UpdateAsync(param);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> ChangeStatus([FromBody]List<int> ids)
        {
            var r = await _unitOfWork.SysModules.ChangeStatusAsync(ids);
            return TLAResult(r);
        }
    }
}
