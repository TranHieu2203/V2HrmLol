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
    public class AllowanceRepository : TLARepository<Allowance>, IAllowanceRepository
    {
        private ProfileDbContext _appContext => (ProfileDbContext)_context;
        public AllowanceRepository(ProfileDbContext context) : base(context)
        {

        }
        /// <summary>
        /// CMS Get All Data
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public async Task<PagedResult<AllowanceViewDTO>> GetAll(AllowanceViewDTO param)
        {
            var queryable = from p in _appContext.Allowances
                            from g in _appContext.OtherListFixs.Where(c => c.ID == p.TYPE_ID && c.TYPE == SystemConfig.ALLOWANCE_TYPE).DefaultIfEmpty()
                            
                            select new AllowanceViewDTO
                            {
                                ID = p.ID,
                                Code = p.CODE,
                                Name = p.NAME,
                                TypeId = p.TYPE_ID,
                                TypeName = g.NAME,
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
                var r = await (from p in _appContext.Allowances
                               where p.ID == id 
                               select new
                               {
                                   ID = p.ID,
                                   Code = p.CODE,
                                   Name = p.NAME,
                                   TypeId = p.TYPE_ID,
                                   IsInsurance = p.IS_INSURANCE,
                                   IsActive = p.IS_ACTIVE,
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
        public async Task<ResultWithError> CreateAsync(AllowanceInputDTO param)
        {
            try
            {
                var r1 = _appContext.Allowances.Where(x => x.CODE == param.Code ).Count();
                if (r1 > 0)
                {
                    return new ResultWithError(Consts.CODE_EXISTS);
                }
                var r = _appContext.OtherListFixs.Where(x => x.ID == param.TypeId).Count();
                if (r == 0)
                {
                    return new ResultWithError(Message.TYPE_NOT_EXIST);
                }
                var data = Map<AllowanceInputDTO, Allowance>(param, new Allowance());
                data.IS_ACTIVE = true;
                data.COL_NAME = data.CODE;
                var result = await _appContext.Allowances.AddAsync(data);
                param.ID = data.ID;
                // add col and element to payroll sheet sum
                dynamic res = await QueryData.ExecuteObject("PKG_PAYROLL.ADD_ALLOWANCE",
                    new
                    {
                        
                        P_CODE = data.CODE,
                        P_CUR = QueryData.OUT_CURSOR,
                    }, false);
                if(res.STATUS == 400)
                {
                    return new ResultWithError(res.MESSAGE);
                }

                await _appContext.SaveChangesAsync();
                return new ResultWithError(param);
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex.Message);
            }
        }
        /// <summary>
        /// CMS Edit Data
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public async Task<ResultWithError> UpdateAsync(AllowanceInputDTO param)
        {
            try
            {
                var r1 = _appContext.Organizations.Where(x => x.CODE == param.Code && x.ID != param.ID ).Count();
                if (r1 > 0)
                {
                    return new ResultWithError(Consts.CODE_EXISTS);
                }
                var type = _appContext.OtherListFixs.Where(x => x.ID == param.TypeId).Count();
                if (type == 0)
                {
                    return new ResultWithError("TYPE_NOT_EXISTS");
                }
                // check code
                var c = _appContext.Allowances.Where(x => x.CODE.ToLower() == param.Code.ToLower()  && x.ID != param.ID).Count();
                if (c > 0)
                {
                    return new ResultWithError(Consts.CODE_EXISTS);
                }

                var r = _appContext.Allowances.Where(x => x.ID == param.ID).FirstOrDefault();
                if (r == null)
                {
                    return new ResultWithError(404);
                }
                // check code cua phu cap, phan tu luong dã dung lap cong thuc chua
                
                param.Name = null;
                var data = Map<AllowanceInputDTO, Allowance>(param, r);
                var result = _appContext.Allowances.Update(data);
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
                    var r = _appContext.Allowances.Where(x => x.ID == item ).FirstOrDefault();
                    if (r == null)
                    {
                        return new ResultWithError(404);
                    }
                    r.IS_ACTIVE = !r.IS_ACTIVE;
                    var result = _appContext.Allowances.Update(r);
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
                var queryable = await (from p in _appContext.Allowances
                                       where p.IS_ACTIVE == true 
                                       orderby p.CODE
                                       select new
                                       {
                                           Id = p.ID,
                                           Name = p.NAME,
                                           Code = p.CODE
                                       }).ToListAsync();
                return new ResultWithError(queryable);
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex.Message);
            }
        }
        /// <summary>
        /// CMS Get Detail
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>       
        public async Task<ResultWithError> CheckAllowIsUsed(string param)
        {
            try
            {
                // check log time sheet
                string r = await QueryData.ExecuteStoreString("PKG_DEMO.CHECK_ALLOWANCE_USED", new
                {
                    
                    P_CODE = param,
                    p_cur = QueryData.OUT_CURSOR
                });
                return new ResultWithError(r);
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex.Message);
            }
        }
    }
}
