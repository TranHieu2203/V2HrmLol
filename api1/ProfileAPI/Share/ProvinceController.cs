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
    [Route("api/hr/Province/[action]")]
    public class ProvinceController : BaseController1
    {
        public ProvinceController(IProfileBusiness unitOfWork) : base(unitOfWork)
        {

        }
        [HttpGet]
        public async Task<ActionResult> GetAll(ProvinceDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.ProvinceRepository.GetAll(param);
            return Ok(r);

        }
        [HttpGet]
        public async Task<ActionResult> GetListProvince()
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.ProvinceRepository.GetListProvince();
            return Ok(r);

        }
        [HttpGet]
        public async Task<ActionResult> GetListDistrict(int ProvinceId)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.ProvinceRepository.GetListDistrict(ProvinceId);
            return Ok(r);

        }
        [HttpGet]
        public async Task<ActionResult> GetListWard(int DistrictId)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.ProvinceRepository.GetListWard(DistrictId);
            return Ok(r);

        }
        [HttpGet]
        public async Task<ActionResult> Get(int Id)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.ProvinceRepository.GetById(Id);
            return TLAResult(r);

        }
        [HttpPost]
        public async Task<ActionResult> Add([FromBody] ProvinceInputDTO param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }

          
            var r = await _unitOfWork.ProvinceRepository.CreateAsync(param);
            return TLAResult(r);

        }
        [HttpPost]
        public async Task<ActionResult> Update([FromBody] ProvinceInputDTO param)
        {

            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
         

            var r = await _unitOfWork.ProvinceRepository.UpdateAsync(param);
            return TLAResult(r);


        }

    }
}
