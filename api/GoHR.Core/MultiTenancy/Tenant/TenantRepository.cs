using System.Threading.Tasks;
using Common.Paging;
using CoreDAL.EntityFrameworkCore;
using CoreDAL.Models;
using System.Linq;
using Common.Repositories;
using Common.Extensions;
using System.Collections.Generic;
using System;
using Microsoft.EntityFrameworkCore;
using CoreDAL.ViewModels;
using CoreDAL.Utilities;
using CoreDAL.MultiTenancy.TenantUser.Models;

namespace CoreDAL.Repositories
{
    public class TenantRepository : TLARepository<Tenant>, ITenantRepository
    {
        private CoreDbContext _appContext => (CoreDbContext)_context;
        private IRefreshTokenService _refreshTokenService;

        public TenantRepository(CoreDbContext context, IRefreshTokenService refreshTokenService) : base(context)
        {
            _refreshTokenService = refreshTokenService;
        }
        /// <summary>
        /// CMS Get All Data
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public async Task<PagedResult<SysFunctionDTO>> GetAllFunction(SysFunctionDTO param, int application)
        {
            var queryable = (from x in _appContext.TenantFunctions
                             from p in _appContext.SysFunctions.Where(c => c.ID == x.FUNCTION_ID)
                             from g in _appContext.SysGroupFunctions.Where(c => c.ID == p.GROUP_ID)
                             from o in _appContext.SysConfigs.Where(x => x.ID == g.APPLICATION_ID && x.TYPE == SystemConfig.APPLICATION)
                             from m in _appContext.SysModules.Where(c => c.ID == p.MODULE_ID)
                             select new SysFunctionDTO
                             {
                                 Id = p.ID,
                                 GroupId = p.GROUP_ID,
                                 Code = p.CODE,
                                 Name = p.NAME,
                                 States = p.STATES,
                                 GroupName = g.NAME,
                                 ModuleName = m.NAME,
                                 AppId = g.APPLICATION_ID,
                                 AppName = o.NAME,
                                 IsActive = p.IS_ACTIVE,
                                 CreatedBy = p.CREATE_BY,
                                 CreatedDate = p.CREATE_DATE,
                                 UpdatedBy = p.UPDATED_BY,
                                 UpdatedDate = p.UPDATED_DATE
                             });
            if (param.Name != null)
            {
                queryable = queryable.Where(p => p.Name.ToUpper().Contains(param.Name.ToUpper()));
            }

            if (param.Code != null)
            {
                queryable = queryable.Where(p => p.Code.ToUpper().Contains(param.Code.ToUpper()));
            }

            if (param.States != null)
            {
                queryable = queryable.Where(p => p.States.ToUpper().Contains(param.States.ToUpper()));
            }

            if (param.GroupName != null)
            {
                queryable = queryable.Where(p => p.GroupName.ToUpper().Contains(param.GroupName.ToUpper()));
            }
            if (param.ModuleName != null)
            {
                queryable = queryable.Where(p => p.ModuleName.ToUpper().Contains(param.ModuleName.ToUpper()));
            }
            if (param.GroupId > 0)
            {
                queryable = queryable.Where(p => p.GroupId == param.GroupId);
            }

            if (param.AppName != null)
            {
                queryable = queryable.Where(p => p.AppName.ToUpper().Contains(param.AppName.ToUpper()));
            }

            if (param.AppId > 0)
            {
                queryable = queryable.Where(p => p.AppId == param.AppId);
            }
            return await PagingList(queryable, param);
        }
        // admin system
        public async Task<PagedResult<TenantDTO>> GetAll(TenantDTO param)
        {
            try
            {
                var queryable = (from p in _appContext.Tenants
                                 from u in _appContext.SysUsers.Where(x => x.Id == p.USER_REF).DefaultIfEmpty()
                                 select new TenantDTO
                                 {
                                     Id = p.ID,
                                     Code = p.CODE,
                                     TenancyName = p.TENANCY_NAME,
                                     FullName = p.OWNER_NAME,
                                     Address = p.ADDRESS,
                                     Phone = p.PHONE,
                                     Email = p.EMAIL,
                                     AreaName = _appContext.SysOtherLists.Where(c => c.ID == p.AREA_ID).Select(a => a.NAME).FirstOrDefault(),
                                     ConnectionString = p.CONNECTION_STRING,
                                     UserRefName = u.UserName,
                                     IsActive = p.IS_ACTIVE,
                                     CreatedBy = p.CREATE_BY,
                                     CreatedDate = p.CREATE_DATE,
                                     UpdatedBy = p.UPDATED_BY,
                                     UpdatedDate = p.UPDATED_DATE
                                 });
                if (param.Code != null)
                {
                    queryable = queryable.Where(p => p.Code.ToUpper().Contains(param.Code.ToUpper()));
                }

                if (param.TenancyName != null)
                {
                    queryable = queryable.Where(p => p.TenancyName.ToUpper().Contains(param.TenancyName.ToUpper()));
                }

                if (param.FullName != null)
                {
                    queryable = queryable.Where(p => p.FullName.ToUpper().Contains(param.FullName.ToUpper()));
                }

                if (param.Phone != null)
                {
                    queryable = queryable.Where(p => p.Phone.ToUpper().Contains(param.Phone.ToUpper()));
                }

                if (param.Email != null)
                {
                    queryable = queryable.Where(p => p.Email.ToUpper().Contains(param.Email.ToUpper()));
                }

                if (param.UserRefName != null)
                {
                    queryable = queryable.Where(p => p.UserRefName.ToUpper().Contains(param.UserRefName.ToUpper()));
                }

                if (param.IsActive != null)
                {
                    queryable = queryable.Where(p => p.IsActive == param.IsActive);
                }

                return await PagingList(queryable, param);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        public async Task<ResultWithError> UpdateAsync(TenantDTO param)
        {
            try
            {
                //Check TenantCode
                var r = await _appContext.Tenants.Where(x => x.ID == param.Id).FirstOrDefaultAsync();
                if (r == null)
                {
                    return new ResultWithError(404);
                }
                // Create Tenant
                param.Code = null;

                var data = Map<TenantDTO, Tenant>(param, r);
                var result = _appContext.Tenants.Update(data);

                await _appContext.SaveChangesAsync();
                return new ResultWithError(200);
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex.Message);
            }
        }

        public async Task<ResultWithError> ChangeStatusAsync(List<int> ids)
        {
            foreach (var item in ids)
            {
                var r = _appContext.Tenants.Where(x => x.ID == item).FirstOrDefault();
                if (r == null)
                {
                    return new ResultWithError(404);
                }
                r.IS_ACTIVE = !r.IS_ACTIVE;
                var result = _appContext.Tenants.Update(r);
            }
            await _appContext.SaveChangesAsync();
            return new ResultWithError(200);
        }


        public async Task<ResultWithError> CheckCode(string code)
        {
            try
            {
                var r = await _appContext.Tenants.Where(x => x.CODE == code).FirstOrDefaultAsync();
                if (r == null)
                {
                    return new ResultWithError(400);
                }
                if (r.IS_ACTIVE == false)
                {
                    return new ResultWithError("ERROR_LOCKED");
                }
                if (r.DATE_EXPIRE <= DateTime.Now)
                {
                    return new ResultWithError("ERROR_TENANT_DATE_EXPIRE");
                }
                return new ResultWithError(r);
            }
            catch (Exception ex)
            {

                return new ResultWithError(ex.Message);
            }

        }
        public async Task<PagedResult<TenantUserDTO>> GetAllUser(TenantUserDTO param)
        {
            var queryable = (from p in _appContext.TenantUsers

                             select new TenantUserDTO
                             {
                                 Id = p.ID,
                                 UserName = p.USER_NAME,
                                 FullName = p.FULLNAME,
                                 Email = p.EMAIL,
                                 Lock = p.IS_LOCK
                             });
            if (param.UserName != null)
            {
                queryable = queryable.Where(p => p.UserName.ToUpper().Contains(param.UserName.ToUpper()));
            }
            if (param.Email != null)
            {
                queryable = queryable.Where(p => p.Email.ToUpper().Contains(param.Email.ToUpper()));
            }
            if (param.FullName != null)
            {
                queryable = queryable.Where(p => p.FullName.ToUpper().Contains(param.FullName.ToUpper()));
            }

            return await PagingList(queryable, param);

        }

        /// <summary>
        /// Tenant Login 
        /// </summary>
        /// <param name="tenantCode"></param>
        /// <param name="UserName"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        public async Task<ResultWithError> TenantLogin(string UserName, string password)
        {
            try
            {
                UserName = UserName.ToLower().Trim();
                try
                {
                    var r = await (from p in _appContext.TenantUsers
                                   where p.USER_NAME.ToLower() == UserName
                                   select new TenantUser
                                   {
                                       ID = p.ID,
                                       USER_NAME = p.USER_NAME,
                                       FULLNAME = p.FULLNAME,
                                       IS_ADMIN = p.IS_ADMIN,
                                       AVATAR = p.AVATAR,
                                       IS_LOCK = p.IS_LOCK,
                                       PASSWORD_HASH = p.PASSWORD_HASH,
                                       SALT = p.SALT,
                                       IS_FIRST_LOGIN = p.IS_FIRST_LOGIN
                                   }).FirstOrDefaultAsync();
                    if (r != null)
                    {
                        if (r.IS_LOCK)
                        {
                            return new ResultWithError("ERROR_LOCKED");
                        }
                        if (r.IS_ADMIN == false && r.IS_WEBAPP == false)
                        {
                            return new ResultWithError("NOT_PERMISSION_IN_WEBAPP");
                        }
                        if (r.IsPasswordMath(password))
                        {
                            var loginOutput = new LoginParam();
                            loginOutput.Id = r.ID;
                            loginOutput.UserName = r.USER_NAME;
                            loginOutput.FullName = r.FULLNAME;
                            loginOutput.IsAdmin = r.IS_ADMIN;
                            loginOutput.Avatar = r.AVATAR;
                            loginOutput.IsFirstLogin = r.IS_FIRST_LOGIN;
                            if (!r.IS_ADMIN)
                            {
                                var per = await (from p in _appContext.TenantUserPermissions
                                                 join t in _appContext.TenantFunctions on p.FUNCTION_ID equals t.ID
                                                 join f in _appContext.SysFunctions on t.FUNCTION_ID equals f.ID
                                                 join g in _appContext.SysGroupFunctions on f.GROUP_ID equals g.ID into tmp1
                                                 from g2 in tmp1.DefaultIfEmpty()
                                                 join m in _appContext.SysModules on f.MODULE_ID equals m.ID
                                                 where p.USER_ID == r.ID
                                                 select new PermissionParam
                                                 {
                                                     ModuleCode = m.CODE,
                                                     GroupFuncCode = g2.CODE,
                                                     FunctionCode = f.CODE,
                                                     PermissionString = p.PERMISSION_STRING,
                                                     Url = f.STATES
                                                 }).ToListAsync();
                                loginOutput.PermissionParams = per;
                            }
                            // neu lan dau dang nhap thi them bang payroll_sum vao DB
                            return new ResultWithError(loginOutput);
                        }
                        else
                        {
                            return new ResultWithError("ERROR_PASSWORD_INCORRECT");
                        }
                    }
                    else
                    {
                        return new ResultWithError("ERROR_USERNAME_INCORRECT");
                    }
                }
                catch (Exception ex)
                {
                    return new ResultWithError(ex.Message);
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// Tenant Login 
        /// </summary>
        /// <param name="tenantCode"></param>
        /// <param name="UserName"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        public async Task<ResultWithError> ClientsLogin(
            string UserName, string password, string ipAddress, 
            bool alreadtHased = false, SysRefreshToken refreshToken = null)
        {
            try
            {
                UserName = UserName.ToLower().Trim();
                try
                {
                    var r = await (from p in _appContext.TenantUsers
                                   where p.USER_NAME.ToLower() == UserName
                                   select new TenantUser
                                   {
                                       ID = p.ID,
                                       EMP_ID = p.EMP_ID,
                                       USER_NAME = p.USER_NAME,
                                       FULLNAME = p.FULLNAME,
                                       IS_ADMIN = p.IS_ADMIN,
                                       AVATAR = p.AVATAR,
                                       IS_LOCK = p.IS_LOCK,
                                       PASSWORD_HASH = p.PASSWORD_HASH,
                                       SALT = p.SALT,
                                       IS_FIRST_LOGIN = p.IS_FIRST_LOGIN
                                   }).FirstOrDefaultAsync();
                    if (r != null)
                    {
                        if (r.IS_LOCK)
                        {
                            return new ResultWithError("ERROR_LOCKED");
                        }
                        if (r.IS_ADMIN == false && r.IS_WEBAPP == false)
                        {
                            return new ResultWithError("NOT_PERMISSION_IN_WEBAPP");
                        }
                        if (r.IsPasswordMath(password, alreadtHased))
                        {
                            var userID = r.ID;
                            var data = new AuthResponse();
                            data.Id = r.ID;
                            data.UserName = r.USER_NAME;
                            data.FullName = r.FULLNAME;
                            data.IsAdmin = r.IS_ADMIN;
                            data.Avatar = r.AVATAR;
                            data.IsFirstLogin = r.IS_FIRST_LOGIN;
                            data.EmpId = r.EMP_ID.Value;

                            if (refreshToken == null) refreshToken = await _refreshTokenService.UpdateRefreshTokens(userID, ipAddress);
                            data.RefreshToken = refreshToken;


                            if (refreshToken != null)
                            {
                                // neu lan dau dang nhap thi them bang payroll_sum vao DB
                                return new ResultWithError(data);
                            }
                            else
                            {
                                return new ResultWithError("Could not update RefreshToken");
                            }
                        }
                        else
                        {
                            return new ResultWithError("ERROR_PASSWORD_INCORRECT");
                        }
                    }
                    else
                    {
                        return new ResultWithError("ERROR_USERNAME_INCORRECT");
                    }
                }
                catch (Exception ex)
                {
                    return new ResultWithError(ex.Message);
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }



        public async Task<ResultWithError> ClearEquitment(string userId)
        {
            var r = await _appContext.TenantUsers.Where(x => x.ID == userId).FirstOrDefaultAsync();
            if (r != null)
            {
                r.FCM_TOKEN = null;
                _appContext.TenantUsers.Update(r);
                await _appContext.SaveChangesAsync();
                return new ResultWithError(200);
            }
            return new ResultWithError(404);
        }
        /// <summary>
        /// Change password
        /// </summary>
        /// <param name="UserName"></param>
        /// <param name="CurrentPassword"></param>
        /// <param name="NewPassword"></param>
        /// <returns></returns>
        public async Task<ResultWithError> ChangePasswordAsync(ChangePasswordTenantParam param)
        {
            param.UserName = param.UserName.ToLower().Trim();
            var r = _appContext.TenantUsers.Where(x => x.USER_NAME_REF == param.UserName).FirstOrDefault();
            if (r == null)
            {
                return new ResultWithError(404);
            }
            if (!r.IsPasswordMath(param.CurrentPassword))
            {
                return new ResultWithError("CURRENT_PASS_NOT_CORRECT");
            }
            try
            {
                r.PASSWORD = param.NewPassword;
                var result = _appContext.TenantUsers.Update(r);
                await _appContext.SaveChangesAsync();
            }
            catch
            {
                return new ResultWithError("PASS_VALID");
            }

            return new ResultWithError(200);
        }
        /// <summary>
        /// Tenant Login 
        /// </summary> 
        /// <param name="tenantCode"></param>
        /// <param name="UserName"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        public async Task<ResultWithError> SignInPortalHR(string UserName, string password, string application, string fcmToken, string deviceId)
        {
            try
            {
                UserName = UserName.ToLower().Trim();



                var r = _appContext.TenantUsers.Where(x => x.USER_NAME.ToLower() == UserName).FirstOrDefault();
                if (r != null)
                {
                    if (r.IS_PORTAL == false)
                    {
                        return new ResultWithError("ERROR_PORTAL_LOCKED");
                    }
                    if (r.IS_LOCK)
                    {
                        return new ResultWithError("ERROR_LOCKED");
                    }

                    if (deviceId != null && r.DEVICE_ID != null && r.DEVICE_ID != deviceId)
                    {
                        return new ResultWithError("ERROR_USER_EXITS_ON_OTHER_EQUITMENT");
                    }

                    if (r.IsPasswordMath(password))
                    {
                        if (deviceId != null && r.DEVICE_ID == null)
                        {
                            r.DEVICE_ID = deviceId;
                            _appContext.TenantUsers.Update(r);
                            await _appContext.SaveChangesAsync();
                        }
                        var loginOutput = new LoginParam();
                        loginOutput.Id = r.ID;
                        loginOutput.UserName = r.USER_NAME;
                        loginOutput.FullName = r.FULLNAME;
                        loginOutput.IsAdmin = r.IS_ADMIN;
                        loginOutput.Avatar = r.AVATAR; ;
                        loginOutput.EmpId = r.EMP_ID.Value;
                        return new ResultWithError(loginOutput);
                    }
                    else
                    {
                        return new ResultWithError("ERROR_PASSWORD_INCORRECT");
                    }
                }
                else
                {
                    return new ResultWithError("ERROR_USERNAME_INCORRECT");
                }

            }
            catch (Exception ex)
            {
                return new ResultWithError(ex.Message);
            }
        }
        // Create User
        public async Task<ResultWithError> GetById(int id)
        {
            var queryable = (from p in _appContext.Tenants
                             from x in _appContext.TenantUsers
                             where p.ID == id
                             select new
                             {
                                 Id = p.ID,
                                 Code = p.CODE,
                                 TenancyName = p.TENANCY_NAME,
                                 FullName = p.OWNER_NAME,
                                 UserName = x.USER_NAME,
                                 Address = p.ADDRESS,
                                 Phone = p.PHONE,
                                 Email = p.EMAIL,
                                 ConnectionString = p.CONNECTION_STRING,
                                 IsActive = p.IS_ACTIVE,
                                 CreatedBy = p.CREATE_BY,
                                 CreatedDate = p.CREATE_DATE,
                                 UpdatedBy = p.UPDATED_BY,
                                 UpdatedDate = p.UPDATED_DATE
                             });
            return new ResultWithError(await queryable.FirstOrDefaultAsync());
        }
        public async Task<ResultWithError> GetUser(string id)
        {
            var queryable = await _appContext.TenantUsers.Where(d => d.ID == id).Select(c => new
            {
                Id = c.ID,
                Email = c.EMAIL,
                EmployeeCode = c.EMPLOYEE_CODE,
                Fullname = c.FULLNAME,
                EmployeeName = c.EMPLOYEE_NAME,
                Lock = c.IS_LOCK,
                UserName = c.USER_NAME_REF,
                GroupId = c.GROUP_ID,
                isWebapp = c.IS_WEBAPP,
                isPortal = c.IS_PORTAL,
                FmcToken = c.FCM_TOKEN
            }).FirstOrDefaultAsync();

            return new ResultWithError(queryable);
        }

        /// <summary>
        /// GetQRCode
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<ResultWithError> GetQRCode()
        {
            var r = await (from p in _appContext.Tenants
                           select new
                           {
                               QrCode = p.QRCODE
                           }).FirstOrDefaultAsync();
            return new ResultWithError(r);
        }

        /// <summary>
        /// Check QRCode Tenant (User scan QRCode of Tenant)
        /// </summary>
        /// <param name="qrCode"></param>
        /// <returns></returns>
        public async Task<ResultWithError> ScanQRCode(string qrCode)
        {
            try
            {
                var r = await (from p in _appContext.Tenants
                               select new
                               {
                                   Id = p.ID
                               }).FirstOrDefaultAsync();
                if (r != null)
                {
                    return new ResultWithError(r);
                }
                else { return new ResultWithError("QRCODE_NOT_EXISTS"); }
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex.Message);
            }

        }
        public async Task<bool> CreateTableForTenant(string conect, int Id)
        {
            try
            {
                await QueryData.Execute(conect, "PKG_COMMON.REGISTER", new { P_TENANT_ID = Id });
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<bool> UpdateFirstLogin(string userId)
        {
            try
            {
                var user = await _appContext.TenantUsers.Where(c => c.ID == userId).FirstOrDefaultAsync();
                user.IS_FIRST_LOGIN = false;
                _appContext.TenantUsers.Update(user);
                await _appContext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<bool> InsertDataTemp(string conect, int Id, int P_AREA_ID)
        {
            try
            {
                await QueryData.Execute(conect, "PKG_COMMON.INSERT_DATA_REGISTER", new { P_TENANT_ID = Id, P_AREA_ID = P_AREA_ID });
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<ResultWithError> GetListTenent()
        {
            var r = await (from p in _appContext.Tenants
                           where p.IS_ACTIVE == true
                           select new
                           {
                               Id = p.ID,
                               Name = p.TENANCY_NAME
                           }).ToListAsync();
            return new ResultWithError(r);
        }


    }
}
