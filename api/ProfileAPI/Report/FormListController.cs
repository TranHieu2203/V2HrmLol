using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using ProfileDAL.Repositories;
using ProfileDAL.ViewModels;
using System.Collections.Generic;
using Common.Middleware;
using System.Security.Claims;

namespace ProfileAPI.List
{
    [Common.Middleware.HistaffAuthorize()]
    [Produces("application/json")]
    [Route("api/hr/FormList/[action]")]
    public class FormListController : BaseController1
    {
        public FormListController(IProfileBusiness unitOfWork) : base(unitOfWork)
        {

        }
        [HttpGet]
        public async Task<ActionResult> GetById(int id)
        {
            var r = await _unitOfWork.FormListRepository.GetById(id);
            return Ok(r);
        }
        [HttpGet]
        public async Task<ActionResult> GetTreeView()
        {
            var r = await _unitOfWork.FormListRepository.GetTreeView();
            return Ok(r);
        }

        [HttpPost]
        public async Task<ActionResult> Update([FromBody] FormListDTO Param)
        {
            var r = await _unitOfWork.FormListRepository.UpdateAsync(Param);
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> GetListRemind()
        {
            var r = await _unitOfWork.FormListRepository.GetListRemind();
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> GetRemind()
        {
            var r = await _unitOfWork.FormListRepository.GetRemind();
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> PrintForm(int id, int typeId)
        {
            var r = await _unitOfWork.FormListRepository.PrintForm(id, typeId);
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> PrintFormProfile(int id)
        {
            var r = await _unitOfWork.FormListRepository.PrintFormProfile(id);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> PrintFormSalary([FromBody] PayrollInputDTO param)
        {
            var r = await _unitOfWork.FormListRepository.PrintFormSalary(param);

            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> PrintFormAttendance([FromBody] PayrollInputDTO param)
        {
            var r = await _unitOfWork.FormListRepository.PrintFormAttendance(param);

            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> UpdateRemind([FromBody] List<SettingRemindDTO> param)
        {
            var r = await _unitOfWork.FormListRepository.UpdateRemind(param);
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> GetDashboard()
        {
            var r = await _unitOfWork.FormListRepository.GetDashboard();
            return TLAResult(r);
        }

    }
}
