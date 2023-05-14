using System.Threading.Tasks;
using Common.Paging;
using CoreDAL.EntityFrameworkCore;
using CoreDAL.Models;
using System.Linq;
using Common.Repositories;
using Common.Extensions;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System;
using System.IO;
using Common.EPPlus;
using System.Dynamic;

namespace CoreDAL.Repositories
{
    public class TenantUserRepository : TLARepository<TenantUser>, ITenantUserRepository
    {
        private CoreDbContext _appContext => (CoreDbContext)_context;
        public TenantUserRepository(CoreDbContext context) : base(context)
        {

        }
        /// <summary>
        /// CMS Get All Data
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public async Task<PagedResult<TenantUserResponDTO>> GetAll(TenantUserDTO param)
        {
            var queryable = from p in _appContext.TenantUsers
                            join c in _appContext.TenantGroups on p.GROUP_ID equals c.ID into tmp1
                            from c2 in tmp1.DefaultIfEmpty()
                            where p.IS_ADMIN == false
                            orderby p.IS_LOCK
                            select new TenantUserResponDTO
                            {
                                Id = p.ID,
                                UserName = p.USER_NAME_REF,
                                Code = p.EMPLOYEE_CODE,
                                Email = p.EMAIL,
                                GroupName = c2.NAME,
                                FullName = p.FULLNAME,
                                Lock = p.IS_LOCK,
                                GroupId = p.GROUP_ID,
                                IsPortal = p.IS_PORTAL,
                                IsWebApp = p.IS_WEBAPP
                            };

            if (param.GroupId != null && param.GroupId != 0)
            {
                queryable = queryable.Where(p => p.GroupId == param.GroupId);
            }

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

            if (param.Lock != null)
            {
                queryable = queryable.Where(p => p.Lock == param.Lock);
            }
            return await PagingList(queryable, param);
        }
        /// <summary>
        /// CMS Get Detail
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>        
        public async Task<ResultWithError> GetById(int id)
        {
            var r = await (from p in _appContext.TenantGroups
                           where p.ID == id 
                           select new
                           {
                               Id = p.ID,
                               Name = p.NAME,
                               Code = p.CODE,
                               IsActive = p.IS_ACTIVE
                           }).FirstOrDefaultAsync();
            return new ResultWithError(r);
        }
        /// <summary>
        /// Create Data
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public async Task<ResultWithError> CreateAsync(TenantUserInputDTO param)
        {
            try
            {
                if (param.EmployeeId == 0)
                {
                    return new ResultWithError("EMPLOYEE_NOT_NULL");
                }
                string tenantCode =  param.UserName;
                var r = _appContext.TenantUsers.Where(x => x.USER_NAME == tenantCode).Count();
                if (r > 0)
                {
                    return new ResultWithError(409);
                }
                var e = _appContext.TenantUsers.Where(c => c.EMP_ID == param.EmployeeId).Count();
                if (e > 0)
                {
                    return new ResultWithError("EMPLOYEE_HAVE_ACCOUNT");
                }
                // Create User Default 
                var _user = new TenantUser();
                _user.ID = Guid.NewGuid().ToString();
                _user.GROUP_ID = param.GroupId;
                _user.USER_NAME = tenantCode;
                _user.USER_NAME_REF = param.UserName;
                _user.FULLNAME = param.EmployeeName;
                _user.EMPLOYEE_NAME = param.EmployeeName;
                _user.EMPLOYEE_CODE = param.EmployeeCode;
                _user.EMAIL = param.Email;
                _user.PASSWORD = param.Password;
                _user.EMP_ID = param.EmployeeId;
                _user.IS_PORTAL = param.IsPortal;
                _user.IS_WEBAPP = param.IsWebapp;
                _user.IS_ADMIN = false;
                _user.IS_LOCK = false;
                _user.DEL = false;

                await _appContext.TenantUsers.AddAsync(_user);

                //  grant privilege group user for user
                var p = await (from a in _appContext.TenantGroupPermisstions
                               where a.GROUP_ID == _user.GROUP_ID
                               select new TenantUserPermission
                               {
                                   PERMISSION_STRING = a.PERMISSION_STRING,
                                   FUNCTION_ID = a.FUNCTION_ID,
                                   USER_ID = _user.ID
                               }).ToListAsync();
                _appContext.TenantUserPermissions.AddRange(p);
                await _appContext.SaveChangesAsync();

                return new ResultWithError(new { ID = _user.ID });
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex);
            }
        }
        /// <summary>
        /// CMS Edit Data
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public async Task<ResultWithError> UpdateAsync(TenantUserInputDTO param)
        {
            try
            {
                var _user = _appContext.TenantUsers.Where(x => x.ID == param.Id).FirstOrDefault();
                if (_user == null)
                {
                    return new ResultWithError(409);
                }
                // update
                _user.EMPLOYEE_CODE = param.EmployeeCode;
                _user.FULLNAME = param.FullName;
                if (param.EmployeeId != 0)
                {
                    _user.EMP_ID = param.EmployeeId;
                }

                _user.GROUP_OLD_ID = _user.GROUP_ID;
                _user.GROUP_ID = param.GroupId;
                if (param.Password != null)
                {
                    _user.PASSWORD = param.Password;

                }
                _user.IS_PORTAL = param.IsPortal;
                _user.IS_WEBAPP = param.IsWebapp;
                _appContext.TenantUsers.Update(_user);
                //remove permisstion old
                var rm = await _appContext.TenantUserPermissions.Where(c => c.USER_ID == _user.ID).Select(f => f).ToListAsync();
                _appContext.TenantUserPermissions.RemoveRange(rm);

                //  grant privilege group user for user
                var p = await (from a in _appContext.TenantGroupPermisstions
                               where a.GROUP_ID == _user.GROUP_ID
                               select new TenantUserPermission
                               {
                                   APPLICATION_ID = a.APPLICATION_ID,
                                   PERMISSION_STRING = a.PERMISSION_STRING,
                                   FUNCTION_ID = a.FUNCTION_ID,
                                   USER_ID = _user.ID,
                               }).ToListAsync();
                _appContext.TenantUserPermissions.AddRange(p);

                await _appContext.SaveChangesAsync();




                return new ResultWithError(new { ID = _user.ID, GROUP_OLD_ID = _user.GROUP_OLD_ID });
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex.Message);
            }
        }
        /// <summary>
        /// CMS Change Status Data
        /// </summary>
        /// <param name="ids"></param>
        /// <returns></returns>
        public async Task<ResultWithError> ChangeStatusAsync(List<int> ids, int application)
        {
            foreach (var item in ids)
            {
                var r = _appContext.TenantGroups.Where(x => x.ID == item ).FirstOrDefault();
                if (r == null)
                {
                    return new ResultWithError(404);
                }
                r.IS_ACTIVE = !r.IS_ACTIVE;
                var result = _appContext.TenantGroups.Update(r);
            }
            await _appContext.SaveChangesAsync();
            return new ResultWithError(200);
        }

        public async Task<ResultWithError> LockTenantUser(List<string> ids)
        {
            foreach (var item in ids)
            {
                var r = _appContext.TenantUsers.Where(x => x.ID == item).FirstOrDefault();
                if (r == null)
                {
                    return new ResultWithError(404);
                }
                r.IS_LOCK = !r.IS_LOCK;
                var result = _appContext.TenantUsers.Update(r);
            }
            await _appContext.SaveChangesAsync();
            return new ResultWithError(200);
        }

        /// <summary>
        /// Get Group User
        /// </summary>
        /// <param name="ids"></param>
        /// <returns></returns>
        public async Task<ResultWithError> GetListGroup(int application)
        {
            var r = await (from p in _appContext.TenantGroups
                           select new
                           {
                               Id = p.ID,
                               Name = p.NAME
                           }).FirstOrDefaultAsync();
            return new ResultWithError(r);
        }


        /// <summary>
        /// Get All User for Security
        /// </summary>
        /// <param name="ids"></param>
        /// <returns></returns>
        public async Task<ResultWithError> GetListByTenant(int? groupId)
        {
            if (groupId != null && groupId != 0)
            {
                var r = await (from p in _appContext.TenantUsers
                               where p.IS_ADMIN == false && p.GROUP_ID == groupId
                               orderby p.USER_NAME
                               select new
                               {
                                   Id = p.ID,
                                   Name = p.USER_NAME_REF
                               }).ToListAsync();
                return new ResultWithError(r);
            }
            else
            {
                var r = await (from p in _appContext.TenantUsers
                               where p.IS_ADMIN == false
                               orderby p.USER_NAME
                               select new
                               {
                                   Id = p.ID,
                                   Name = p.USER_NAME_REF
                               }).ToListAsync();
                return new ResultWithError(r);
            }
        }
        /// <summary>
        /// API IMPORT 
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        //public async Task<ResultWithError> ImportUser(ReferFileParam param)
        //{
        //    try
        //    {
        //        if (param.file == null || param.file.Length <= 0)
        //        {
        //            return new ResultWithError("File empty");
        //        }
        //        if (!Path.GetExtension(param.file.FileName).Equals(".xlsx", StringComparison.OrdinalIgnoreCase)
        //       && !Path.GetExtension(param.file.FileName).Equals(".xls", StringComparison.OrdinalIgnoreCase)
        //       )
        //        {
        //            return new ResultWithError("Not Support file extension");
        //        }
        //        using (var stream = new MemoryStream())
        //        {
        //            await param.file.CopyToAsync(stream);

        //            var data = Template.ConvertToDataSet(stream);
        //            var dt = data.Tables["Table4"];
        //            if (dt == null)
        //            {
        //                return new ResultWithError("NOT_FOUND_TABLE: Table1");
        //            }
        //            var ListData = QueryData.ConvertToListByOrder<TenantUserImport>(dt);

        //            var dataImport = new List<TenantUserTmp>();
        //            //Validate data
        //            var key = true;
        //            List<ExpandoObject> resp = new List<ExpandoObject>();

        //            foreach (var item in ListData)
        //            {
        //                var itemEmp = Map<TenantUserImport, TenantUserTmp>(item, new TenantUserTmp());
        //                itemEmp.TENANT_ID = _appContext.TenantID;
        //                if (item.IsPortal == "Có")
        //                {
        //                    itemEmp.IS_PORTAL = true;
        //                }
        //                else
        //                {
        //                    itemEmp.IS_PORTAL = false;
        //                }
        //                itemEmp.ID = Guid.NewGuid().ToString();
        //                if (item.IsWebapp == "Có")
        //                {
        //                    itemEmp.IS_WEBAPP = true;
        //                }
        //                else
        //                {
        //                    itemEmp.IS_WEBAPP = false;
        //                }
        //                dataImport.Add(itemEmp);
        //            }
        //            if (key == false)
        //            {
        //                return new ResultWithError(400, resp);
        //            }
        //            await _appContext.TenantUserTmps.AddRangeAsync(dataImport);
        //            await _appContext.SaveChangesAsync();

        //            var ds = QueryData.ExecuteStoreToTable("PKG_COMMON.IMPORT_EMP",
        //        new
        //        {
        //            
        //            P_CUR = QueryData.OUT_CURSOR
        //        }, false);

        //            if (ds.Tables[0].Rows.Count <= 0)
        //            {
        //                return new ResultWithError("DATA_EMPTY");
        //            }
        //            ds.Tables[0].TableName = "Group";
        //            var pathTemp = _appContext._config["urlTemplateUser"];
        //            var memoryStream = Template.FillReport(pathTemp, ds);
        //            return new ResultWithError(memoryStream);
        //        }

        //    }
        //    catch (Exception ex)
        //    {
        //        return new ResultWithError(ex.Message);
        //    }
        //}

        public async Task<ResultWithError> ImportUser(ImportUserParam param)
        {
            try
            {
                param.Data.RemoveRange(0, 2);
                if (param.Data.Count == 0)
                {
                    return new ResultWithError(404);
                }
                var lst = new List<TenantUserTmp>();
                var error = false;
                var lstError = new List<TenantUserImport>();
                foreach (var item in param.Data)
                {
                    var dtl = new TenantUserTmp();
                    if (string.IsNullOrWhiteSpace(item.EmpCode))
                    {
                        error = true;
                        item.EmpCode = "!Không được để trống";
                    }
                    if (string.IsNullOrWhiteSpace(item.FullName))
                    {
                        error = true;
                        item.FullName = "!Không được để trống";
                    }

                    if (string.IsNullOrWhiteSpace(item.UserName))
                    {
                        error = true;
                        item.UserName = "!Không được để trống";
                    }

                    if (string.IsNullOrWhiteSpace(item.Password))
                    {
                        error = true;
                        item.Password = "!Không được để trống";
                    }

                    if (string.IsNullOrWhiteSpace(item.GroupName))
                    {
                        error = true;
                        item.GroupName = "!Không được để trống";
                    }
                    
                    if (error)
                    {
                        error = false;
                        lstError.Add(item);
                    }
                    else
                    {
                        dtl.ID = Guid.NewGuid().ToString();
                        dtl.EMP_CODE = item.EmpCode.Trim();
                        dtl.FULL_NAME = item.FullName.Trim();
                        dtl.GROUP_NAME = item.GroupName.Trim();
                        dtl.USER_NAME = item.UserName.Trim();
                        dtl.PASSWORD = item.Password;
                        if (item.IsPortal.ToString().Length>0)
                        {
                            if (item.IsPortal == "Có")
                            {
                                dtl.IS_PORTAL = true;
                            }
                            else
                            {
                                dtl.IS_PORTAL = false;
                            }
                        }

                        if (item.IsWebapp.ToString().Length > 0)
                        {
                            if (item.IsWebapp == "Có")
                            {
                                dtl.IS_WEBAPP = true;
                            }
                            else
                            {
                                dtl.IS_WEBAPP = false;
                            }
                        }
                        lst.Add(dtl);
                    }
                }

                if (lstError.Count > 0)
                {
                    var pathTemp = _appContext._config["urlTemplateUser"];
                    var memoryStream = Template.FillTemp<TenantUserImport>(pathTemp, lstError);
                    return new ResultWithError(memoryStream);
                }
                else
                {
                    if (lst.Count > 0)
                    {
                        await _appContext.TenantUserTmps.AddRangeAsync(lst);
                        await _appContext.SaveChangesAsync();
                        // xử lý fill dữ liệu vào master data
                        var ds = QueryData.ExecuteStoreToTable("PKG_COMMON.IMPORT_EMP",
                        new
                        {
                            
                            P_CUR = QueryData.OUT_CURSOR
                        }, false);

                        if (ds.Tables[0].Rows.Count > 0)
                        {
                            ds.Tables[0].TableName = "Data";
                            var pathTemp = _appContext._config["urlTemplateUser"];
                            var memoryStream = Template.FillTemplate(pathTemp, ds);
                            return new ResultWithError(memoryStream);
                        }
                    }
                }
                return new ResultWithError(200);
            }
            catch (Exception ex)
            {
                return new ResultWithError(204);
                // throw ex;
            }
        }
            public async Task<ResultWithError> TemplateImport()
        {
            try
            {
                // xử lý fill dữ liệu vào master data
                var ds = QueryData.ExecuteStoreToTable("PKG_COMMON.GET_GROUP_USER",
                new
                {
                    P_CUR = QueryData.OUT_CURSOR
                }, false);

                if (ds.Tables[0].Rows.Count <= 0)
                {
                    return new ResultWithError("DATA_EMPTY");
                }
                ds.Tables[0].TableName = "Group";
                var pathTemp = _appContext._config["urlTemplateUser"];
                var memoryStream = Template.FillReport(pathTemp, ds);
                return new ResultWithError(memoryStream);
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex.Message);
            }
        }

        /// <summary>
        /// Get Group User
        /// </summary>
        /// <param name="ids"></param>
        /// <returns></returns>
        public async Task<ResultWithError> ClearEquitment(EquitmentParam param)
        {
            var username = param.Code.Trim().ToUpper() + "_" + param.UserName.Trim().ToUpper();
            var r = await _appContext.TenantUsers.Where(x => x.USER_NAME.ToUpper() == username).FirstOrDefaultAsync();
            r.FCM_TOKEN = null;
            _appContext.TenantUsers.Update(r);
            await _appContext.SaveChangesAsync();
            return new ResultWithError(200);
        }
    }
}
