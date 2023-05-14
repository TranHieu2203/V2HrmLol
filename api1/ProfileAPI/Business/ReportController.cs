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
    [Route("api/hr/Report/[action]")]
    public class ReportController : BaseController1
    {
        public ReportController(IProfileBusiness unitOfWork) : base(unitOfWork)
        {

        }
        [HttpGet]
        public async Task<ActionResult> GetAll(ReportInputDTO param)
        {
            var r = await _unitOfWork.ReportRepository.GetAll(param);
            return Ok(r);
        }
        [HttpGet]
        public async Task<ActionResult> GetTreeView()
        {
            var r = await _unitOfWork.ReportRepository.GetList();
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> GetListReport()
        {
            var r = await _unitOfWork.ReportRepository.GetListReport();
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> Get(int Id)
        {
            var r = await _unitOfWork.ReportRepository.GetById(Id);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Add([FromBody] ReportInputDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }


            var r = await _unitOfWork.ReportRepository.CreateAsync(param);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Update([FromBody] ReportInputDTO param)
        {
            if (param == null)
            {
                return TLAResult("PARAM_NOT_BLANK");
            }


            var r = await _unitOfWork.ReportRepository.UpdateAsync(param);
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> GetList()
        {
            var r = await _unitOfWork.ReportRepository.GetList();
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> Delete(int Id)
        {
            if (Id == 0)
            {
                return TLAResult("PARAM_NOT_BLANK");
            }
            var r = await _unitOfWork.ReportRepository.Delete(Id);
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> GetOrgPermission()
        {
            var r = await _unitOfWork.UserOrganiRepository.GetOrgPermission();
            return Ok(r);
        }
        [HttpGet]
        public async Task<ActionResult> ReportIns(ReportInsInputDTO param)
        {
            var r = await _unitOfWork.ReportRepository.ReportIns(param);
            return Ok(r);
        }
        [HttpGet]
        public async Task<ActionResult> ReportEmployee(ReportEmployeeDTO param)
        {
            var r = await _unitOfWork.ReportRepository.ReportEmployee(param);
            return Ok(r);
        }
        [HttpGet]
        public async Task<ActionResult> ReportInsByOrg(ReportInsByOrgDTO param)
        {
            var r = await _unitOfWork.ReportRepository.ReportInsByOrg(param);
            return Ok(r);
        }
        [HttpGet]
        public async Task<ActionResult> ReportChartProfile(ReportParam param)
        {
            var r = await _unitOfWork.ReportRepository.REPORT_HU001(param);
            return Ok(r);
        }
        [HttpGet]
        public async Task<ActionResult> ReportsProfile(ReportParam param)
        {
            var r = await _unitOfWork.ReportRepository.REPORT_HU009(param);
            return Ok(r);
        }

    }
}
