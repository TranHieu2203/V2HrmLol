using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Common.Extensions;
using CoreDAL.Models;
using CoreDAL.Repositories;
using CoreDAL.ViewModels;
using System;
using ProfileDAL.Repositories;

namespace CoreAPI.MultiTenant
{
    [Common.Middleware.HistaffAuthorize()]
    [Produces("application/json")]
    [Route("api/tenant/[action]")]
    public class TenantController : BaseController
    {
        protected readonly IProfileBusiness _IProfileBusiness;
        public TenantController(IUnitOfWork unitOfWork, IProfileBusiness IProfileBusiness) : base(unitOfWork)
        {
            _IProfileBusiness = IProfileBusiness;
        }

        [HttpGet]
        public async Task<ActionResult> GetAll(TenantDTO param)
        {
            var r = await _unitOfWork.Tenants.GetAll(param);
            return Ok(r);
        }
        [HttpGet]
        public async Task<ActionResult> GetUser(TenantUserDTO param)
        {
            var r = await _unitOfWork.TenantUserRepository.GetAll(param);
            return Ok(r);
        }
        [HttpGet]
        public async Task<ActionResult> GetAllFunction(SysFunctionDTO param)
        {
            var r = await _unitOfWork.Tenants.GetAllFunction(param, SysERP.GoHR);
            return Ok(r);
        }
        /// <summary>
        /// admin tenant create user 
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult> Create([FromBody] TenantUserInputDTO item)
        {
            try
            {
                if (!this.ModelState.IsValid)
                {
                    return TLAValidation();
                }

                var r = await _unitOfWork.TenantUserRepository.CreateAsync(item);
                if (r.StatusCode == "200")
                {
                    var x = r.Data;
                    string ID = (string)x.GetType().GetProperty("ID").GetValue(x, null);
                    await _IProfileBusiness.UserOrganiRepository.GrantGroupOrgPermissionTouser(item.GroupId, ID);

                }
                return TLAResult(r);

            }
            catch (Exception ex)
            {
                return Ok(ex);
            }

        }
        [HttpPost]
        public async Task<ActionResult> Update([FromBody] TenantUserInputDTO item)
        {
            if (!this.ModelState.IsValid)
            {
                return TLAValidation();
            }
            var r = await _unitOfWork.TenantUserRepository.UpdateAsync(item);
            if (r.StatusCode == "200")
            {
                var x = r.Data;
                string ID = (string)x.GetType().GetProperty("ID").GetValue(x, null);
                int? GROUP_OLD_ID = (int?)x.GetType().GetProperty("GROUP_OLD_ID").GetValue(x, null);

                if (GROUP_OLD_ID != item.GroupId)
                {
                    await _IProfileBusiness.UserOrganiRepository.GrantGroupOrgPermissionTouser(item.GroupId, ID);
                }
            }
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> ChangeStatus([FromBody] List<int> ids)
        {
            if (ids.Count == 0)
            {
                return TLAResult("ID_NOT_BLANK");
            }
            var r = await _unitOfWork.Tenants.ChangeStatusAsync(ids);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> ChangePassword([FromBody] ChangePasswordTenantParam param)
        {
            if (param.UserName == null || param.UserName.Trim().Length == 0)
            {
                return TLAResult("USERNAME_NOT_BLANK");
            }
            if (param.CurrentPassword == null || param.CurrentPassword.Trim().Length == 0)
            {
                return TLAResult("CURRENT_PASS_NOT_BLANK");
            }
            if (param.NewPassword == null || param.NewPassword.Trim().Length == 0)
            {
                return TLAResult("NEW_PASS_NOT_BLANK");
            }
            var r = await _unitOfWork.Tenants.ChangePasswordAsync(param);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> LockTenantUser([FromBody] List<string> ids)
        {
            if (ids.Count == 0)
            {
                return TLAResult("ID_NOT_BLANK");
            }
            var r = await _unitOfWork.TenantUserRepository.LockTenantUser(ids);
            return TLAResult(r);
        }
        
        [HttpGet]
        public async Task<ActionResult> GetAllUser(TenantUserDTO values)
        {
            var r = await _unitOfWork.Tenants.GetAllUser(values);
            return Ok(r);
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult> CheckCode(string values)
        {
            var r = await _unitOfWork.Tenants.CheckCode(values);
            return Ok(r);
        }
        [HttpGet]
        public async Task<ActionResult> GetById(int id)
        {
            var r = await _unitOfWork.Tenants.GetById(id);
            return Ok(r);
        }
        [HttpGet]
        public async Task<ActionResult> GetUserId(string id)
        {
            var r = await _unitOfWork.Tenants.GetUser(id);
            return Ok(r);
        }

        /// <summary>
        /// Lấy ra mã QRCode của Tenant
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult> GetQRCode()
        {
            var r = await _unitOfWork.Tenants.GetQRCode();
            return Ok(r);
        }

        /// <summary>
        /// Check QRCode Tenant (User scan QRCode of Tenant)
        /// </summary>
        /// <param name="qrCode"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult> ScanQRCode(string qrCode)
        {
            var r = await _unitOfWork.Tenants.ScanQRCode(qrCode);
            return Ok(r);
        }

        [HttpGet]
        public async Task<ActionResult> GetListByTenant(int? groupId)
        {
            var r = await _unitOfWork.TenantUserRepository.GetListByTenant(groupId);
            return Ok(r);
        }
        [HttpGet]
        public async Task<ActionResult> GetListTenant()
        {
            var r = await _unitOfWork.Tenants.GetListTenent();
            return Ok(r);
        }

        [HttpPost]
        public async Task<ActionResult> ClearEquitment([FromBody] TenantUserInputDTO param)
        {
            var r = await _unitOfWork.Tenants.ClearEquitment(param.Id);
            return Ok(r);
        }


        [HttpPost]
        public async Task<ActionResult> TemplateImport()
        {
            try
            {
                var stream = await _unitOfWork.TenantUserRepository.TemplateImport();
                var fileName = "templateUser.xlsx";
                if (stream.StatusCode == "200")
                {
                    return new FileStreamResult(stream.memoryStream, "application/octet-stream") { FileDownloadName = fileName };
                }
                return TLAResult(stream);
            }
            catch (System.Exception ex)
            {
                return TLAResult(ex.Message);
            }
        }
        [HttpPost]
        public async Task<ActionResult> ImportUser([FromBody] ImportUserParam param)
        {
            try
            {
                var r = await _unitOfWork.TenantUserRepository.ImportUser(param);
                if (r.memoryStream != null)
                {
                    var fileName = "TempContractError.xlsx";
                    return new FileStreamResult(r.memoryStream, "application/octet-stream") { FileDownloadName = fileName };
                }
                return ImportResult(r);

            }
            catch (System.Exception ex)
            {
                return TLAResult(ex.Message);
            }
        }

 


        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult> ClearEquitment(EquitmentParam param)
        {
            try
            {
                var r = await _unitOfWork.TenantUserRepository.ClearEquitment(param);
                return TLAResult(r);

            }
            catch (System.Exception ex)
            {
                return TLAResult(ex.Message);
            }
        }
    }
}
