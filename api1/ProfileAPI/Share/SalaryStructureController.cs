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
    [Route("api/hr/structuresys/[action]")]
    public class SalaryStructureSysController : BaseController1
    {
        public SalaryStructureSysController(IProfileBusiness unitOfWork) : base(unitOfWork)
        {

        }

        [HttpGet]
        public async Task<ActionResult> GetAll(SalaryStructureSysDTO values)
        {
            var r = await _unitOfWork.SalaryStructureSysRepository.GetAll(values);
            return Ok(r);
        }

        [HttpGet]
        public async Task<ActionResult> Get(int Id)
        {
            var r = await _unitOfWork.SalaryStructureSysRepository.GetById(Id);
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> GetList(int SalaryTypeId)
        {
            var r = await _unitOfWork.SalaryStructureSysRepository.GetList(SalaryTypeId);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Add([FromBody] SalaryStructureSysInputDTO param)
        {

            var r = await _unitOfWork.SalaryStructureSysRepository.CreateAsync(param);
            return TLAResult(r);
        }

        [HttpPost]
        public async Task<ActionResult> Update([FromBody] SalaryStructureSysInputDTO param)
        {

            var r = await _unitOfWork.SalaryStructureSysRepository.UpdateAsync(param);
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> GetSalaryElement(long salaryTypeId)
        {
            var r = await _unitOfWork.SalaryStructureSysRepository.GetElement(salaryTypeId);
            return TLAResult(r);
        }
    }
}
