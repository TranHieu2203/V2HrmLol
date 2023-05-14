using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using ProfileDAL.Repositories;
using ProfileDAL.ViewModels;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Common;
using PayrollDAL.ViewModels;
using System;
using Microsoft.AspNetCore.Hosting;

namespace ProfileAPI.List
{
    [Common.Middleware.HistaffAuthorize()]
    [Produces("application/json")]
    [Route("api/hr/candidate/[action]")]
    public class CandidateController : BaseController1
    {
        private IWebHostEnvironment _hostingEnvironment;
        public CandidateController(IProfileBusiness unitOfWork, IWebHostEnvironment hostingEnvironment) : base(unitOfWork)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpGet]
        public async Task<ActionResult> GetAll(CandidateScanCVDTO param)
        {
            var r = await _unitOfWork.CandidateRepository.GetAll(param);
            return Ok(r);
        }
        [HttpGet]
        public async Task<ActionResult> Get(long Id)
        {
            var r = await _unitOfWork.CandidateRepository.GetById(Id);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Add([FromBody] CandidateScanCVInputDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.CandidateRepository.CreateAsync(param);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Update([FromBody] CandidateScanCVInputDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.CandidateRepository.UpdateAsync(param);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Remove([FromBody] long id)
        {
            var r = await _unitOfWork.CandidateRepository.RemoveAsync(id);
            return TLAResult(r);
        }

        [HttpPost]
        public async Task<ActionResult> ReadFileCV([FromForm] CandidateScanCVImportDTO param)
        {
            try
            {
                param.Environment = _hostingEnvironment;
                param.scheme = HttpContext.Request.Scheme;
                param.host = HttpContext.Request.Host.Value;
                var res = await _unitOfWork.CandidateRepository.ReadFileCVAsync(param);
                return TLAResult(res);

            }
            catch (System.Exception ex)
            {
                return TLAResult(ex.Message);
            }

        }



    }
}
