using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using ProfileDAL.Repositories;
using ProfileDAL.ViewModels;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Common;
using System.Collections.Generic;

namespace ProfileAPI.List
{
    [Common.Middleware.HistaffAuthorize()]
    [Produces("application/json")]
    [Route("api/hr/terminate/[action]")]
    public class TerminateController : BaseController1
    {
        public TerminateController(IProfileBusiness unitOfWork) : base(unitOfWork)
        {

        }
        [HttpGet]
        public async Task<ActionResult> GetAll(TerminateDTO param)
        {
            var r = await _unitOfWork.TerminateRepository.GetAll(param);
            return Ok(r);
        }
        [HttpGet]
        public async Task<ActionResult> Get(long Id)
        {
            var r = await _unitOfWork.TerminateRepository.GetById(Id);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Add([FromBody] TerminateInputDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.TerminateRepository.CreateAsync(param);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Update([FromBody] TerminateInputDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.TerminateRepository.UpdateAsync(param);
            return TLAResult(r);
        }
       
        [HttpPost]
        public async Task<ActionResult> Approve([FromBody] long id)
        {
            var r = await _unitOfWork.TerminateRepository.Approve(id);
            return TLAResult(r);
        }

        [HttpPost]
        public async Task<ActionResult> Remove([FromBody] List<long> ids)
        {
            var r = await _unitOfWork.TerminateRepository.RemoveAsync(ids);
            return TLAResult(r);
        }

    }
}
