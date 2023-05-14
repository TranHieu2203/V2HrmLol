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
    [Route("api/hr/grouppositionsys/[action]")]
    public class GroupPositionSysController : BaseController1
    {
        public GroupPositionSysController(IProfileBusiness unitOfWork) : base(unitOfWork)
        {
        }

        [HttpGet]
        public async Task<ActionResult> GetAll(GroupPositionSysDTO param)
        {
            var r = await _unitOfWork.GroupPositionSysRepository.GetAll(param);
            return Ok(r);
        }
        [HttpGet]
        public async Task<ActionResult> Get(int Id)
        {
            var r = await _unitOfWork.GroupPositionSysRepository.GetById(Id);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Add([FromBody]GroupPositionSysInputDTO param)
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


            var r = await _unitOfWork.GroupPositionSysRepository.CreateAsync(param);
            return TLAResult(r);
        }

        [HttpPost]
        public async Task<ActionResult> Update([FromBody]GroupPositionSysInputDTO param)
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

            var r = await _unitOfWork.GroupPositionSysRepository.UpdateAsync(param);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> ChangeStatus([FromBody]List<int> ids)
        {
            var r = await _unitOfWork.GroupPositionSysRepository.ChangeStatusAsync(ids);
            return TLAResult(r);
        }

        [HttpGet]
        public async Task<ActionResult> GetList()
        {
            try
            {
                var r = await _unitOfWork.GroupPositionSysRepository.GetList();
                return TLAResult(r);
            }
            catch (System.Exception ex)
            {
                throw ex;
            }
        }
        [HttpGet]
        public async Task<ActionResult> GetListByArea(int areaId)
        {
            try
            {
                var r = await _unitOfWork.GroupPositionSysRepository.GetListByArea(areaId);
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
            var r = await _unitOfWork.GroupPositionSysRepository.Delete(id);
            return TLAResult(r);
        }
    }
}
