using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using AttendanceDAL.Repositories;
using AttendanceDAL.ViewModels;

namespace AttendanceAPI.List
{
    [Common.Middleware.HistaffAuthorize()]
    [Produces("application/json")]
    [Route("api/hr/TimeType/[action]")]
    public class TimeTypeController : BaseController2
    {
        public TimeTypeController(IAttendanceBusiness unitOfWork) : base(unitOfWork)
        {

        }
        [HttpGet]
        public async Task<ActionResult> GetAll(TimeTypeDTO param)
        {
            var r = await _unitOfWork.TimeTypeRepository.GetAll(param);
            return Ok(r);
        }
        [HttpGet]
        public async Task<ActionResult> Get(int Id)
        {
            var r = await _unitOfWork.TimeTypeRepository.GetById(Id);
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> GetList()
        {
            var r = await _unitOfWork.TimeTypeRepository.GetList();
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> GetListOff()
        {
            var r = await _unitOfWork.TimeTypeRepository.GetListOff();
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Add([FromBody] TimeTypeInputDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.TimeTypeRepository.CreateAsync(param);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Update([FromBody] TimeTypeInputDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.TimeTypeRepository.UpdateAsync(param);
            return TLAResult(r);

        }

        [HttpGet]
        public async Task<ActionResult> PortalGetListOff()
        {
            var r = await _unitOfWork.TimeTypeRepository.PortalGetListOff();
            return TLAResult(r);
        }
    }
}
