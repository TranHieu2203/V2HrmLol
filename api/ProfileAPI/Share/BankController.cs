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
    [Route("api/hr/bank/[action]")]
    public class BankController : BaseController1
    {
        public BankController(IProfileBusiness unitOfWork) : base(unitOfWork)
        {
        }

        [HttpGet]
        public async Task<ActionResult> GetAll(BankDTO param)
        {
            var r = await _unitOfWork.BankRepository.GetAll(param);
            return Ok(r);
        }
        [HttpGet]
        public async Task<ActionResult> Get(int Id)
        {
            var r = await _unitOfWork.BankRepository.GetById(Id);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Add([FromBody]BankInputDTO param)
        {
            if (param == null)
            {
                return BadRequest();
            }
            if (param.Code == null)
            {
                return TLAResult("CODE_NOT_BLANK");
            }

            if (param.Name == null)
            {
                return TLAResult("NAME_NOT_BLANK");
            }


            var r = await _unitOfWork.BankRepository.CreateAsync(param);
            return TLAResult(r);
        }

        [HttpPost]
        public async Task<ActionResult> Update([FromBody]BankInputDTO param)
        {

            if (param.Id == null)
            {
                return TLAResult("ID_NOT_BLANK");
            }

            if (param.Code == null)
            {
                return TLAResult("CODE_NOT_BLANK");
            }
            if (param.Name == null)
            {
                return TLAResult("NAME_NOT_BLANK");
            }

            var r = await _unitOfWork.BankRepository.UpdateAsync(param);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> ChangeStatus([FromBody]List<int> ids)
        {
            var r = await _unitOfWork.BankRepository.ChangeStatusAsync(ids);
            return TLAResult(r);
        }

        [HttpGet]
        public async Task<ActionResult> GetList()
        {
            try
            {
                var r = await _unitOfWork.BankRepository.GetList();
                return TLAResult(r);
            }
            catch (System.Exception ex)
            {
                throw ex;
            }
        }
       
        [HttpPost]
        public async Task<ActionResult> Delete([FromBody]int id)
        {
            var r = await _unitOfWork.BankRepository.Delete(id);
            return TLAResult(r);
        }
    }
}
