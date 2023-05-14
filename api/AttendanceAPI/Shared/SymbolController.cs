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
    [Route("api/hr/Symbol/[action]")]
    public class SymbolController : BaseController2
    {
        public SymbolController(IAttendanceBusiness unitOfWork) : base(unitOfWork)
        {

        }
        [HttpGet]
        public async Task<ActionResult> GetAll(SymbolDTO param)
        {
            var r = await _unitOfWork.SymbolRepository.GetAll(param);
            return Ok(r);
        }
        [HttpGet]
        public async Task<ActionResult> Get(int Id)
        {
            var r = await _unitOfWork.SymbolRepository.GetById(Id);
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> GetList()
        {
            var r = await _unitOfWork.SymbolRepository.GetList();
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Add([FromBody] SymbolInputDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.SymbolRepository.CreateAsync(param);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Update([FromBody] SymbolInputDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.SymbolRepository.UpdateAsync(param);
            return TLAResult(r);

        }
    }
}