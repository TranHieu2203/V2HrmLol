using System.Threading.Tasks;
using Common.Paging;
using CoreDAL.EntityFrameworkCore;
using CoreDAL.Models;
using CoreDAL.ViewModels;
using System.Linq;
using Common.Repositories;
using Common.Extensions;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace CoreDAL.Repositories
{
    public class TenantGroupPermissionRepository : TLARepository<TenantGroupPermisstion>, ITenantGroupPermissionRepository
    {
        private CoreDbContext _appContext => (CoreDbContext)_context;
        public TenantGroupPermissionRepository(CoreDbContext context) : base(context)
        {

        }

        /// <summary>
        /// Get paging Data AspGroupPermission.
        /// </summary>
        public async Task<PagedResult<TenantGroupPermisstionDTO>> GetAll(TenantGroupPermisstionDTO param, int application)
        {
            var queryable = (from p in _appContext.TenantGroupPermisstions
                             join g in _appContext.TenantGroups on p.GROUP_ID equals g.ID
                             join f in _appContext.SysFunctions on p.FUNCTION_ID equals f.ID
                             where p.APPLICATION_ID == application
                             select new TenantGroupPermisstionDTO
                             {
                                 UserGroupId = p.GROUP_ID,
                                 FunctionId = p.FUNCTION_ID,
                                 ModuleId = f.MODULE_ID,
                                 UseGroupName = g.NAME,
                                 FunctionName = f.NAME,
                                 PermissionStr = p.PERMISSION_STRING
                             });

            if (param.UserGroupId > 0)
            {
                queryable = queryable.Where(p => p.UserGroupId == param.UserGroupId);
            }

            if (param.FunctionId > 0)
            {
                queryable = queryable.Where(p => p.FunctionId == param.FunctionId);
            }

            if (param.ModuleId > 0)
            {
                queryable = queryable.Where(p => p.ModuleId == param.ModuleId);
            }

            if (param.UseGroupName != null)
            {
                queryable = queryable.Where(p => p.UseGroupName.ToUpper().Contains(param.UseGroupName.ToUpper()));
            }

            if (param.FunctionName != null)
            {
                queryable = queryable.Where(p => p.FunctionName.ToUpper().Contains(param.FunctionName.ToUpper()));
            }

            if (param.PermissionStr != null)
            {
                queryable = queryable.Where(p => p.PermissionStr.ToUpper().Contains(param.PermissionStr.ToUpper()));
            }

            return await PagingList(queryable, param);
        }

        /// <summary>
        /// Get All Data By GroupUer Or/And Function, module.
        /// </summary>
        public async Task<ResultWithError> GetBy(TenantGroupPermisstionDTO param, int application)
        {
            var queryable = (from p in _appContext.TenantGroupPermisstions
                             join g in _appContext.SysFunctions on p.FUNCTION_ID equals g.ID
                             join m in _appContext.SysModules on g.MODULE_ID equals m.ID
                             where p.APPLICATION_ID == application 
                             orderby m.NAME, g.NAME
                             select new TenantGroupPermisstionDTO
                             {
                                 UserGroupId = p.GROUP_ID,
                                 FunctionId = p.FUNCTION_ID,
                                 FunctionName = g.NAME,
                                 ModuleId = g.MODULE_ID,
                                 ModuleName = m.NAME,
                                 PermissionStr = p.PERMISSION_STRING,
                             });
            if (param.UserGroupId > 0)
            {
                queryable = queryable.Where(p => p.UserGroupId == param.UserGroupId);
            }

            if (param.FunctionId > 0)
            {
                queryable = queryable.Where(p => p.FunctionId == param.FunctionId);
            }

            if (param.ModuleId > 0)
            {
                queryable = queryable.Where(p => p.ModuleId == param.FunctionId);
            }

            var list = await queryable.ToListAsync();
            return new ResultWithError(list);
        }

        /// <summary>
        /// Update Or Create Data By GroupUser and Function.
        /// </summary>
        public async Task<ResultWithError> UpdateAsync(List<TenantGroupPermisstionInputDTO> param, int application)
        {
            try
            {
                foreach (var item in param)
                {
                    if (item.FunctionId != 0 && item.GroupId != 0)
                    {
                        if (!string.IsNullOrEmpty(item.PermissionString))
                        {
                            var r = _appContext.TenantGroupPermisstions.Where(x => x.GROUP_ID == item.GroupId && x.FUNCTION_ID == item.FunctionId  && x.APPLICATION_ID == application).FirstOrDefault();

                            if (r != null)
                            {
                                // update 
                                r.PERMISSION_STRING = item.PermissionString;
                                var result1 = _appContext.TenantGroupPermisstions.Update(r);
                            }
                            else
                            {
                                // insert
                                var data = Map<TenantGroupPermisstionInputDTO, TenantGroupPermisstion>(item, new TenantGroupPermisstion());
                                data.APPLICATION_ID = application;
                                await _appContext.TenantGroupPermisstions.AddAsync(data);
                            }
                        }
                        else
                        {
                            var r = _appContext.TenantGroupPermisstions.Where(x => x.GROUP_ID == item.GroupId && x.FUNCTION_ID == item.FunctionId  && x.APPLICATION_ID == application).FirstOrDefault();
                            if (r != null)
                            {
                                _appContext.TenantGroupPermisstions.Remove(r);

                            }
                        }
                    }
                }
                await _appContext.SaveChangesAsync();
                return new ResultWithError(200);
            }
            catch (System.Exception ex)
            {

                return new ResultWithError(ex.Message);
            }
        }
        /// <summary>
        /// Get paging Data AspGroupPermission.
        /// </summary>
        public async Task<PagedResult<GridFunctionOutput>> GridPermission(GridFunctionInput param, int application)
        {
            try
            {
                var queryable = (
                                 from p in _appContext.TenantFunctions
                                 join d in _appContext.SysFunctions on p.FUNCTION_ID equals d.ID
                                 join g in _appContext.SysGroupFunctions on d.GROUP_ID equals g.ID into tmp1
                                 from g2 in tmp1.DefaultIfEmpty()
                                 join m in _appContext.SysModules on d.MODULE_ID equals m.ID
                                 join f1 in _appContext.TenantGroupPermisstions.Where(c => c.GROUP_ID == param.UserGroupId) on p.ID equals f1.FUNCTION_ID into tmp2
                                 from f2 in tmp2.DefaultIfEmpty()
                                 where m.APPLICATION_ID == application
                                 orderby d.MODULE_ID, d.GROUP_ID, d.NAME
                                 select new GridFunctionOutput
                                 {
                                     UserGroupId = param.UserGroupId,
                                     FunctionId = p.ID,
                                     FunctionCode = d.CODE,
                                     FunctionName = d.NAME,
                                     GroupFuntionId = g2.ID,
                                     GroupFunctionName = g2.NAME,
                                     ModuleName = m.NAME,
                                     IsView = f2.PERMISSION_STRING.Contains("VIEW") ? true : false,
                                     IsAdd = f2.PERMISSION_STRING.Contains("ADD") ? true : false,
                                     IsEdit = f2.PERMISSION_STRING.Contains("EDIT") ? true : false,
                                     IsDelete = f2.PERMISSION_STRING.Contains("DELETE") ? true : false,
                                     IsLock = f2.PERMISSION_STRING.Contains("LOCK") ? true : false,
                                     IsCal = f2.PERMISSION_STRING.Contains("PA_CAL") ? true : false,
                                     IsSum = f2.PERMISSION_STRING.Contains("AT_SUM") ? true : false,
                                     IsImport = f2.PERMISSION_STRING.Contains("IMPORT") ? true : false,
                                     IsExport = f2.PERMISSION_STRING.Contains("EXPORT") ? true : false,
                                     IsAll = f2.PERMISSION_STRING.Contains("ALL") ? true : false
                                 }

                         );

                if (param.FunctionId != null)
                {
                    queryable = queryable.Where(p => p.FunctionId == param.FunctionId);
                }

                if (param.FunctionName != null)
                {
                    queryable = queryable.Where(p => p.FunctionName.ToUpper().Contains(param.FunctionName.ToUpper()));
                }

                if (!string.IsNullOrWhiteSpace(param.FunctionCode))
                {
                    queryable = queryable.Where(p => p.FunctionCode.ToUpper().Contains(param.FunctionCode.ToUpper()));
                }

                if (!string.IsNullOrWhiteSpace(param.FunctionName))
                {
                    queryable = queryable.Where(p => p.FunctionName.ToUpper().Contains(param.FunctionName.ToUpper()));
                }

                return await PagingList(queryable, param);
            }
            catch (System.Exception ex)
            {
                throw ex;
            }
        }
    }
}
