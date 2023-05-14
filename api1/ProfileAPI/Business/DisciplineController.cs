using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using ProfileDAL.Repositories;
using ProfileDAL.ViewModels;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Common;

namespace ProfileAPI.List
{
    [Common.Middleware.HistaffAuthorize()]
    [Produces("application/json")]
    [Route("api/hr/discipline/[action]")]
    public class DisciplineController : BaseController1
    {
        public DisciplineController(IProfileBusiness unitOfWork) : base(unitOfWork)
        {

        }
        [HttpGet]
        public async Task<ActionResult> GetAll(DisciplineDTO param)
        {
            var r = await _unitOfWork.DisciplineRepository.GetAll(param);
            return Ok(r);
        }
        [HttpGet]
        public async Task<ActionResult> Get(long Id)
        {
            var r = await _unitOfWork.DisciplineRepository.GetById(Id);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Add([FromBody] DisciplineInputDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.DisciplineRepository.CreateAsync(param);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Update([FromBody] DisciplineInputDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.DisciplineRepository.UpdateAsync(param);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Remove([FromBody] long id)
        {
            var r = await _unitOfWork.DisciplineRepository.RemoveAsync(id);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> OpenStatus([FromBody] long id)
        {
            var r = await _unitOfWork.DisciplineRepository.OpenStatus(id);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Approve([FromBody] long id)
        {
            var r = await _unitOfWork.DisciplineRepository.Approve(id);
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> PortalGetAll()
        {
            var r = await _unitOfWork.DisciplineRepository.PortalGetAll();
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> PortalGetBy(long id)
        {
            var r = await _unitOfWork.DisciplineRepository.PortalGetBy(id);
            return TLAResult(r);
        }
    }
}
