using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using CoreDAL.ViewModels;
using CoreDAL.Repositories;
using Common.Extensions;
namespace CoreAPI.Packge
{
    [Common.Middleware.HistaffAuthorize()]
    [Produces("application/json")]
    [Route("api/package/otherlist/[action]")]
    public class SysOtherListController : BaseController
    {

        public SysOtherListController(IUnitOfWork unitOfWork) : base(unitOfWork)
        {

        }

        [HttpGet]
        public async Task<ActionResult> CMSGetAllType(SysOtherListTypeDTO param)
        {
            var r = await _unitOfWork.SysOtherLists.CMSGetAllType(param);
            return Ok(r);
        }

        [HttpGet]
        public async Task<ActionResult> CMSGetByType(SysOtherListDTO param)
        {
            var r = await _unitOfWork.SysOtherLists.CMSGetByType(param);
            return Ok(r);
        }

        [HttpGet]
        public async Task<ActionResult> CreateTypeAsync(SysOtherListTypeInputDTO param)
        {
            //VALID REQUIRE
            if (param.Code == null)
            {
                return TLAResult("CODE_NOT_BLANK");
            }
            if (param.Name == null)
            {
                return TLAResult("NAME_NOT_BLANK");
            }
            var r = await _unitOfWork.SysOtherLists.CreateTypeAsync(param);
            return Ok(r);
        }

        [HttpPost]
        public async Task<ActionResult> UpdateTypeAsync([FromBody]SysOtherListTypeInputDTO param)
        {
            //VALID REQUIRE
            if (param.Code == null)
            {
                return TLAResult("CODE_NOT_BLANK");
            }
            if (param.Name == null)
            {
                return TLAResult("NAME_NOT_BLANK");
            }
            var r = await _unitOfWork.SysOtherLists.UpdateTypeAsync(param);
            return TLAResult(r);
        }

        [HttpPost]
        public async Task<ActionResult> ChangeStatusTypeAsync([FromBody]List<int> ids)
        {
            if (ids.Count == 0)
            {
                return TLAResult("ID_NOT_BLANK");
            }
            var r = await _unitOfWork.SysOtherLists.ChangeStatusTypeAsync(ids);
            return TLAResult(r);
        }

        [HttpPost]
        public async Task<ActionResult> Add([FromBody]SysOtherListInputDTO param)
        {
            //VALID REQUIRE
            if (param.Code == null)
            {
                return TLAResult("CODE_NOT_BLANK");
            }
            if (param.Name == null)
            {
                return TLAResult("NAME_NOT_BLANK");
            }
            if (param.TypeId == null || param.TypeId == 0)
            {
                return TLAResult("TYPE_NOT_BLANK");
            }
            var r = await _unitOfWork.SysOtherLists.CreateAsync(param);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Update([FromBody]SysOtherListInputDTO param)
        {
            //VALID REQUIRE
            if (param.Code == null)
            {
                return TLAResult("CODE_NOT_BLANK");
            }
            if (param.Name == null)
            {
                return TLAResult("NAME_NOT_BLANK");
            }
            if (param.TypeId == null || param.TypeId == 0)
            {
                return TLAResult("TYPE_NOT_BLANK");
            }
            var r = await _unitOfWork.SysOtherLists.UpdateAsync(param);
            return TLAResult(r);
        }

        [HttpPost]
        public async Task<ActionResult> ChangeStatusAsync([FromBody]List<int> ids)
        {
            if (ids.Count == 0)
            {
                return TLAResult("ID_NOT_BLANK");
            }

            var r = await _unitOfWork.SysOtherLists.ChangeStatusAsync(ids);
            return TLAResult(r);
        }

        [HttpGet]
        public async Task<ActionResult> GetOtherListByType(string code)
        {
            if (code == null || code.Trim().Length == 0)
            {
                return TLAResult("CODE_NOT_BLANK");
            }
            var r = await _unitOfWork.SysOtherLists.GetOtherListByType(code);
            return TLAResult(r);
        }

        /// <summary>
        /// Get Application
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult> GetApplication()
        {           
            var r = await _unitOfWork.SysOtherLists.GetSysConfixByType(SystemConfig.APPLICATION);
            return TLAResult(r);
        }

        /// <summary>
        /// Get List Server
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult> GetListServer()
        {
            var r = await _unitOfWork.SysOtherLists.GetSysConfixByType(SystemConfig.SERVER);
            return TLAResult(r);
        }

        /// <summary>
        /// GetAreas
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> GetAreas()
        {
            var r = await _unitOfWork.SysOtherLists.GetOtherListByType(SystemConfig.OTHER_AREA);
            return TLAResult(r);
        }
    }
}
