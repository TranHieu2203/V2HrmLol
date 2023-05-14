using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using PayrollDAL.ViewModels;
using PayrollDAL.Repositories;
using System.Collections.Generic;

namespace PayrollAPI.List
{
    [Common.Middleware.HistaffAuthorize()]
    [Produces("application/json")]
    [Route("api/payroll/paycheck/[action]")]
    public class PaycheckController : BaseController
    {
        public PaycheckController(IPayrollBusiness unitOfWork) : base(unitOfWork)
        {

        }

        [HttpGet]
        public async Task<ActionResult> GetAll(PaycheckDTO values)
        {
            var r = await _unitOfWork.PaycheckRepository.GetAll(values);
            return Ok(r);
        }

        [HttpGet]
        public async Task<ActionResult> Get(int Id)
        {
            var r = await _unitOfWork.PaycheckRepository.GetById(Id);
            return TLAResult(r);
        }
        
      
        [HttpPost]
        public async Task<ActionResult> Add([FromBody] PaycheckInputListDTO param)
        {

            var r = await _unitOfWork.PaycheckRepository.CreateAsync(param);
            return TLAResult(r);
        }

        [HttpPost]
        public async Task<ActionResult> Update([FromBody] PaycheckInputDTO param)
        {

            var r = await _unitOfWork.PaycheckRepository.UpdateAsync(param);
            return TLAResult(r);
        }
        

        [HttpPost]
        public async Task<ActionResult> QuickUpdate([FromBody] PaycheckInputDTO param)
        {

            var r = await _unitOfWork.PaycheckRepository.QuickUpdate(param);
            return TLAResult(r);
        }

        [HttpPost]
        public async Task<ActionResult> Remove([FromBody] List<int> ids)
        {

            var r = await _unitOfWork.PaycheckRepository.RemoveAsync(ids);
            return TLAResult(r);
        }
    }
}
