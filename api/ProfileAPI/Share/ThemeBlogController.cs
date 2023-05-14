using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using ProfileDAL.Repositories;
using ProfileDAL.ViewModels;
using Common.Paging;

namespace ProfileAPI.Share
{
    [Common.Middleware.HistaffAuthorize()]
    [Produces("application/json")]
    [Route("api/hr/ThemeBlog/[action]")]
    public class ThemeBlogController : BaseController1
    {
        public ThemeBlogController(IProfileBusiness unitOfWork) : base(unitOfWork)
        {
        }

        [HttpGet]
        public async Task<ActionResult> GetAll(ThemeBlogDTO param)
        {
            var r = await _unitOfWork.ThemeBlogRepository.GetAll(param);
            return Ok(r);
        }
        [HttpGet]
        public async Task<ActionResult> GetList()
        {
            var r = await _unitOfWork.ThemeBlogRepository.GetList();
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> Get(int Id)
        {
            var r = await _unitOfWork.ThemeBlogRepository.GetById(Id);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Add([FromBody] ThemeBlogInputDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }

            var r = await _unitOfWork.ThemeBlogRepository.CreateAsync(param);
            return TLAResult(r);
        }

        [HttpPost]
        public async Task<ActionResult> Update([FromBody] ThemeBlogInputDTO param)
        {

            if (param.Id == null)
            {
                return TLAResult("ID_NOT_BLANK");
            }

            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }

            var r = await _unitOfWork.ThemeBlogRepository.UpdateAsync(param);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> ChangeStatus([FromBody] List<int> ids)
        {
            var r = await _unitOfWork.ThemeBlogRepository.ChangeStatusAsync(ids);
            return TLAResult(r);
        }
      
    }
}
