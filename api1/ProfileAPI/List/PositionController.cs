using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using ProfileDAL.Repositories;
using ProfileDAL.ViewModels;
using Common.Extensions;

namespace ProfileAPI.List
{
    [Common.Middleware.HistaffAuthorize()]
    [Produces("application/json")]
    [Route("api/hr/Position/[action]")]
    [Route("api/hr/Position/")]
    public class PositionController : BaseController1
    {
        public PositionController(IProfileBusiness unitOfWork) : base(unitOfWork)
        {

        }
        [HttpGet]
        public async Task<ActionResult> GetAll(PositionViewDTO param)
        {
            var r = await _unitOfWork.PositionRepository.GetAll(param);
            return Ok(r);
        }
        [HttpGet]
        public async Task<ActionResult> Get(int Id)
        {
            var r = await _unitOfWork.PositionRepository.GetById(Id);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Add([FromBody] PositionInputDTO param)
        {
            if (param == null)
            {
                return TLAResult("PARAM_NOT_BLANK");
            }
            //if (param.GroupId == null)
            //{
            //    return TLAResult("GROUP_NOT_BLANK");
            //}
            if (string.IsNullOrWhiteSpace(param.code))
            {
                return TLAResult("CODE_NOT_BLANK");
            }
            // if (string.IsNullOrWhiteSpace(param.name))
            // {
            //     return TLAResult("NAME_NOT_BLANK");
            // }

            var r = await _unitOfWork.PositionRepository.CreateAsync(param);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Update([FromBody] PositionInputDTO param)
        {
            if (param == null)
            {
                return TLAResult("PARAM_NOT_BLANK");
            }
            if (param.id == null)
            {
                return TLAResult("ID_NOT_BLANK");
            }
            //if (param.GroupId == null)
            //{
            //    return TLAResult("GROUP_NOT_BLANK");
            //}
            if (string.IsNullOrWhiteSpace(param.code))
            {
                return TLAResult("CODE_NOT_BLANK");
            }
            // if (string.IsNullOrWhiteSpace(param.name))
            // {
            //     return TLAResult("NAME_NOT_BLANK");
            // }

            var r = await _unitOfWork.PositionRepository.UpdateAsync(param);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> ChangeStatus([FromBody] List<int> ids)
        {
            var r = await _unitOfWork.PositionRepository.ChangeStatusAsync(ids);
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> GetList(int groupId)
        {
            var r = await _unitOfWork.PositionRepository.GetList(groupId);
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> GetListJob()
        {
            var r = await _unitOfWork.PositionRepository.GetListJob();
            return TLAResult(r);
        }

        [HttpPost]
        public async Task<ActionResult> Delete([FromBody] List<int> param)
        {
            if (!ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.PositionRepository.Delete(param);
            return TLAResult(r);
        }

        [HttpGet]
        [Route("positions/{org}/{emp}")]
        public async Task<ActionResult> GetPositionByOrgID(int org, int emp)
        {
            var r = await _unitOfWork.PositionRepository.GetByOrg(org, emp);
            return TLAResult(r);
        }

        [HttpGet]
        [Route("direct-manager/{positionId}")]
        public async Task<ActionResult> GetDirectManager(int positionId)
        {
            var r = await _unitOfWork.PositionRepository.GetLM(positionId);
            return TLAResult(r);
        }
        [HttpGet]
        public string AutoGenCodeHuTile(string tableName, string colName)
        {
            var r = _unitOfWork.PositionRepository.AutoGenCodeHuTile(tableName, colName);
            return r;
        }
        [HttpPost]
        public async Task<ActionResult> ModifyPositionById(PositionInputDTO param, int orgRight, int Address, int orgIDDefault = 1, int isDissolveDefault = 0)
        {
            if (param == null)
            {
                return TLAResult("PARAM_NOT_BLANK");
            }

            var r = await _unitOfWork.PositionRepository.ModifyPositionById(param, orgRight, Address, orgIDDefault, isDissolveDefault);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> InsertPositionNB(PositionInputDTO obj, int OrgRight, int Address, int OrgIDDefault = 1, int IsDissolveDefault = 0)
        {
            if (obj == null)
            {
                return TLAResult("PARAM_NOT_BLANK");
            }

            var r = await _unitOfWork.PositionRepository.InsertPositionNB(obj, OrgRight, Address, OrgIDDefault, IsDissolveDefault);
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> GetOrgTreeApp(string sLang)
        {
            var r = await _unitOfWork.PositionRepository.GetOrgTreeApp(sLang);
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> GetPositionOrgID(PositionViewDTO _filter)
        {
            var r = await _unitOfWork.PositionRepository.GetPositionOrgID(_filter);
            return Ok(r);
        }
    }
}
