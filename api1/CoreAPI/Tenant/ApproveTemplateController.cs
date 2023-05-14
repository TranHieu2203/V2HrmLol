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
    [Route("api/tenant/approvetemplate/[action]")]
    public class ApproveTemplateController : BaseController
    {
        public ApproveTemplateController(IUnitOfWork unitOfWork) : base(unitOfWork)
        {

        }

        [HttpGet]
        public async Task<ActionResult> GetApproveTemplate(ApproveTemplateDTO param)
        {
            var r = await _unitOfWork.ApproveTemplates.GetApproveTemplate(param);
            return Ok(r);
        }

        [HttpGet]
        public async Task<ActionResult> GetApproveTemplateById(int id)
        {
            var r = await _unitOfWork.ApproveTemplates.GetApproveTemplateById(id);
            return Ok(r);
        }

        [HttpPost]
        public async Task<ActionResult> CreateApproveTemplate([FromBody] ApproveTemplateDTO item)
        {
            if (item == null)
            {
                return BadRequest();
            }
            var r = await _unitOfWork.ApproveTemplates.CreateApproveTemplate(item);
            return TLAResult(r);
        }

        [HttpPost]
        public async Task<ActionResult> UpdateApproveTemplate([FromBody] ApproveTemplateDTO item)
        {
            if (item == null)
            {
                return BadRequest();
            }
            var r = await _unitOfWork.ApproveTemplates.UpdateApproveTemplate(item);
            return TLAResult(r);
        }

        [HttpPost]
        public async Task<ActionResult> DeleteApproveTemplate([FromBody] List<int> ids)
        {
            var r = await _unitOfWork.ApproveTemplates.DeleteApproveTemplate(ids);
            return TLAResult(r);
        }

        [HttpGet]
        public async Task<ActionResult> GetApproveTemplateDetail(int templateId)
        {
            var r = await _unitOfWork.ApproveTemplates.GetApproveTemplateDetail(templateId);
            return Ok(r);
        }

        [HttpGet]
        public async Task<ActionResult> GetApproveTemplateDetailById(int id)
        {
            var r = await _unitOfWork.ApproveTemplates.GetApproveTemplateDetailById(id);
            return Ok(r);
        }

        [HttpPost]
        public async Task<ActionResult> CreateApproveTemplateDetail([FromBody] ApproveTemplateDetailDTO item)
        {
            if (item == null)
            {
                return BadRequest();
            }
            var r = await _unitOfWork.ApproveTemplates.CreateApproveTemplateDetail(item);
            return TLAResult(r);
        }

        [HttpPost]
        public async Task<ActionResult> UpdateApproveTemplateDetail([FromBody] ApproveTemplateDetailDTO item)
        {
            if (item == null)
            {
                return BadRequest();
            }
            var r = await _unitOfWork.ApproveTemplates.UpdateApproveTemplateDetail(item);
            return TLAResult(r);
        }

        [HttpPost]
        public async Task<ActionResult> DeleteApproveTemplateDetail([FromBody] List<int> ids)
        {
            var r = await _unitOfWork.ApproveTemplates.DeleteApproveTemplateDetail(ids);
            return TLAResult(r);
        }

        [HttpGet]
        public async Task<ActionResult> GetListPosition()
        {
            var r = await _unitOfWork.ApproveTemplates.GetListPosition();
            return Ok(r);
        }
    }
}
