using System.Collections.Generic;
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
    [Route("api/hr/Vote/[action]")]
    public class VoteController : BaseController1
    {
        public VoteController(IProfileBusiness unitOfWork) : base(unitOfWork)
        {

        }
        [HttpPost]
        public async Task<ActionResult> CreateQuestion([FromBody] QuestionDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.VoteRepository.CreateQuestion(param);
            return Ok(r);
        }

        [HttpGet]
        public async Task<ActionResult> GetQuestion(int? id)
        {
            var r = await _unitOfWork.VoteRepository.GetQuestion(id);
            return TLAResult(r);
        }

        [HttpPost]
        public async Task<ActionResult> AddAnswer([FromBody] QuestionOutputDTO param)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return TLAValidation();
                }
                var r = await _unitOfWork.VoteRepository.AddAnswer(param);
                return TLAResult(r);
            }
            catch (System.Exception ex)
            {
                return new RedirectResult(ex.Message);
            }
        }

        [HttpGet]
        public async Task<ActionResult> GetAll(QuestionPagingDTO param)
        {
            var r = await _unitOfWork.VoteRepository.GetAll(param);
            return Ok(r);
        }
        [HttpGet]
        public async Task<ActionResult> Get(int Id)
        {
            try
            {
                var r = await _unitOfWork.VoteRepository.GetById(Id);
                return TLAResult(r);
            }
            catch (System.Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public async Task<ActionResult> ChangeStatus([FromBody] List<int> ids)
        {
            var r = await _unitOfWork.VoteRepository.ChangeStatusAsync(ids);
            return TLAResult(r);
        }

        [HttpGet]
        public async Task<ActionResult> PortalList()
        {
            var r = await _unitOfWork.VoteRepository.PortalList();
            return Ok(r);
        }
    }
}
