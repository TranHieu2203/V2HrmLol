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
    [Route("api/author/function/[action]")]
    public class SysFunctionController : BaseController
    {

        public SysFunctionController(IUnitOfWork unitOfWork) : base(unitOfWork)
        {

        }

        [HttpGet]
        public async Task<ActionResult> GetAll(SysFunctionDTO values)
        {
            var r = await _unitOfWork.SysFunctions.GetAll(values);
            return Ok(r);
        }

        [HttpGet]
        public async Task<ActionResult> Get(int Id)
        {
            var r = await _unitOfWork.SysFunctions.GetById(Id);
            return TLAResult(r);

        }
        [HttpPost]
        public async Task<ActionResult> Add([FromBody]SysFunctionInputDTO param)
        {
            // Valid Require
            if (param == null)
            {
                return BadRequest();
            }
            if (param.Name == null)
            {
                return TLAResult("NAME_NOT_BLANK");
            }
            if (param.Code == null)
            {
                return TLAResult("CODE_NOT_BLANK");
            }
            if (param.GroupId == 0)
            {
                return TLAResult("GROUP_NOT_BLANK");
            }
            var r = await _unitOfWork.SysFunctions.CreateAsync(param);
            return TLAResult(r);
        }

        [HttpPost]
        public async Task<ActionResult> Update([FromBody]SysFunctionInputDTO param)
        {
            // Valid Require
            if (param == null)
            {
                return BadRequest();
            }
            if (param.Name == null)
            {
                return TLAResult("NAME_NOT_BLANK");
            }
            if (param.Code == null)
            {
                return TLAResult("CODE_NOT_BLANK");
            }
            if (param.GroupId == 0)
            {
                return TLAResult("GROUP_NOT_BLANK");
            }
            if (param.Id == 0)
            {
                return TLAResult("GROUP_NOT_BLANK");
            }
            var r = await _unitOfWork.SysFunctions.UpdateAsync(param);
            return TLAResult(r);
        }
        /// <summary>
        /// CMS Change Status Data
        /// </summary>
        /// <param name="ids"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult> ChangeStatus([FromBody]List<int> ids)
        {
            var r = await _unitOfWork.SysFunctions.ChangeStatusAsync(ids);
            return TLAResult(r);
        }
    }
}
