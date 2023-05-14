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
    [Route("api/hr/room/[action]")]
    public class RoomController : BaseController1
    {
        public RoomController(IProfileBusiness unitOfWork) : base(unitOfWork)
        {

        }
        [HttpGet]
        public async Task<ActionResult> GetAll(RoomDTO param)
        {
            var r = await _unitOfWork.RoomRepository.GetAll(param);
            return Ok(r);
        }
        [HttpGet]
        public async Task<ActionResult> Get(int Id)
        {
            var r = await _unitOfWork.RoomRepository.GetById(Id);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Add([FromBody]RoomInputDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.RoomRepository.CreateAsync(param);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Update([FromBody]RoomInputDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.RoomRepository.UpdateAsync(param);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Remove([FromBody]int id)
        {
            var r = await _unitOfWork.RoomRepository.Remove(id);
            return TLAResult(r);
        }

        [HttpPost]
        public async Task<ActionResult> ChangeStatus([FromBody]List<int> ids)
        {
            var r = await _unitOfWork.RoomRepository.ChangeStatusAsync(ids);
            return TLAResult(r);
        }

        [HttpGet]
        public async Task<ActionResult> GetList()
        {
            var r = await _unitOfWork.RoomRepository.GetList();
            return Ok(r);
        }
    }
}
