using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using ProfileDAL.Repositories;
using ProfileDAL.ViewModels;
using System.Collections.Generic;

namespace ProfileAPI.Share
{
    [Common.Middleware.HistaffAuthorize()]
    [Produces("application/json")]
    [Route("api/hr/salaryelementsys/[action]")]
    public class SalaryElementSysController : BaseController1
    {
        public SalaryElementSysController(IProfileBusiness unitOfWork) : base(unitOfWork)
        {

        }

        [HttpGet]
        public async Task<ActionResult> GetAll(SalaryElementSysDTO values)
        {
            var r = await _unitOfWork.SalaryElementSysRepository.GetAll(values);
            return Ok(r);
        }

        [HttpGet]
        public async Task<ActionResult> Get(int Id)
        {
            var r = await _unitOfWork.SalaryElementSysRepository.GetById(Id);
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> GetListGroup()
        {
            var r = await _unitOfWork.SalaryElementSysRepository.GetListGroup();
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> GetList(int groupid)
        {
            var r = await _unitOfWork.SalaryElementSysRepository.GetList(groupid);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Add([FromBody] SalaryElementSysInputDTO param)
        {

            var r = await _unitOfWork.SalaryElementSysRepository.CreateAsync(param);
            return TLAResult(r);
        }

        [HttpPost]
        public async Task<ActionResult> Update([FromBody] SalaryElementSysInputDTO param)
        {

            var r = await _unitOfWork.SalaryElementSysRepository.UpdateAsync(param);
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> GetSalaryElement(GroupElementSysDTO param)
        {
            var r = await _unitOfWork.SalaryElementSysRepository.GetSalaryElement(param);
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> GetListCal(int SalaryTypeId)
        {
            var r = await _unitOfWork.SalaryElementSysRepository.GetListCal(SalaryTypeId);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> ChangeStatus([FromBody] List<int> ids)
        {
            var r = await _unitOfWork.SalaryElementSysRepository.ChangeStatusAsync(ids);
            return TLAResult(r);
        }
    }
}
