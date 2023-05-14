using Common.Paging;
using Common.Repositories;
using CoreDAL.EntityFrameworkCore;
using CoreDAL.Models;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Common.Extensions;
using Microsoft.EntityFrameworkCore;

namespace CoreDAL.Repositories
{
    public class SysUserRepository : TLARepository<SysUser>, ISysUserRepository
    {
        private CoreDbContext _appContext => (CoreDbContext)_context;
        private readonly UserManager<SysUser> _userManager;
        public SysUserRepository(CoreDbContext context, UserManager<SysUser> userManager) : base(context)
        {
            _userManager = userManager;
        }

        public async Task<PagedResult<SysUserDTO>> GetAll(SysUserDTO param)
        {
            var queryable = (from p in _appContext.SysUsers
                             join g in _appContext.SysGroupUsers on p.GROUP_ID equals g.ID
                             select new SysUserDTO
                             {
                                 Id = p.Id,
                                 UserName = p.UserName,
                                 FullName = p.FULLNAME,
                                 GroupId = g.ID,
                                 Email = p.Email,
                                 Avatar = p.AVATAR,
                                 GroupName = g.NAME,
                                 Lock = p.LockoutEnabled,
                                 CreatedBy = p.CREATE_BY,
                                 CreatedDate = p.CREATE_DATE,
                                 UpdatedBy = p.UPDATED_BY,
                                 UpdatedDate = p.UPDATED_DATE
                             });
            if (param.UserName != null)
            {
                queryable = queryable.Where(p => p.UserName.ToUpper().Contains(param.UserName.ToUpper()));
            }

            if (param.FullName != null)
            {
                queryable = queryable.Where(p => p.FullName.ToUpper().Contains(param.FullName.ToUpper()));
            }

            if (param.GroupName != null)
            {
                queryable = queryable.Where(p => p.GroupName.ToUpper().Contains(param.GroupName.ToUpper()));
            }

            if (param.GroupId != null)
            {
                queryable = queryable.Where(p => p.GroupId == param.GroupId);
            }

            return await PagingList(queryable, param);
        }
        public async Task<object> CreateUserAsync(SysUserInputDTO param)
        {
            var data = Map<SysUserInputDTO, SysUser>(param, new SysUser());
            data.UserName = data.UserName.Trim().ToLower();
            data.LockoutEnabled = false;
            var r = _appContext.SysUsers.Where(x => x.UserName == param.UserName).Count();
            if (r > 0)
            {
                return new ResultWithError(409);
            }

            var result = await _userManager.CreateAsync(data, param.Password);
            var user = await _userManager.FindByNameAsync(data.UserName);
            var res = new { data = user, statusCode = result.Succeeded ? 200 : 400, message = result.Errors };

            return res;
        }

        public async Task<ResultWithError> UpdateUserAsync(SysUserInputDTO param)
        {
            var r = _appContext.SysUsers.Where(x => x.Id == param.Id).FirstOrDefault();
            if (r == null)
            {
                return new ResultWithError(404);
            }
            var data = Map<SysUserInputDTO, SysUser>(param, r);
            var result = await _userManager.UpdateAsync(data);
            return new ResultWithError(200);
        }

        public async Task<ResultWithError> ChangePasswordAsync(string user, string currentPassword, string newPassword)
        {
            var r = await _userManager.FindByNameAsync(user.ToLower());
            if (r == null)
            {
                return new ResultWithError(404);
            }
            var result = await _userManager.CheckPasswordAsync(r, currentPassword);
            if (!result)
            {
                return new ResultWithError("CURRENT_PASS_NOT_CORRECT");
            }
            try
            {
                var x = await _userManager.ChangePasswordAsync(r, currentPassword, newPassword);
            }
            catch
            {
                return new ResultWithError("PASS_VALID");
            }

            return new ResultWithError(200);
        }
        public async Task<ResultWithError> SetLockoutEnabledAsync(string user, bool enable)
        {
            var r = await _userManager.FindByNameAsync(user.ToLower());
            if (r == null)
            {
                return new ResultWithError(404);
            }
            var x = await _userManager.SetLockoutEnabledAsync(r, enable);
            return new ResultWithError(200);
        }
        /// <summary>
        /// Get Data Permission by User
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public async Task<ResultWithError> GetPermissonByUser(string userId)
        {
            var r = await (from p in _appContext.SysUsers
                           join g in _appContext.SysGroupUsers on p.GROUP_ID equals g.ID
                           where p.Id == userId
                           select new LoginParam
                           {
                               IsAdmin = g.IS_ADMIN,
                               FullName = p.FULLNAME,
                               UserName = p.UserName,
                               Avatar = p.AVATAR
                           }).FirstOrDefaultAsync();
            if (r == null)
            {
                return new ResultWithError("USER_NOT_EXISTS");
            }
            r.Id = userId;
            if (r.IsAdmin == true)
            {
                var dataPermission = await (from p in _appContext.SysFunctions
                                            join m in _appContext.SysModules on p.MODULE_ID equals m.ID
                                            join g in _appContext.SysGroupFunctions on p.GROUP_ID equals g.ID
                                            where m.APPLICATION_ID == Consts.APPLICATION_SYSTEM
                                            select new PermissionParam
                                            {
                                                ModuleCode = m.CODE,
                                                GroupFuncCode = g.CODE,
                                                FunctionCode = p.CODE
                                            }).ToListAsync();
                r.PermissionParams = dataPermission;


            }
            else
            {
                var dataPermission = await (from p in _appContext.AspUserPermissions
                                            join f in _appContext.SysFunctions on p.FUNCTION_ID equals f.ID
                                            join m in _appContext.SysModules on f.MODULE_ID equals m.ID
                                            join g in _appContext.SysGroupFunctions on f.GROUP_ID equals g.ID
                                            where p.USER_ID == userId
                                            select new PermissionParam
                                            {
                                                ModuleCode = m.CODE,
                                                GroupFuncCode = g.CODE,
                                                FunctionCode = f.CODE
                                            }).ToListAsync();
                r.PermissionParams = dataPermission;


            }

            return new ResultWithError(r);
        }
        /// <summary>
        /// CMS Get Detail Data
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<ResultWithError> GetList()
        {
            var r = await (from p in _appContext.SysUsers
                           from c in _appContext.SysGroupUsers.Where(f => f.ID == p.GROUP_ID)
                           where c.IS_ACTIVE == true && c.IS_ADMIN == false
                           orderby p.UserName
                           select new
                           {
                               id = p.Id,
                               Name = p.UserName
                           }).ToListAsync();
            return new ResultWithError(r);
        }
    }
}

