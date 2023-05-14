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
    public class WelfareRepository : TLARepository<Welfare>, IWelfareRepository
    {
        private ProfileDbContext _appContext => (ProfileDbContext)_context;
        public WelfareRepository(ProfileDbContext context) : base(context)
        {

        }
        /// <summary>
        /// CMS Get All Data
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public async Task<PagedResult<WelfareDTO>> GetAll(WelfareDTO param)
        {
            var queryable = from p in _appContext.Welfares
                            
                            orderby p.CREATE_DATE descending
                            select new WelfareDTO
                            {
                                Id = p.ID,
                                Code = p.CODE,
                                Name = p.NAME,
                                Monney = p.MONNEY,
                                Seniority = p.SENIORITY,
                                DateStart = p.DATE_START,
                                DateEnd = p.DATE_END,
                                ContractTypeName = String.Join(";", (from t in _appContext.WelfareContracts
                                                                     join d in _appContext.ContractTypes on t.CONTRACT_TYPE_ID equals d.ID
                                                                     where t.WELFARE_ID == p.ID
                                                                     select d.NAME).ToList()),
                                ContractTypeIds = String.Join(";", (from t in _appContext.WelfareContracts
                                                                    where t.WELFARE_ID == p.ID
                                                                    select t.CONTRACT_TYPE_ID).ToList()),
                                IsActive = p.IS_ACTIVE,
                                Note = p.NOTE,
                                CreateBy = p.CREATE_BY,
                                UpdatedBy = p.UPDATED_BY,
                                CreateDate = p.CREATE_DATE,
                                UpdatedDate = p.UPDATED_DATE,
                            };


            if (!string.IsNullOrWhiteSpace(param.Name))
            {
                queryable = queryable.Where(p => p.Name.ToUpper().Contains(param.Name.ToUpper()));
            }
            if (!string.IsNullOrWhiteSpace(param.Code))
            {
                queryable = queryable.Where(p => p.Code.ToUpper().Contains(param.Code.ToUpper()));
            }
            if (!string.IsNullOrWhiteSpace(param.ContractTypeName))
            {
                queryable = queryable.Where(p => p.ContractTypeName.ToUpper().Contains(param.ContractTypeName.ToUpper()));
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
                var r = await (from p in _appContext.Welfares
                               where p.ID == id 
                               select new WelfareInputDTO
                               {
                                   Id = p.ID,
                                   Name = p.NAME,
                                   Code = p.CODE,
                                   Monney = p.MONNEY,
                                   Seniority = p.SENIORITY,
                                   DateStart = p.DATE_START,
                                   DateEnd = p.DATE_END,
                                   ContractTypes = (from t in _appContext.WelfareContracts
                                                    where t.WELFARE_ID == p.ID
                                                    select t.CONTRACT_TYPE_ID).ToList(),
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
        public async Task<ResultWithError> CreateAsync(WelfareInputDTO param)
        {
            try
            {
                var r1 = _appContext.Welfares.Where(x => x.CODE == param.Code ).Count();
                if (r1 > 0)
                {
                    return new ResultWithError(Consts.CODE_EXISTS);
                }
                var data = Map<WelfareInputDTO, Welfare>(param, new Welfare());
                data.IS_ACTIVE = true;
                var result = await _appContext.Welfares.AddAsync(data);
                if (param.ContractTypes != null && param.ContractTypes.Count > 0)
                {
                    foreach (var item in param.ContractTypes)
                    {
                        var r = new WelfareContract();
                        r.CONTRACT_TYPE_ID = item;
                        r.WELFARE_ID = data.ID;
                        await _appContext.WelfareContracts.AddAsync(r);
                    }
                }
                await _appContext.SaveChangesAsync();
                param.Id = data.ID;
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
        public async Task<ResultWithError> UpdateAsync(WelfareInputDTO param)
        {
            try
            {
                // check code
                var c = _appContext.Welfares.Where(x => x.CODE.ToLower() == param.Code.ToLower()  && x.ID != param.Id).Count();
                if (c > 0)
                {
                    return new ResultWithError(Consts.CODE_EXISTS);
                }

                var r = _appContext.Welfares.Where(x => x.ID == param.Id ).FirstOrDefault();
                if (r == null)
                {
                    return new ResultWithError(404);
                }

                var data = Map<WelfareInputDTO, Welfare>(param, r);
                var result = _appContext.Welfares.Update(data);

                var d = _appContext.WelfareContracts.Where(x => x.WELFARE_ID == param.Id).ToList();
                if (d != null)
                {
                    _appContext.WelfareContracts.RemoveRange(d);
                }
                if (param.ContractTypes != null && param.ContractTypes.Count > 0)
                {
                    foreach (var item in param.ContractTypes)
                    {
                        var con = new WelfareContract();
                        con.CONTRACT_TYPE_ID = item;
                        con.WELFARE_ID = data.ID;
                        await _appContext.WelfareContracts.AddAsync(con);
                    }
                }
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
                    var r = _appContext.Welfares.Where(x => x.ID == item ).FirstOrDefault();
                    if (r == null)
                    {
                        return new ResultWithError(404);
                    }
                    r.IS_ACTIVE = !r.IS_ACTIVE;
                    var result = _appContext.Welfares.Update(r);
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
