using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using ProfileDAL.Repositories;
using ProfileDAL.ViewModels;
using System.Collections.Generic;
using Common.Extensions;

namespace ProfileAPI.List
{
    [Common.Middleware.HistaffAuthorize()]
    [Produces("application/json")]
    [Route("api/hr/booking/[action]")]
    public class BookingController : BaseController1
    {
        public BookingController(IProfileBusiness unitOfWork) : base(unitOfWork)
        {

        }
        [HttpGet]
        public async Task<ActionResult> GetAll(BookingDTO param)
        {
            var r = await _unitOfWork.BookingRepository.GetAll(param);
            return Ok(r);
        }
        [HttpGet]
        public async Task<ActionResult> Get(int Id)
        {
            var r = await _unitOfWork.BookingRepository.GetById(Id);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> PortalReg([FromBody]BookingInputDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.BookingRepository.PortalReg(param);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> PortalEditReg([FromBody]BookingInputDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.BookingRepository.PortalEditReg(param);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> PortalDelete([FromBody]int id)
        {
            var r = await _unitOfWork.BookingRepository.PortalDelete(id);
            return TLAResult(r);
        }

        [HttpPost]
        public async Task<ActionResult> Approve([FromBody]ApproveDTO param)
        {
            var r = await _unitOfWork.BookingRepository.ChangeStatusAsync(param.Id, OtherConfig.STATUS_APPROVE,param.ApproveNote);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Reject([FromBody]ApproveDTO param)
        {
            var r = await _unitOfWork.BookingRepository.ChangeStatusAsync(param.Id, OtherConfig.STATUS_DECLINE, param.ApproveNote);
            return TLAResult(r);
        }

        [HttpGet]
        public async Task<ActionResult> PortalMyList()
        {
            var r = await _unitOfWork.BookingRepository.PortalMyList();
            return Ok(r);
        }

        [HttpPost]
        public async Task<ActionResult> PortalListByRoom([FromBody]BookingDTO param)
        {
            var r = await _unitOfWork.BookingRepository.PortalListByRoom(param);
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> PortalGetBy(int id)
        {
            var r = await _unitOfWork.BookingRepository.PortalGetBy(id);
            return Ok(r);
        }
    }
}
