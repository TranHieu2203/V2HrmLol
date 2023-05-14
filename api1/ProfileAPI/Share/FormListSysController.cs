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
    [Route("api/hr/FormListsys/[action]")]
    public class FormListSysController : BaseController1
    {
        public FormListSysController(IProfileBusiness unitOfWork) : base(unitOfWork)
        {

        }
        [HttpGet]
        public async Task<ActionResult> GetById(int id)
        {
            var r = await _unitOfWork.FormListSysRepository.GetById(id);
            return Ok(r);
        }
        [HttpGet]
        public async Task<ActionResult> GetList()
        {
            var r = await _unitOfWork.FormListSysRepository.GetList();
            return Ok(r);
        }

        [HttpPost]
        public async Task<ActionResult> Update([FromBody] FormListSysDTO Param)
        {
            var r = await _unitOfWork.FormListSysRepository.UpdateAsync(Param);
            return TLAResult(r);
        }
    }
}
