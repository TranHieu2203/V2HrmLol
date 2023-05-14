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
    public class HolidayRepository : TLARepository<Holiday>, IHolidayRepository
    {
        private AttendanceDbContext _appContext => (AttendanceDbContext)_context;
        public HolidayRepository(AttendanceDbContext context) : base(context)
        {

        }
        /// <summary>
        /// CMS Get All Data
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public async Task<PagedResult<HolidayDTO>> GetAll(HolidayDTO param)
        {
            var queryable = from p in _appContext.Holidays
                            
                            orderby p.END_DAYOFF descending
                            select new HolidayDTO
                            {
                                Id = p.ID,
                                Code = p.CODE,
                                Name = p.NAME,
                                StartDayoff = p.START_DAYOFF,
                                EndDayoff = p.END_DAYOFF,
                                Note = p.NOTE,
                                IsActive = p.IS_ACTIVE,
                                CreateBy = p.CREATE_BY,
                                UpdatedBy = p.UPDATED_BY,
                                CreateDate = p.CREATE_DATE,
                                UpdatedDate = p.UPDATED_DATE
                            };

            if (!string.IsNullOrWhiteSpace(param.Name))
            {
                queryable = queryable.Where(p => p.Name.ToUpper().Contains(param.Name.ToUpper()));
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
                var r = await (from p in _appContext.Holidays.Where(c => c.ID == id)
                               
                               select new HolidayDTO
                               {
                                   Id = p.ID,
                                   Code = p.CODE,
                                   Name = p.NAME,
                                   StartDayoff = p.START_DAYOFF,
                                   EndDayoff = p.END_DAYOFF,
                                   Note = p.NOTE,
                                   IsActive = p.IS_ACTIVE,
                                   CreateBy = p.CREATE_BY,
                                   UpdatedBy = p.UPDATED_BY,
                                   CreateDate = p.CREATE_DATE,
                                   UpdatedDate = p.UPDATED_DATE
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
        public async Task<ResultWithError> CreateAsync(HolidayInputDTO param)
        {
            try
            {

                var a = _appContext.Holidays.Where(x => x.CODE == param.Code ).Count();
                if (a > 0)
                {
                    return new ResultWithError(Message.CODE_EXIST);
                }              
                var dataChk = await QueryData.ExecuteList("PKG_CHECK.AT_HOLIDAY_CHECK",
                         new
                         {
                                                       
                             P_DATE_START = param.StartDayoff,
                             P_DATE_END = param.EndDayoff,                            
                             P_CUR = QueryData.OUT_CURSOR
                         }, false);

                var chk = dataChk.Select(c => (int?)((dynamic)c).TOTAL).FirstOrDefault();
                if (chk > 0)
                {
                    return new ResultWithError("DATA_EXISTS");
                }
                
                var data = Map<HolidayInputDTO, Holiday>(param, new Holiday());
                data.IS_ACTIVE = true;
                var result = await _appContext.Holidays.AddAsync(data);
                await _appContext.SaveChangesAsync();
                param.Id = data.ID;
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
        public async Task<ResultWithError> UpdateAsync(HolidayInputDTO param)
        {
            try
            {
                // check code
                var r = _appContext.Holidays.Where(x => x.ID == param.Id ).FirstOrDefault();
                if (r == null)
                {
                    return new ResultWithError(404);
                }
                param.Code = null;
                var data = Map<HolidayInputDTO, Holiday>(param, r);
                var result = _appContext.Holidays.Update(data);
                await _appContext.SaveChangesAsync();
                return new ResultWithError(200);
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex.Message);
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
                    var r = _appContext.Holidays.Where(x => x.ID == item ).FirstOrDefault();
                    if (r == null)
                    {
                        return new ResultWithError(404);
                    }
                    r.IS_ACTIVE = !r.IS_ACTIVE;
                    var result = _appContext.Holidays.Update(r);
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
                var queryable = await (from p in _appContext.Holidays
                                       where p.IS_ACTIVE == true 
                                       select new
                                       {
                                           Id = p.ID,
                                           Name = p.NAME,
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
