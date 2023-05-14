using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using CoreDAL.Repositories;
using CoreDAL.ViewModels;

namespace CoreAPI.Authorization
{
    [Common.Middleware.HistaffAuthorize()]
    [Produces("application/json")]
    [Route("api/author/groupfunction/[action]")]
    public class SysGroupFunctionController : BaseController
    {
        //private readonly IConfiguration _config;
        public SysGroupFunctionController(IUnitOfWork unitOfWork) : base(unitOfWork)
        {

        }

        [HttpGet]
        public async Task<ActionResult> GetAll(SysGroupFunctionDTO param)
        {
            var r = await _unitOfWork.SysGroupFunctions.GetAll(param);
            return Ok(r);
        }

        [HttpGet]
        public async Task<ActionResult> Get(int Id)
        {
            var r = await _unitOfWork.SysGroupFunctions.GetById(Id);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Add([FromBody]SysGroupFunctionInputDTO param)
        {
            if (param == null)
            {
                return BadRequest();
            }
            if (param.Code == null)
            {
                return TLAResult("CODE_NOT_BLANK");
            }

            if (param.Name == null)
            {
                return TLAResult("NAME_NOT_BLANK");
            }
            if (param.ApplicationId == 0)
            {
                return TLAResult("APPLICATION_NOT_BLANK");
            }

            var r = await _unitOfWork.SysGroupFunctions.CreateAsync(param);
            return TLAResult(r);
        }

        [HttpPost]
        public async Task<ActionResult> Update([FromBody]SysGroupFunctionInputDTO param)
        {
            if (param == null)
            {
                return BadRequest();
            }
            if (param.Id == 0)
            {
                return TLAResult("ID_NOT_BLANK");
            }
            if (param.ApplicationId == 0)
            {
                return TLAResult("APPLICATION_NOT_BLANK");
            }
            if (param.Code == null)
            {
                return TLAResult("CODE_NOT_BLANK");
            }
            if (param.Name == null)
            {
                return TLAResult("NAME_NOT_BLANK");
            }
            if (param.ApplicationId == 0)
            {
                return TLAResult("APPLICATION_NOT_BLANK");
            }
            var r = await _unitOfWork.SysGroupFunctions.UpdateAsync(param);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> ChangeStatus([FromBody]List<int> ids)
        {
            var r = await _unitOfWork.SysGroupFunctions.ChangeStatusAsync(ids);
            return TLAResult(r);
        }
    }
}
