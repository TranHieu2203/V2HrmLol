using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using CoreDAL.ViewModels;
using CoreDAL.Repositories;

namespace CoreAPI
{
    [Common.Middleware.HistaffAuthorize()]
    [Produces("application/json")]
    [Route("api/author/groupuser/[action]")]
    public class SysGroupUserController : BaseController
    {
        //private readonly IConfiguration _config;
        public SysGroupUserController(IUnitOfWork unitOfWork) : base(unitOfWork)
        {

        }

        [HttpGet]
        public async Task<ActionResult> GetAll(SysGroupUserDTO values)
        {
            var r = await _unitOfWork.SysGroupUsers.GetAll(values);
            return Ok(r);
        }

        [HttpGet]
        public async Task<ActionResult> Get(int Id)
        {
            var r = await _unitOfWork.SysGroupUsers.GetById(Id);
            return TLAResult(r);
        }

        [HttpPost]
        public async Task<ActionResult> Add([FromBody]SysGroupUserInputDTO param)
        {
            //VALID REQUIRE
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
            var r = await _unitOfWork.SysGroupUsers.CreateAsync(param);
            return TLAResult(r);

        }
        [HttpPost]
        public async Task<ActionResult> Update([FromBody]SysGroupUserInputDTO param)
        {
            //VALID REQUIRE
            if (param == null)
            {
                return BadRequest();
            }
            if (param.Id == 0)
            {
                return TLAResult("ID_NOT_BLANK");
            }
            if (param.Code == null)
            {
                return TLAResult("CODE_NOT_BLANK");
            }
            if (param.Name == null)
            {
                return TLAResult("NAME_NOT_BLANK");
            }
            var r = await _unitOfWork.SysGroupUsers.UpdateAsync(param);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> ChangeStatus([FromBody]List<int> ids)
        {
            if (ids.Count == 0)
            {
                return TLAResult("ID_NOT_BLANK");
            }
            var r = await _unitOfWork.SysGroupUsers.ChangeStatusAsync(ids);
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> GetList()
        {
            var r = await _unitOfWork.SysGroupUsers.GetList();
            return TLAResult(r);
        }
    }
}