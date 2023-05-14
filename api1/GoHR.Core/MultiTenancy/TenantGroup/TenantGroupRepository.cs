using System.Threading.Tasks;
using Common.Paging;
using CoreDAL.EntityFrameworkCore;
using CoreDAL.ViewModels;
using CoreDAL.Models;
using System.Linq;
using Common.Repositories;
using Common.Extensions;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace CoreDAL.Repositories
{
    public class TenantGroupRepository : TLARepository<TenantGroup>, ITenantGroupRepository
    {
        private CoreDbContext _appContext => (CoreDbContext)_context;
        public TenantGroupRepository(CoreDbContext context) : base(context)
        {

        }
        /// <summary>
        /// CMS Get All Data
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public async Task<PagedResult<TenantGroupDTO>> GetAll(TenantGroupDTO param, int application)
        {
            var queryable = from p in _appContext.TenantGroups
                            select new TenantGroupDTO
                            {
                                Id = p.ID,
                                Name = p.NAME,
                                Code = p.CODE,
                                IsActive = p.IS_ACTIVE,
                                CreateBy = p.CREATE_BY,
                                CreateDate = p.CREATE_DATE,
                                UpdateBy = p.UPDATED_BY,
                                UpdateDate = p.UPDATED_DATE
                            };

            if (param.Name != null)
            {
                queryable = queryable.Where(p => p.Name.ToUpper().Contains(param.Name.ToUpper()));
            }

            if (param.Code != null)
            {
                queryable = queryable.Where(p => p.Code.ToUpper().Contains(param.Code.ToUpper()));
            }

            return await PagingList(queryable, param);
        }
        /// <summary>
        /// CMS Get Detail
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>        
        public async Task<ResultWithError> GetById(int id, int application)
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
        public async Task<ResultWithError> CreateAsync(TenantGroupInputDTO param, int application)
        {
            try
            {
            
                var data = Map<TenantGroupInputDTO, TenantGroup>(param, new TenantGroup());
                data.IS_ACTIVE = true;

                var result = await _appContext.TenantGroups.AddAsync(data);
              

                await _appContext.SaveChangesAsync();

                return new ResultWithError(data);
            }
            catch (System.Exception ex)
            { 
                return new ResultWithError(ex.Message);
            }
        }
        /// <summary>
        /// CMS Edit Data
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public async Task<ResultWithError> UpdateAsync(TenantGroupInputDTO param, int application)
        {
            try
            {
                // check code
                var c = _appContext.TenantGroups.Where(x => x.CODE.ToLower() == param.Code.ToLower() && x.ID != param.Id).Count();
                if (c > 0)
                {
                    return new ResultWithError(Consts.CODE_EXISTS);
                }

                var r = _appContext.TenantGroups.Where(x => x.ID == param.Id).FirstOrDefault();
                if (r == null)
                {
                    return new ResultWithError(404);
                }



                var data = Map<TenantGroupInputDTO, TenantGroup>(param, r);
                var result = _appContext.TenantGroups.Update(data);
                await _appContext.SaveChangesAsync();
                return new ResultWithError(200);
            }
            catch (System.Exception ex)
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

        /// <summary>
        /// Get Group User
        /// </summary>
        /// <param name="ids"></param>
        /// <returns></returns>
        public async Task<ResultWithError> GetListGroup(int application)
        {
            var r = await (from p in _appContext.TenantGroups
                           where p.IS_ACTIVE == true
                           orderby p.NAME
                           select new
                           {
                               Id = p.ID,
                               Name = p.NAME
                           }).ToListAsync();
            return new ResultWithError(r);
        }
    }
}
