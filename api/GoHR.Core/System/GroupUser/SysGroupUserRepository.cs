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
    public class SysGroupUserRepository : TLARepository<SysGroupUser>, ISysGroupUserRepository
    {
        private CoreDbContext _appContext => (CoreDbContext)_context;
        public SysGroupUserRepository(CoreDbContext context) : base(context)
        {

        }
        /// <summary>
        /// CMS Get All Data
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public async Task<PagedResult<SysGroupUserDTO>> GetAll(SysGroupUserDTO param)
        {
            var queryable = from p in _appContext.SysGroupUsers
                            where p.IS_ADMIN == false
                            select new SysGroupUserDTO
                            {
                                Id = p.ID,
                                Name = p.NAME,
                                Code = p.CODE,
                                IsActive = p.IS_ACTIVE
                            };
            if (param.Name != null)
            {
                queryable = queryable.Where(p => p.Name.ToUpper().Contains(param.Name.ToUpper()));
            }

            if (param.Code != null)
            {
                queryable = queryable.Where(p => p.Name.ToUpper().Contains(param.Code.ToUpper()));
            }

            return await PagingList(queryable, param);
        }
        /// <summary>
        /// CMS Get Detail Data
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<ResultWithError> GetById(int id)
        {
            var r = await (from p in _appContext.SysGroupUsers
                           where p.ID == id
                           select new
                           {
                               id = p.ID,
                               Name = p.NAME,
                               Code = p.CODE,
                               IsActive = p.IS_ACTIVE
                           }).FirstOrDefaultAsync();
            return new ResultWithError(r);
        }
        /// <summary>
        /// CMS Create Data GroupUser
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public async Task<ResultWithError> CreateAsync(SysGroupUserInputDTO param)
        {
            var r = _appContext.SysGroupUsers.Where(x => x.CODE.ToLower() == param.Code.ToLower()).Count();
            if (r > 0)
            {
                return new ResultWithError(409);
            }
            param.Id = null;
            var data = Map<SysGroupUserInputDTO, SysGroupUser>(param, new SysGroupUser());
            data.IS_ACTIVE = true;
            data.IS_ADMIN = false;
            var result = await _appContext.SysGroupUsers.AddAsync(data);
            await _appContext.SaveChangesAsync();
            return new ResultWithError(data);
        }
        /// <summary>
        /// CMS Edit GroupUser
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public async Task<ResultWithError> UpdateAsync(SysGroupUserInputDTO param)
        {
            var r = _appContext.SysGroupUsers.Where(x => x.ID == param.Id).FirstOrDefault();
            if (r == null)
            {
                return new ResultWithError(404);
            }
            var data = Map<SysGroupUserInputDTO, SysGroupUser>(param, r);
            var result = _appContext.SysGroupUsers.Update(data);
            await _appContext.SaveChangesAsync();
            return new ResultWithError(200);
        }

        public async Task<ResultWithError> ChangeStatusAsync(List<int> ids)
        {
            foreach (var item in ids)
            {
                var r = _appContext.SysGroupUsers.Where(x => x.ID == item).FirstOrDefault();
                if (r == null)
                {
                    return new ResultWithError(404);
                }
                r.IS_ACTIVE = !r.IS_ACTIVE;
                var result = _appContext.SysGroupUsers.Update(r);
            }
            await _appContext.SaveChangesAsync();
            return new ResultWithError(200);
        }

        /// <summary>
        /// CMS Get Detail Data
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<ResultWithError> GetList()
        {
            var r = await (from p in _appContext.SysGroupUsers
                           where p.IS_ACTIVE == true && p.IS_ADMIN == false
                           orderby p.NAME
                           select new
                           {
                               id = p.ID,
                               Name = p.NAME
                           }).ToListAsync();
            return new ResultWithError(r);
        }
    }
}
