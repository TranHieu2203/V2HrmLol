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
    [Route("api/hr/SalaryPeriod/[action]")]
    public class SalaryPeriodController : BaseController2
    {
        public SalaryPeriodController(IAttendanceBusiness unitOfWork) : base(unitOfWork)
        {

        }
        [HttpGet]
        public async Task<ActionResult> GetAll(SalaryPeriodDTO param)
        {
            var r = await _unitOfWork.SalaryPeriodRepository.GetAll(param);
            return Ok(r);
        }
        [HttpGet]
        public async Task<ActionResult> Get(int Id)
        {
            var r = await _unitOfWork.SalaryPeriodRepository.GetById(Id);
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> GetList(int? Id)
        {
            var r = await _unitOfWork.SalaryPeriodRepository.GetList(Id);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Add([FromBody] SalaryPeriodInputDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.SalaryPeriodRepository.CreateAsync(param);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Update([FromBody] SalaryPeriodInputDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.SalaryPeriodRepository.UpdateAsync(param);
            return TLAResult(r);

        }

        /// <summary>
        /// Portal
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult> GetYear()
        {
            var r = await _unitOfWork.SalaryPeriodRepository.GetYear();
            return TLAResult(r);
        }
        /// <summary>
        /// Portal
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult> PortalGetYear()
        {
            var r = await _unitOfWork.SalaryPeriodRepository.PortalGetYear();
            return TLAResult(r);
        }

        /// <summary>
        /// PortalByYear
        /// </summary>
        /// <param name="year"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult> PortalByYear(int year)
        {
            var r = await _unitOfWork.SalaryPeriodRepository.PortalByYear(year);
            return TLAResult(r);
        }

    }
}
