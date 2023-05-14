using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using ProfileDAL.Repositories;
using ProfileDAL.ViewModels;
using System.Collections.Generic;

namespace ProfileAPI.List
{
    [Common.Middleware.HistaffAuthorize()]
    [Produces("application/json")]
    [Route("api/Setting/pospaper/[action]")]
    public class PositionPaperController : BaseController1
    {
        public PositionPaperController(IProfileBusiness unitOfWork) : base(unitOfWork)
        {

        }
        [HttpGet]
        public async Task<ActionResult> GetAll(PostionPaperDTO param)
        {
            var r = await _unitOfWork.PositionPaperRepository.GetAll(param);
            return Ok(r);
        }
        [HttpPost]
        public async Task<ActionResult> CreateAsync([FromBody] PosPaperInputDTO param)
        {
            var r = await _unitOfWork.PositionPaperRepository.CreateAsync(param);
            return Ok(r);
        }

        [HttpPost]
        public async Task<ActionResult> DeleteAsync([FromBody] List<int> ids)
        {
            var r = await _unitOfWork.PositionPaperRepository.DeleteAsync(ids);
            return Ok(r);
        }
    }
}
