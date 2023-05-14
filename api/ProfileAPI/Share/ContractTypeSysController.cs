using System.Collections.Generic;
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
    [Route("api/hr/ContractTypeSys/[action]")]
    public class ContractTypeSysController : BaseController1
    {
        public ContractTypeSysController(IProfileBusiness unitOfWork) : base(unitOfWork)
        {

        }
        [HttpGet]
        public async Task<ActionResult> GetAll(ContractTypeSysViewDTO param)
        {
            var r = await _unitOfWork.ContractTypeSysRepository.GetAll(param);
            return  Ok(r);
        }
        [HttpGet]
        public async Task<ActionResult> Get(int Id)
        {
            var r = await _unitOfWork.ContractTypeSysRepository.GetById(Id);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Add([FromBody]ContractTypeSysInputDTO param)
        {
            if (param == null)
            {
                return TLAResult("PARAM_NOT_BLANK");
            }
            if(string.IsNullOrWhiteSpace(param.Code))
            {
                return TLAResult("CODE_NOT_BLANK");
            }
            if (string.IsNullOrWhiteSpace(param.Name))
            {
                return TLAResult("NAME_NOT_BLANK");
            }
            
            var r = await _unitOfWork.ContractTypeSysRepository.CreateAsync(param);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Update([FromBody]ContractTypeSysInputDTO param)
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

            var r = await _unitOfWork.ContractTypeSysRepository.UpdateAsync(param);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> ChangeStatus([FromBody]List<int> ids)
        {
            var r = await _unitOfWork.ContractTypeSysRepository.ChangeStatusAsync(ids);
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> GetList()
        {
            var r = await _unitOfWork.ContractTypeSysRepository.GetList();
            return TLAResult(r);
        }

    }
}
