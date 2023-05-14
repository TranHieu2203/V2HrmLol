using System.Threading.Tasks;
using Common.Paging;
using ProfileDAL.EntityFrameworkCore;
using ProfileDAL.ViewModels;
using ProfileDAL.Models;
using System.Linq;
using Common.Repositories;
using Common.Extensions;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System;

namespace ProfileDAL.Repositories
{
    public class BankRepository : TLARepository<Bank>, IBankRepository
    {
        private ProfileDbContext _appContext => (ProfileDbContext)_context;
        public BankRepository(ProfileDbContext context) : base(context)
        {

        }
        /// <summary>
        /// CMS Get All Datarach
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public async Task<PagedResult<BankDTO>> GetAll(BankDTO param)
        {
            var queryable = from p in _appContext.Banks
                            select new BankDTO
                            {
                                Id = p.ID,
                                Name = p.NAME,
                                Code = p.CODE,
                                IsActive = p.IS_ACTIVE,
                                Note = p.NOTE,
                                Order = p.ORDER,
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

            if (param.Note != null)
            {
                queryable = queryable.Where(p => p.Note.ToUpper().Contains(param.Note.ToUpper()));
            }

            if (param.IsActive != null)
            {
                queryable = queryable.Where(p => p.IsActive == param.IsActive);
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
            var r = await (from p in _appContext.Banks
                           where p.ID == id
                           select new BankDTO
                           {
                               Id = p.ID,
                               Name = p.NAME,
                               Code = p.CODE,
                               Note = p.NOTE,
                               Order = p.ORDER,
                               IsActive = p.IS_ACTIVE
                           }).FirstOrDefaultAsync();
            return new ResultWithError(r);
        }
        /// <summary>
        /// Create Data
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public async Task<ResultWithError> CreateAsync(BankInputDTO param)
        {
            var r = _appContext.Banks.Where(x => x.CODE == param.Code).Count();
            if (r > 0)
            {
                return new ResultWithError(Consts.CODE_EXISTS);
            }
            var data = Map<BankInputDTO, Bank>(param, new Bank());
            data.IS_ACTIVE = true;
            var result = await _appContext.Banks.AddAsync(data);
            try
            {
                await _appContext.SaveChangesAsync();
            }
            catch (System.Exception ex)
            {
                throw ex;
            }
            return new ResultWithError(200);
        }
        /// <summary>
        /// CMS Edit Data
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public async Task<ResultWithError> UpdateAsync(BankInputDTO param)
        {
            // check code
            var c = _appContext.Banks.Where(x => x.CODE.ToLower() == param.Code.ToLower() && x.ID != param.Id).Count();
            if (c > 0)
            {
                return new ResultWithError(Consts.CODE_EXISTS);
            }

            var r = _appContext.Banks.Where(x => x.ID == param.Id).FirstOrDefault();
            if (r == null)
            {
                return new ResultWithError(404);
            }

            var data = Map<BankInputDTO, Bank>(param, r);
            var result = _appContext.Banks.Update(data);
            await _appContext.SaveChangesAsync();
            return new ResultWithError(200);
        }
        /// <summary>
        /// CMS Change Status Data
        /// </summary>
        /// <param name="ids"></param>
        /// <returns></returns>
        public async Task<ResultWithError> ChangeStatusAsync(List<int> ids)
        {
            foreach (var item in ids)
            {
                var r = _appContext.Banks.Where(x => x.ID == item).FirstOrDefault();
                if (r == null)
                {
                    return new ResultWithError(404);
                }
                r.IS_ACTIVE = !r.IS_ACTIVE;
                var result = _appContext.Banks.Update(r);
            }
            await _appContext.SaveChangesAsync();
            return new ResultWithError(200);
        }
        /// <summary>
        /// Get List Group is Activce
        /// </summary>
        /// <param name="ids"></param>
        /// <returns></returns>
        public async Task<ResultWithError> GetList()
        {
            var queryable = await (from p in _appContext.Banks
                                   where p.IS_ACTIVE == true
                                   orderby p.ORDER
                                   select new
                                   {
                                       Id = p.ID,
                                       Name = p.NAME,
                                       Code = p.CODE
                                   }).ToListAsync();
            return new ResultWithError(queryable);
        }

        public async Task<ResultWithError> Delete(int id)
        {
            try
            {
                var item = await _appContext.Banks.Where(x => x.ID == id).FirstOrDefaultAsync();
                if (item == null)
                {
                    return new ResultWithError(Message.RECORD_NOT_FOUND);
                }
                _appContext.Banks.Remove(item);
                await _appContext.SaveChangesAsync();
                return new ResultWithError(item);
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex.Message);
            }
        }
    }
}
