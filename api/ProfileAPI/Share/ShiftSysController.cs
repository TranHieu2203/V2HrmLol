using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using ProfileDAL.Repositories;
using ProfileDAL.ViewModels;

namespace ProfileAPI.Share
{
    [Common.Middleware.HistaffAuthorize()]
    [Produces("application/json")]
    [Route("api/hr/ShiftSys/[action]")]
    public class ShiftSysController : BaseController1
    {
        public ShiftSysController(IProfileBusiness unitOfWork) : base(unitOfWork)
        {

        }
        [HttpGet]
        public async Task<ActionResult> GetAll(ShiftSysDTO param)
        {
            try
            {
                var r = await _unitOfWork.ShiftSysRepository.GetAll(param);
                return Ok(r);
            }
            catch (System.Exception ex)
            {

                throw;
            }
            
        }
        [HttpGet]
        public async Task<ActionResult> Get(int Id)
        {
            var r = await _unitOfWork.ShiftSysRepository.GetById(Id);
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> GetList()
        {
            var r = await _unitOfWork.ShiftSysRepository.GetList();
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> GetShiftCycle(int Id)
        {
            var r = await _unitOfWork.ShiftSysRepository.GetShiftCycle(Id);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Add([FromBody] ShiftSysInputDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.ShiftSysRepository.CreateAsync(param);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Update([FromBody] ShiftSysInputDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.ShiftSysRepository.UpdateAsync(param);
            return TLAResult(r);

        }
        [HttpPost]
        public async Task<ActionResult> UpdateShiftCycle([FromBody] ShiftCycleSysInput param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.ShiftSysRepository.UpdateShiftCycle(param);
            return TLAResult(r);

        }
    }
}
