using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using ProfileDAL.Repositories;
using ProfileDAL.ViewModels;

namespace ProfileAPI.List
{
    [Common.Middleware.HistaffAuthorize()]
    [Produces("application/json")]
    [Route("api/hr/commend/[action]")]
    public class CommendController : BaseController1
    {
        public CommendController(IProfileBusiness unitOfWork) : base(unitOfWork)
        {

        }
        [HttpGet]
        public async Task<ActionResult> GetAll(CommendDTO param)
        {
            var r = await _unitOfWork.CommendRepository.GetAll(param);
            return Ok(r);
        }
        [HttpGet]
        public async Task<ActionResult> Get(long Id)
        {
            var r = await _unitOfWork.CommendRepository.GetById(Id);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Add([FromBody]CommendInputDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.CommendRepository.CreateAsync(param);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Update([FromBody]CommendInputDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.CommendRepository.UpdateAsync(param);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Remove([FromBody]long id)
        {
            var r = await _unitOfWork.CommendRepository.RemoveAsync(id);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> OpenStatus([FromBody]long id)
        {
            var r = await _unitOfWork.CommendRepository.OpenStatus(id);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Approve([FromBody]long id)
        {
            var r = await _unitOfWork.CommendRepository.Approve(id);
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> PortalGetAll()
        {
            var r = await _unitOfWork.CommendRepository.PortalGetAll();
            return Ok(r);
        }
        [HttpGet]
        public async Task<ActionResult> PortalGetBy(long id)
        {
            var r = await _unitOfWork.CommendRepository.PortalGetBy(id);
            return Ok(r);
        }
    }
}
