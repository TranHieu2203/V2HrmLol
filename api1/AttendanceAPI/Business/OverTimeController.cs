using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using AttendanceDAL.Repositories;
using AttendanceDAL.ViewModels;
using Common.Extensions;
using System.Collections.Generic;

namespace AttendanceAPI.List
{
    [Common.Middleware.HistaffAuthorize()]
    [Produces("application/json")]
    [Route("api/hr/OverTime/[action]")]
    public class OverTimeController : BaseController2
    {
        public OverTimeController(IAttendanceBusiness unitOfWork) : base(unitOfWork)
        {

        }
       
        //[HttpGet]
        //public async Task<ActionResult> GetAll(OverTimeDTO param)
        //{
        //    var r = await _unitOfWork.OverTimeRepository.GetAll(param);
        //    return Ok(r);
        //}
        [HttpPost]
        public async Task<ActionResult> Create([FromBody] OverTimeCreateDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.OverTimeRepository.CreateAsync(param);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Update([FromBody] OverTimeInputDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.OverTimeRepository.UpdateAsync(param);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Approved([FromBody] List<int> param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.OverTimeRepository.ChangeStatusAsync(param, OtherConfig.STATUS_APPROVE);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Denied([FromBody] List<int> param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.OverTimeRepository.ChangeStatusAsync(param, OtherConfig.STATUS_DECLINE);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Delete([FromBody] List<int> param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.OverTimeRepository.Delete(param);
            return TLAResult(r);
        }


        [HttpGet]
        public async Task<ActionResult> GetConfig()
        {
            var r = await _unitOfWork.OverTimeRepository.GetConfig();
            return Ok(r);
        }
        [HttpPost]
        public async Task<ActionResult> UpdateConfig([FromBody] OverTimeConfigDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.OverTimeRepository.UpdateConfig(param);
            return TLAResult(r);
        }
       

        [HttpPost]
        public async Task<ActionResult> PortalReg([FromBody] RegisterOffInputDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.RegisterOffRepository.PortalReg(param, Consts.REGISTER_OT);
            return TLAResult(r);
        }

        [HttpPost]
        public async Task<ActionResult> PortalApprove([FromBody] PortalApproveDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.RegisterOffRepository.PortalApprove(param, Consts.REGISTER_OT, OtherConfig.STATUS_APPROVE);
            return TLAResult(r);
        }

        [HttpPost]
        public async Task<ActionResult> PortalReject([FromBody] PortalApproveDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.RegisterOffRepository.PortalApprove(param, Consts.REGISTER_OT, OtherConfig.STATUS_DECLINE);
            return TLAResult(r);
        }

        [HttpGet]
        public async Task<ActionResult> PortalWaitList()
        {
            var r = await _unitOfWork.RegisterOffRepository.PortalWaitList(Consts.REGISTER_OT);
            return Ok(r);
        }

    }
}
