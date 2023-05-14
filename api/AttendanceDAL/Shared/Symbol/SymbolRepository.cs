using System.Threading.Tasks;
using Common.Paging;
using AttendanceDAL.EntityFrameworkCore;
using AttendanceDAL.Models;
using AttendanceDAL.ViewModels;
using System.Linq;
using Common.Repositories;
using Common.Extensions;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System;

namespace AttendanceDAL.Repositories
{
    public class SymbolRepository : TLARepository<Symbol>, ISymbolRepository
    {
        private AttendanceDbContext _appContext => (AttendanceDbContext)_context;
        public SymbolRepository(AttendanceDbContext context) : base(context)
        {

        }
        /// <summary>
        /// CMS Get All Data
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public async Task<PagedResult<SymbolDTO>> GetAll(SymbolDTO param)
        {
            var queryable = from p in _appContext.Symbols
                            where p.IS_CAL == false
                            select new SymbolDTO
                            {
                                ID = p.ID,
                                Code = p.CODE,
                                Name = p.NAME,
                                IsActive = p.IS_ACTIVE,
                                Note = p.NOTE,
                                CreateBy = p.CREATE_BY,
                                UpdatedBy = p.UPDATED_BY,
                                CreateDate = p.CREATE_DATE,
                                UpdatedDate = p.UPDATED_DATE
                            };

            if (!string.IsNullOrWhiteSpace(param.Name))
            {
                queryable = queryable.Where(p => p.Name.ToUpper().Contains(param.Name.ToUpper()));
            }
            if (!string.IsNullOrWhiteSpace(param.Code))
            {
                queryable = queryable.Where(p => p.Code.ToUpper().Contains(param.Code.ToUpper()));
            }
            if (!string.IsNullOrWhiteSpace(param.Note))
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
            try
            {
                var r = await (from p in _appContext.Symbols
                               where p.ID == id
                               select new
                               {
                                   ID = p.ID,
                                   Code = p.CODE,
                                   Name = p.NAME,
                                   IsActive = p.IS_ACTIVE,
                                   IsOff = p.IS_OFF,
                                   Note = p.NOTE
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
        public async Task<ResultWithError> CreateAsync(SymbolInputDTO param)
        {
            try
            {
                var r2 = _appContext.Symbols.Where(x => x.CODE == param.Code).Count();
                if (r2 > 0)
                {
                    return new ResultWithError(Consts.CODE_EXISTS);
                }
                var data = Map<SymbolInputDTO, Symbol>(param, new Symbol());
                data.CODE = param.Code.Trim().ToUpper();
                data.IS_ACTIVE = true;
                var result = await _appContext.Symbols.AddAsync(data);
                await _appContext.SaveChangesAsync();
                param.ID = data.ID;
                return new ResultWithError(param);
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
        public async Task<ResultWithError> UpdateAsync(SymbolInputDTO param)
        {
            try
            {
                // check code
                var c = _appContext.Symbols.Where(x => x.CODE.ToLower() == param.Code.ToLower() && x.ID != param.ID).Count();
                if (c > 0)
                {
                    return new ResultWithError(Consts.CODE_EXISTS);
                }

                var r = _appContext.Symbols.Where(x => x.ID == param.ID).FirstOrDefault();
                if (r == null)
                {
                    return new ResultWithError(404);
                }

                var data = Map<SymbolInputDTO, Symbol>(param, r);
                var result = _appContext.Symbols.Update(data);
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
                    var r = _appContext.Symbols.Where(x => x.ID == item).FirstOrDefault();
                    if (r == null)
                    {
                        return new ResultWithError(404);
                    }
                    r.IS_ACTIVE = !r.IS_ACTIVE;                   
                    var result = _appContext.Symbols.Update(r);
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
        public async Task<ResultWithError> GetList()
        {
            try
            {
                var queryable = await (from p in _appContext.Symbols
                                       where p.IS_ACTIVE == true || p.IS_CAL == true
                                       orderby p.CODE
                                       select new
                                       {
                                           Id = p.ID,
                                           Name = "[" + p.NAME + "]",
                                           Code = p.CODE
                                       }).ToListAsync();
                return new ResultWithError(queryable);
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex.Message);
            }
        }
    }
}
