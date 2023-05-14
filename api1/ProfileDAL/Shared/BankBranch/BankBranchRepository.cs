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
    public class BankBranchRepository : TLARepository<BankBranch>, IBankBranchRepository
    {
        private ProfileDbContext _appContext => (ProfileDbContext)_context;
        public BankBranchRepository(ProfileDbContext context) : base(context)
        {

        }
        /// <summary>
        /// CMS Get All Data
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public async Task<PagedResult<BankBranchDTO>> GetAll(BankBranchDTO param)
        {
            var queryable = from p in _appContext.BankBranchs
                            join g in _appContext.Banks on p.BANK_ID equals g.ID
                            orderby p.CREATE_DATE descending
                            select new BankBranchDTO
                            {
                                Id = p.ID,
                                Name = p.NAME,
                                BankName = g.NAME,
                                Code = p.CODE,
                                IsActive = p.IS_ACTIVE,
                                Note = p.NOTE,
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
            if (!string.IsNullOrEmpty(param.BankName))
            {
                queryable = queryable.Where(p => p.BankName.ToUpper().Contains(param.BankName.ToUpper()));
            }
            if (param.IsActive != null)
            {
                queryable = queryable.Where(p => p.IsActive == param.IsActive);
            }
            if (param.BankId != null)
            {
                queryable = queryable.Where(p => p.BankId == param.BankId);
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
            try
            {
                var r = await (from p in _appContext.BankBranchs
                               where p.ID == id
                               select new
                               {
                                   Id = p.ID,
                                   Name = p.NAME,
                                   Code = p.CODE,
                                   Note = p.NOTE,
                                   BankId = p.BANK_ID,
                               }).FirstOrDefaultAsync();
                return new ResultWithError(r);
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex.Message);
            }
        }
        /// <summary>
        /// Create Data
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public async Task<ResultWithError> CreateAsync(BankBranchInputDTO param)
        {
            try
            {
                var r1 = _appContext.BankBranchs.Where(x => x.CODE == param.Code).Count();
                if (r1 > 0)
                {
                    return new ResultWithError(Consts.CODE_EXISTS);
                }
                var r = _appContext.Banks.Where(x => x.ID == param.BankId).Count();
                if (r == 0)
                {
                    return new ResultWithError("BANK_NOT_EXISTS");
                }
                var data = Map<BankBranchInputDTO, BankBranch>(param, new BankBranch());
                data.IS_ACTIVE = true;
                var result = await _appContext.BankBranchs.AddAsync(data);
                await _appContext.SaveChangesAsync();
                return new ResultWithError(200);
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
        public async Task<ResultWithError> UpdateAsync(BankBranchInputDTO param)
        {
            try
            {
                // check code
                var c = _appContext.BankBranchs.Where(x => x.CODE.ToLower() == param.Code.ToLower() && x.ID != param.Id).Count();
                if (c > 0)
                {
                    return new ResultWithError(Consts.CODE_EXISTS);
                }
                var r = _appContext.Banks.Where(x => x.ID == param.BankId).Count();
                if (r == 0)
                {
                    return new ResultWithError("BANK_NOT_EXISTS");
                }
                var a = _appContext.BankBranchs.Where(x => x.ID == param.Id).FirstOrDefault();
                if (a == null)
                {
                    return new ResultWithError(404);
                }

                var data = Map<BankBranchInputDTO, BankBranch>(param, a);
                var result = _appContext.BankBranchs.Update(data);
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
                    var r = _appContext.BankBranchs.Where(x => x.ID == item).FirstOrDefault();
                    if (r == null)
                    {
                        return new ResultWithError(404);
                    }
                    r.IS_ACTIVE = !r.IS_ACTIVE;
                    var result = _appContext.BankBranchs.Update(r);
                }
                await _appContext.SaveChangesAsync();
                return new ResultWithError(200);
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex.Message);
            }
        }
        /// <summary>
        /// Get List Group is Activce
        /// </summary>
        /// <param name="ids"></param>
        /// <returns></returns>
        public async Task<ResultWithError> GetList(int BankId)
        {
            try
            {
                var data = await (from p in _appContext.BankBranchs
                                  where p.IS_ACTIVE == true && p.BANK_ID == BankId
                                  orderby p.NAME
                                  select new
                                  {
                                      Id = p.ID,
                                      Name = p.NAME
                                  }).ToListAsync();
                return new ResultWithError(data);
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex.Message);
            }
        }

        /// <summary>
        /// Delete by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<ResultWithError> Delete(int id)
        {
            try
            {
                var item = await _appContext.BankBranchs.Where(x => x.ID == id).FirstOrDefaultAsync();
                if (item != null)
                {

                }
                _appContext.BankBranchs.Remove(item);
                await _appContext.SaveChangesAsync();
                return new ResultWithError(Message.RECORD_NOT_FOUND);
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex.Message);
            }
        }
    }
}
