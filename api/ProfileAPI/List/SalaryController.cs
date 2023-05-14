using System.Collections.Generic;
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
    [Route("api/hr/Salarytype/[action]")]
    public class SalaryController : BaseController1
    {
        public SalaryController(IProfileBusiness unitOfWork) : base(unitOfWork)
        {

        }
        [HttpGet]
        public async Task<ActionResult> GetAll(SalaryTypeDTO param)
        {
            var r = await _unitOfWork.SalaryRepository.GetAll(param);
            return Ok(r);
        }
        [HttpGet]
        public async Task<ActionResult> Get(int Id)
        {
            var r = await _unitOfWork.SalaryRepository.GetById(Id);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Add([FromBody]SalaryTypeInputDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.SalaryRepository.CreateAsync(param);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Update([FromBody]SalaryTypeInputDTO param)
        {
            if (param == null)
            {
                return TLAResult("PARAM_NOT_BLANK");
            }
            if (param.Id == null)
            {
                return TLAResult("ID_NOT_BLANK");
            }
            if (string.IsNullOrWhiteSpace(param.Code))
            {
                return TLAResult("CODE_NOT_BLANK");
            }
            if (string.IsNullOrWhiteSpace(param.Name))
            {
                return TLAResult("NAME_NOT_BLANK");
            }

            var r = await _unitOfWork.SalaryRepository.UpdateAsync(param);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> ChangeStatus([FromBody]List<int> ids)
        {
            var r = await _unitOfWork.SalaryRepository.ChangeStatusAsync(ids);
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> GetList()
        {
            var r = await _unitOfWork.SalaryRepository.GetList();
            return TLAResult(r);
        }

    }
}
