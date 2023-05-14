using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using ProfileDAL.Repositories;
using ProfileDAL.ViewModels;
using Common.Paging;

namespace ProfileAPI.List
{
    [Common.Middleware.HistaffAuthorize()]
    [Produces("application/json")]
    [Route("api/hr/BlogInternal/[action]")]
    public class BlogInternalController : BaseController1
    {
        public BlogInternalController(IProfileBusiness unitOfWork) : base(unitOfWork)
        {
        }

        [HttpGet]
        public async Task<ActionResult> GetAll(BlogInternalDTO param)
        {
            var r = await _unitOfWork.BlogInternalRepository.GetAll(param);
            return Ok(r);
        }
        [HttpGet]
        public async Task<ActionResult> Get(int Id)
        {
            try
            {
                var r = await _unitOfWork.BlogInternalRepository.GetById(Id);
                return TLAResult(r);
            }
            catch (System.Exception ex)
            {
                throw ex;
            }
           
        }
        [HttpPost]
        public async Task<ActionResult> Add([FromBody] BlogInternalInputDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }

            var r = await _unitOfWork.BlogInternalRepository.CreateAsync(param);
            return TLAResult(r);
        }

        [HttpPost]
        public async Task<ActionResult> Update([FromBody] BlogInternalInputDTO param)
        {

            if (param.Id == null)
            {
                return TLAResult("ID_NOT_BLANK");
            }

            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }

            var r = await _unitOfWork.BlogInternalRepository.UpdateAsync(param);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> ChangeStatus([FromBody] List<int> ids)
        {
            var r = await _unitOfWork.BlogInternalRepository.ChangeStatusAsync(ids);
            return TLAResult(r);
        }

        [HttpGet]
        public async Task<ActionResult> PortalGetList(Pagings param)
        {
            try
            {
                var r = await _unitOfWork.BlogInternalRepository.PortalGetList(param);
                return TLAResult(r);
            }
            catch (System.Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet]
        public async Task<ActionResult> PortalGetById(int id)
        {
            try
            {
                var r = await _unitOfWork.BlogInternalRepository.PortalGetById(id);
                return TLAResult(r);
            }
            catch (System.Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet]
        public async Task<ActionResult> PortalGetNewest()
        {
            try
            {
                var r = await _unitOfWork.BlogInternalRepository.PortalGetNewest();
                return TLAResult(r);
            }
            catch (System.Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet]
        public async Task<ActionResult> PortalNotify()
        {
            try
            {
                var r = await _unitOfWork.BlogInternalRepository.PortalNotify();
                return TLAResult(r);
            }
            catch (System.Exception ex)
            {
                throw ex;
            }
        }
        
        /// <summary>
        /// Portal Get slider for Home 
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult> PortalHomeNew()
        {
            try
            {
                var r = await _unitOfWork.BlogInternalRepository.PortalHomeNew();
                return TLAResult(r);
            }
            catch (System.Exception ex)
            {
                throw ex;
            }
        }
    }
}
