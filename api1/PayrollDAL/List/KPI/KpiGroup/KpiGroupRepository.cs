using System.Threading.Tasks;
using Common.Paging;
using PayrollDAL.EntityFrameworkCore;
using PayrollDAL.ViewModels;
using PayrollDAL.Models;
using System.Linq;
using Common.Repositories;
using Common.Extensions;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System;

namespace PayrollDAL.Repositories
{
    public class KpiGroupRepository : TLARepository<KpiGroup>, IKpiGroupRepository
    {
        private PayrollDbContext _appContext => (PayrollDbContext)_context;
        public KpiGroupRepository(PayrollDbContext context) : base(context)
        {

        }
        /// <summary>
        /// CMS Get All Data for System
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public async Task<PagedResult<KpiGroupOutDTO>> GetAll(KpiGroupDTO param)
        {
            var queryable = from p in _appContext.KpiGroups
                            where p.IS_ACTIVE == true
                            select new KpiGroupOutDTO
                            {
                                Id = p.ID,
                                Name = p.NAME,
                                Orders = p.ORDERS,
                                Note = p.NOTE
                            };

            if (!string.IsNullOrWhiteSpace(param.Name))
            {
                queryable = queryable.Where(p => p.Name.ToUpper().Contains(param.Name.ToUpper()));
            }
            if (!string.IsNullOrWhiteSpace(param.Note))
            {
                queryable = queryable.Where(p => p.Note.ToUpper().Contains(param.Note.ToUpper()));
            }
            return await PagingList(queryable, param);
        }
        /// <summary>
        /// CMS Get Detail for System
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>        
        public async Task<ResultWithError> GetById(int id)
        {
            try
            {
                var r = await (from p in _appContext.KpiGroups
                               where p.ID == id 
                               select new
                               {
                                   Id = p.ID,
                                   Name = p.NAME,
                                   Orders = p.ORDERS,
                                   Note = p.NOTE,
                                   IsActive = p.IS_ACTIVE,
                               }).FirstOrDefaultAsync();
                return new ResultWithError(r);
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex.Message);
            }
        }
       
        public async Task<ResultWithError> GetList()
        {
            try
            {
                var r = await (from p in _appContext.KpiGroups
                               where p.IS_ACTIVE == true 
                               orderby p.ORDERS
                               select new
                               {
                                   Id = p.ID,
                                   Name = p.NAME,
                               }).ToListAsync();
                return new ResultWithError(r);
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex.Message);
            }
        }

        /// <summary>
        /// Create Data for System
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public async Task<ResultWithError> CreateAsync(KpiGroupInputDTO param)
        {
            try
            {
                var data = Map<KpiGroupInputDTO, KpiGroup>(param, new KpiGroup());
                data.IS_ACTIVE = true;
                var result = await _appContext.KpiGroups.AddAsync(data);
                await _appContext.SaveChangesAsync();
                return new ResultWithError(data);
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex.Message);
            }
        }

        /// <summary>
        /// CMS Edit Data for System
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public async Task<ResultWithError> UpdateAsync(KpiGroupInputDTO param)
        {
            try
            {

                var r = _appContext.KpiGroups.Where(x => x.ID == param.Id ).FirstOrDefault();
                if (r == null)
                {
                    return new ResultWithError(404);
                }

                var data = Map<KpiGroupInputDTO, KpiGroup>(param, r);
                var result = _appContext.KpiGroups.Update(data);
                await _appContext.SaveChangesAsync();
                return new ResultWithError(200);
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex);
            }
        }

        /// <summary>
        /// CMS Change Status Data
        /// </summary>
        /// <param name="ids"></param>
        /// <returns></returns>
        public async Task<ResultWithError> ChangeStatusAsync(List<int> ids)
        {
            try
            {
                foreach (var item in ids)
                {
                    var r = _appContext.KpiGroups.Where(x => x.ID == item).FirstOrDefault();
                    if (r == null)
                    {
                        return new ResultWithError(404);
                    }
                    r.IS_ACTIVE = !r.IS_ACTIVE;
                    var result = _appContext.KpiGroups.Update(r);
                }
                await _appContext.SaveChangesAsync();
                return new ResultWithError(200);
            }
            catch (Exception ex)
            {

                return new ResultWithError(ex.Message);
            }
        }
    }
}
