using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using AttendanceDAL.Repositories;
using AttendanceDAL.ViewModels;
using System.Collections.Generic;

namespace AttendanceAPI.List
{
    [Common.Middleware.HistaffAuthorize()]
    [Produces("application/json")]
    [Route("api/hr/Shift/[action]")]
    public class ShiftController : BaseController2
    {
        public ShiftController(IAttendanceBusiness unitOfWork) : base(unitOfWork)
        {

        }
        [HttpGet]
        public async Task<ActionResult> GetAll(ShiftDTO param)
        {
            var r = await _unitOfWork.ShiftRepository.GetAll(param);
            return Ok(r);
        }
        [HttpGet]
        public async Task<ActionResult> Get(int Id)
        {
            var r = await _unitOfWork.ShiftRepository.GetById(Id);
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> GetList(int type)
        {
            var r = await _unitOfWork.ShiftRepository.GetList(type);
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> GetShiftCycle(int Id)
        {
            var r = await _unitOfWork.ShiftRepository.GetShiftCycle(Id);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Add([FromBody] ShiftInputDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.ShiftRepository.CreateAsync(param);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Update([FromBody] ShiftInputDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.ShiftRepository.UpdateAsync(param);
            return TLAResult(r);

        }
        [HttpPost]
        public async Task<ActionResult> UpdateShiftCycle([FromBody] ShiftCycleInput param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.ShiftRepository.UpdateShiftCycle(param);
            return TLAResult(r);

        }
        [HttpPost]
        public async Task<ActionResult> ChangeStatus([FromBody] List<int> ids)
        {
           
            var r = await _unitOfWork.ShiftRepository.ChangeStatusAsync(ids);
            return TLAResult(r);

        }
        [HttpGet]
        public async Task<ActionResult> GetListToImport()
        {
            var r = await _unitOfWork.ShiftRepository.GetListToImport();
            return TLAResult(r);
        }
    }
}
