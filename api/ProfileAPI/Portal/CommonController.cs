using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using ProfileDAL.Repositories;
using Common.Extensions;
using System;

namespace ProfileAPI.List
{
    [Common.Middleware.HistaffAuthorize()]
    [Produces("application/json")]
    [Route("api/hr/portal/[action]")]
    public class CommonController : BaseController1
    {
        public CommonController(IProfileBusiness unitOfWork) : base(unitOfWork)
        {
        }

        [HttpGet]
        public async Task<ActionResult> GetInfo()
        {
            var r = await _unitOfWork.EmployeeRepository.GetInfo();
            return TLAResult(r);
        }

        [HttpGet]
        public async Task<ActionResult> InsuranceGetAll()
        {
            var r = await _unitOfWork.InsChangeRepository.PortalGetAll();
            return TLAResult(r);
        }

        [HttpPost]
        public async Task<ActionResult> PortalWatched([FromBody]long id)
        {
            try
            {
                var r = await _unitOfWork.BlogInternalRepository.PortalWatched(id);
                return TLAResult(r);
            }
            catch (System.Exception ex)
            {
                throw ex;
            }
        }
        [HttpGet]
        public async Task<ActionResult> ConvertSolar2Lunar(string date)
        {
            CommonFunction cs = new CommonFunction();
            var r = cs.convertSolar2Lunar(date,7);
            return TLAResult(r);
        }
    }
}
