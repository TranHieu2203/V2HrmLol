using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using ProfileDAL.Repositories;

namespace ProfileAPI.List
{
    [Common.Middleware.HistaffAuthorize()]
    [Produces("application/json")]
    [Route("api/hr/notify/[action]")]
    public class NotifyController : BaseController1
    {
        public NotifyController(IProfileBusiness unitOfWork) : base(unitOfWork)
        {
        }



        /// <summary>
        /// Portal Get slider for Home 
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult> PortalHomeCount()
        {
            var r = await _unitOfWork.BlogInternalRepository.PortalHomeNotify();
            return TLAResult(r);
        }

        /// <summary>
        /// Portal Get slider for Home 
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult> PortalApproveCount()
        {
            try
            {
                var r = await _unitOfWork.BlogInternalRepository.PortalApproveNotify();
                return TLAResult(r);
            }
            catch (System.Exception ex)
            {
                throw ex;
            }
        }
    }
}
