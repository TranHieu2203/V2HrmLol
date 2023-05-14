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
using Microsoft.EntityFrameworkCore.Internal;

namespace AttendanceDAL.Repositories
{
    public class DayOffYearRepository : TLARepository<DayOffYear>, IDayOffYearRepository
    {
        private AttendanceDbContext _appContext => (AttendanceDbContext)_context;
        public DayOffYearRepository(AttendanceDbContext context) : base(context)
        {

        }
        /// <summary>
        /// CMS Get All Data
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public async Task<PagedResult<DayOffYearDTO>> GetAll(DayOffYearDTO param)
        {
            try
            {
                var queryable = from p in _appContext.DayOffYears
                                
                                select new DayOffYearDTO
                                {
                                    EmployeeId = p.EMPLOYEE_ID
                                };



                return await PagingList(queryable, param);

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        /// <summary>
        /// Get config theo tenant id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>        
        public async Task<ResultWithError> GetById()
        {
            try
            {
                var r = await (from p in _appContext.DayOffYearConfigs
                               
                               select new
                               {
                                   Id = p.ID,
                                   IsIntern = p.IS_INTERN,
                                   IsAccumulation = p.IS_ACCUMULATION,
                                   MonthId = p.MONTH_ID
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
        public async Task<ResultWithError> CreateAsync(DayOffYearConfigDTO param)
        {
            try
            {
                var salaryPeriod = await _appContext.SalaryPeriods.Where(c => c.ID == param.MonthId).FirstOrDefaultAsync();
                List<DateTime> dayOfMonth = new List<DateTime>();
                for (var d = salaryPeriod.DATE_START; d <= salaryPeriod.DATE_END; d = d.AddDays(1))
                {
                    dayOfMonth.Add(d);
                }
                List<DayOffYear> DayOffYearsCreate = new List<DayOffYear>();
                List<DayOffYear> DayOffYearsUpdate = new List<DayOffYear>();


                if (DayOffYearsCreate.Any())
                {
                    await _appContext.DayOffYears.AddRangeAsync(DayOffYearsCreate);
                }
                if (DayOffYearsUpdate.Any())
                {
                    _appContext.DayOffYears.UpdateRange(DayOffYearsUpdate);
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
        /// Tao moi ban ghi phep nam tu id nhan vien va nam
        /// </summary>
        /// <param name="empId"></param>
        /// <param name="yearId"></param>
        /// <returns></returns>
        public async Task<ResultWithError> CreateDayOffYear(long empId,int yearId)
        {
            try
            {
                var x = new DayOffYear();
                x.EMPLOYEE_ID = empId;
                x.YEAR_ID = yearId;
                await _appContext.DayOffYears.AddAsync(x);
                await _appContext.SaveChangesAsync();
                return new ResultWithError(200);
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex.Message);
            }
        }
        /// <summary>
        /// Thêm mới hoặc update 1 cấu hình cho tenant 
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public async Task<ResultWithError> UpdateAsync(DayOffYearConfigDTO param)
        {
            try
            {
                var r = await _appContext.DayOffYearConfigs.FirstOrDefaultAsync();
                if (r == null)
                {
                    var x = new DayOffYearConfig();
                    x.IS_INTERN = true;
                    x.IS_ACCUMULATION = true;
                    x.MONTH_ID = 3;
                    await _appContext.DayOffYearConfigs.AddAsync(x);
                }
                else
                {
                    var i = await _appContext.DayOffYearConfigs.FindAsync(param.Id);
                    if (i == null)
                    {
                        return new ResultWithError(Message.RECORD_NOT_FOUND);
                    }
                    var x = Map<DayOffYearConfigDTO, DayOffYearConfig>(param, i);
                    _appContext.DayOffYearConfigs.Update(x);
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
                    var r = _appContext.DayOffYears.Where(x => x.ID == item ).FirstOrDefault();
                    if (r == null)
                    {
                        return new ResultWithError(404);
                    }
                    var result = _appContext.DayOffYears.Update(r);
                }
                await _appContext.SaveChangesAsync();
                return new ResultWithError(200);
            }
            catch (Exception ex)
            {

                return new ResultWithError(ex.Message);
            }
        }

        /// Version 2
        /// <summary>
        ///  Get Current Entitlement (PHÉP NĂM HIỆN TẠI)
        /// </summary>
        /// <param name="id"></param>
        /// <param name="type">Loại đăng ký</param>
        /// <returns></returns>       
        public async Task<ResultWithError> PortalEntitlementCur()
        {
            try
            {
                var dt = await QueryData.ExecuteStore<EntertimentView>("PKG_PORTAL.CURRENT_ENTERTAIMENT",
                                          new
                                          {
                                              
                                              P_EMP_ID = _appContext.EmpId,
                                              P_CUR = QueryData.OUT_CURSOR
                                          });
                return new ResultWithError(dt);
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex.Message);
            }
        }
    }
}
