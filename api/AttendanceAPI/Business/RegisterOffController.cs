using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using AttendanceDAL.Repositories;
using AttendanceDAL.ViewModels;
using Common.Extensions;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System;

namespace AttendanceAPI.List
{
    [Common.Middleware.HistaffAuthorize()]
    [Produces("application/json")]
    [Route("api/hr/RegisterOff/[action]")]
    public class RegisterOffController : BaseController2
    {
        public RegisterOffController(IAttendanceBusiness unitOfWork, ILogger<BaseController2> logger) : base(unitOfWork, logger)
        {

        }
        [HttpGet]
        public async Task<ActionResult> GetAllRegisterOff(RegisterOffDTO param)
        {
            try
            {
                param.TypeId = Consts.REGISTER_OFF;
                var r = await _unitOfWork.RegisterOffRepository.GetAll(param);
                return Ok(r);
            }
            catch (Exception ex)
            {
                return TLAResult(ex);
            }
        }
        [HttpGet]
        public async Task<ActionResult> GetAllEarlyLate(RegisterOffDTO param)
        {
            try
            {
                param.TypeId = Consts.REGISTER_LATE;
                var r = await _unitOfWork.RegisterOffRepository.GetAllOTEL(param);
                return Ok(r);
            }
            catch (Exception ex)
            {
                return TLAResult(ex);
            }
        }
        [HttpGet]
        public async Task<ActionResult> GetAllOT(RegisterOffDTO param)
        {
            try
            {
                param.TypeId = Consts.REGISTER_OT;
                var r = await _unitOfWork.RegisterOffRepository.GetAllOTEL(param);
                return Ok(r);
            }
            catch (Exception ex)
            {
                return TLAResult(ex);
            }
        }
        [HttpPost]
        public async Task<ActionResult> Update([FromBody] RegisterOffInputDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.RegisterOffRepository.UpdateAsync(param);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Create([FromBody] RegisterOffInputDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.RegisterOffRepository.CreateAsync(param, Consts.REGISTER_OFF);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Approved([FromBody] List<int> param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.RegisterOffRepository.ChangeStatusAsync(param, OtherConfig.STATUS_APPROVE);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Denied([FromBody] List<int> param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.RegisterOffRepository.ChangeStatusAsync(param, OtherConfig.STATUS_DECLINE);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Delete([FromBody] List<int> param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.RegisterOffRepository.Delete(param);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> PortalReg([FromBody] RegisterOffInputDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.RegisterOffRepository.PortalReg(param, Consts.REGISTER_OFF);
            return TLAResult(r);
        }

        [HttpPost]
        public async Task<ActionResult> PortalApprove([FromBody] PortalApproveDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.RegisterOffRepository.PortalApprove(param, Consts.REGISTER_OFF, OtherConfig.STATUS_APPROVE);
            return TLAResult(r);
        }

        [HttpPost]
        public async Task<ActionResult> PortalReject([FromBody] PortalApproveDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.RegisterOffRepository.PortalApprove(param, Consts.REGISTER_OFF, OtherConfig.STATUS_DECLINE);
            return TLAResult(r);
        }

        [HttpGet]
        public async Task<ActionResult> PortalWaitList()
        {
            var r = await _unitOfWork.RegisterOffRepository.PortalWaitList(Consts.REGISTER_OFF);
            return Ok(r);
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> test()
        {
            try
            {
                var  a = new List<string>();
                a.Add("dNaJdUzyTPiCFoztOx1kDZ:APA91bFqWdwgr1BVJwl5_a3zBKs9C1610V6LmyKWsZGqYPK_NY01rZf41MH-4Vw46LlamkCDLENGNhwEMEiuAWi5NHoUrThGLddZBgwkSyiVFuPZr5OsB7x9TGxIWDt1IJVN8ZGrNdI8");
                var r = await _unitOfWork.RegisterOffRepository.test(a);
                return Ok(r);
            }
            catch (Exception ex)
            {
                return TLAResult(ex);
            }
        }
    }
}
