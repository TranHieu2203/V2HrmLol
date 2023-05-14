using Common.Extensions;
using CoreDAL.Repositories;
using CoreDAL.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreAPI.MultiTenant
{
    [Common.Middleware.HistaffAuthorize()]
    [Produces("application/json")]
    [Route("api/tenant/approveprocess/[action]")]
    public class ApproveProcessController : BaseController
    {
        public ApproveProcessController(IUnitOfWork unitOfWork) : base(unitOfWork)
        {

        }

        [HttpGet]
        public async Task<ActionResult> GetAll(ApproveProcessDTO param)
        {
            var r = await _unitOfWork.ApproveProcess.GetAll(param, SysERP.GoHR);
            return Ok(r);
        }

        [HttpGet]
        public async Task<ActionResult> GetById(int id)
        {
            var r = await _unitOfWork.ApproveProcess.GetById(id, SysERP.GoHR);
            return Ok(r);
        }

        [HttpPost]
        public async Task<ActionResult> Update([FromBody] ApproveProcessDTO item)
        {
            if (item == null)
            {
                return BadRequest();
            }
            var r = await _unitOfWork.ApproveProcess.UpdateAsync(item, SysERP.GoHR);
            return TLAResult(r);
        }
    }
}
