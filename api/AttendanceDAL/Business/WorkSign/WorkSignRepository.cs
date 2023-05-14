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
using System.Dynamic;
using Common.EPPlus;

namespace AttendanceDAL.Repositories
{
    public class WorkSignRepository : TLARepository<WorkSign>, IWorkSignRepository
    {
        private AttendanceDbContext _appContext => (AttendanceDbContext)_context;
        public WorkSignRepository(AttendanceDbContext context) : base(context)
        {

        }

        /// <summary>
        /// CMS Get All Data
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public async Task<PagedResult<ExpandoObject>> GetAll(WorkSignDTO param)
        {
            try
            {
                if (param.PageNo == 0)
                {
                    param.PageNo = 1;
                }
                if (param.PageSize == 0)
                {
                    param.PageSize = 20;
                }
                var r = await QueryData.ExecutePaging("PKG_TIMESHEET.LIST_WORKSIGN",
                    new
                    {
                        P_IS_ADMIN = _appContext.IsAdmin == true ? 1 : 0,
                        p_org_id = param.ORG_ID,
                        p_period_id = param.PERIOD_ID,
                        P_CODE = param.EMPLOYEE_CODE,
                        P_NAME = param.EMPLOYEE_NAME,
                        P_ORG_NAME = param.ORG_NAME,
                        P_POS_NAME = param.POSITION_NAME,
                        P_TYPE = param.TYPE,
                        p_page_no = param.PageNo,
                        p_page_size = param.PageSize,
                        P_CUR = QueryData.OUT_CURSOR,
                        P_CUR_PAGE = QueryData.OUT_CURSOR
                    }, true);

                return r;
            }
            catch (Exception ex)
            {
                throw ex;
            }
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
                var r = await (from p in _appContext.WorkSigns
                               where p.ID == id
                               select new
                               {
                                   Id = p.ID,

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
        public async Task<ResultWithError> CreateAsync(WorkSignInputDTO param)
        {
            try
            {
                if (param.ObjectId == 0) // phong ban
                {
                    await QueryData.Execute("PKG_TIMESHEET.WORKSIGN_SORT_ORG",
                        new
                        {
                            P_SHIFT_ID = param.ShiftId,
                            P_ORG_ID = string.Join(",", param.OrgIds),
                            P_PERIOD_ID = param.PeriodId,
                            P_START_DATE = param.DateStart,
                            P_END_DATE = param.DateEnd,
                            P_TYPE = param.Type,
                            P_IS_ADMIN = _appContext.IsAdmin == true ? 1 : 0,
                        }, true);
                    return new ResultWithError(200);
                }
                else // emp
                {
                    await QueryData.Execute("PKG_TIMESHEET.WORKSIGN_SORT_EMP",
                                            new
                                            {
                                                P_SHIFT_ID = param.ShiftId,
                                                P_EMP_ID = string.Join(",", param.EmpIds),
                                                P_START_DATE = param.DateStart,
                                                P_END_DATE = param.DateEnd,
                                                P_TYPE = param.Type,
                                                P_PERIOD_ID = param.PeriodId
                                            }, true);
                    return new ResultWithError(200);
                }
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex.Message);
            }
        }
        public async Task<ResultWithError> UpdateAsync(WorkSignInputDTO param)
        {
            try
            {
                if (param.EmpIds.Count() == 0)
                {
                    return new ResultWithError(Message.EMP_NOT_EXIST);
                }

                var salaryPeriod = await _appContext.SalaryPeriods.Where(c => c.ID == param.PeriodId).FirstOrDefaultAsync();

                List<DateTime> dayOfMonth = new List<DateTime>();
                for (var d = param.DateStart; d <= param.DateEnd; d = d.AddDays(1))
                {
                    dayOfMonth.Add(d);
                }

                if (param.Type == 1)
                {
                    List<WorkSign> WorkSignsUpdate = new List<WorkSign>();
                    foreach (var item in param.EmpIds)
                    {
                        foreach (var day in dayOfMonth)
                        {
                            //check record exist
                            var timeSheet = await _appContext.WorkSigns.Where(c => c.EMPLOYEE_ID == item && c.PERIOD_ID == param.PeriodId &&
                            c.WORKINGDAY.Date == day.Date 
                            ).FirstOrDefaultAsync();

                            if (timeSheet == null)
                            {
                                return new ResultWithError(Message.TIME_SHEET_DAILY_NOT_EXIST);
                            }
                            timeSheet.PERIOD_ID = param.PeriodId;
                            timeSheet.WORKINGDAY = day;
                            timeSheet.EMPLOYEE_ID = item;
                            timeSheet.SHIFT_ID = param.ShiftId;
                            WorkSignsUpdate.Add(timeSheet);
                        }
                    }
                    _appContext.WorkSigns.UpdateRange(WorkSignsUpdate);
                }
                else
                {
                    List<WorkSignDuty> WorkSignsUpdate = new List<WorkSignDuty>();
                    foreach (var item in param.EmpIds)
                    {
                        foreach (var day in dayOfMonth)
                        {
                            //check record exist
                            var timeSheet = await _appContext.WorkSignDutys.Where(c => c.EMPLOYEE_ID == item && c.PERIOD_ID == param.PeriodId &&
                            c.WORKINGDAY.Date == day.Date 
                            ).FirstOrDefaultAsync();

                            if (timeSheet == null)
                            {
                                return new ResultWithError(Message.TIME_SHEET_DAILY_NOT_EXIST);
                            }
                            timeSheet.PERIOD_ID = param.PeriodId;
                            timeSheet.WORKINGDAY = day;
                            timeSheet.EMPLOYEE_ID = item;
                            timeSheet.SHIFT_ID = param.ShiftId;
                            WorkSignsUpdate.Add(timeSheet);
                        }
                    }
                    _appContext.WorkSignDutys.UpdateRange(WorkSignsUpdate);
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
                    var r = _appContext.WorkSigns.Where(x => x.ID == item ).FirstOrDefault();
                    if (r == null)
                    {
                        return new ResultWithError(404);
                    }
                    var result = _appContext.WorkSigns.Update(r);
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
        /// CMS Change Status Data
        /// </summary>
        /// <param name="ids"></param>
        /// <returns></returns>
        public async Task<ResultWithError> ImportTimeSort(List<ImportExcelDTO> param, int type)
        {
            try
            {
                var lst = new List<WorkSignTmp>();
                foreach (var item in param)
                {
                    var data = Map<ImportExcelDTO, WorkSignTmp>(item, new WorkSignTmp());
                    lst.Add(data);
                }
                if (lst.Count > 0)
                {
                    await _appContext.WorkSignTmps.AddRangeAsync(lst);
                    await _appContext.SaveChangesAsync();
                    await QueryData.Execute("PKG_TIMESHEET.WORKSIGN_IMPORT",
                           new
                           {
                               P_IS_ADMIN = _appContext.IsAdmin == true ? 1 : 0,
                               P_TYPE = type,
                               P_PERIOD_ID = param[0].PeriodId
                           }, true);
                    return new ResultWithError(200);
                }
                return new ResultWithError(404);
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex.Message);
            }
        }

        public async Task<ResultWithError> ImportTimeSortNew(ImportWorkSignParam param)
        {
            try
            {
                param.Data.RemoveRange(0, 2);
                if (param.Data.Count == 0)
                {
                    return new ResultWithError(404);
                }
               
                var guid = Guid.NewGuid().ToString();
                var count = param.Data.Count();
                string[] codes = new string[count];
                string[] refCode = new string[count];
                string[] day1 = new string[count];
                string[] day2 = new string[count];
                string[] day3 = new string[count];
                string[] day4 = new string[count];
                string[] day5 = new string[count];
                string[] day6 = new string[count];
                string[] day7 = new string[count];
                string[] day8 = new string[count];
                string[] day9 = new string[count];
                string[] day10 = new string[count];
                string[] day11 = new string[count];
                string[] day12 = new string[count];
                string[] day13 = new string[count];
                string[] day14 = new string[count];
                string[] day15 = new string[count];
                string[] day16 = new string[count];
                string[] day17 = new string[count];
                string[] day18 = new string[count];
                string[] day19 = new string[count];
                string[] day20 = new string[count];
                string[] day21 = new string[count];
                string[] day22 = new string[count];
                string[] day23 = new string[count];
                string[] day24 = new string[count];
                string[] day25 = new string[count];
                string[] day26 = new string[count];
                string[] day27 = new string[count];
                string[] day28 = new string[count];
                string[] day29 = new string[count];
                string[] day30 = new string[count];
                string[] day31 = new string[count];
                int i = 0;
                foreach (var item in param.Data)
                {
                    if (!string.IsNullOrWhiteSpace(item.Code))
                    {
                        refCode[i] = guid;
                        codes[i] = item.Code;
                        day1[i] = item.Day1;
                        day2[i] = item.Day2;
                        day3[i] = item.Day3;
                        day4[i] = item.Day4;
                        day5[i] = item.Day5;
                        day6[i] = item.Day6;
                        day7[i] = item.Day7;
                        day8[i] = item.Day8;
                        day9[i] = item.Day9;
                        day10[i] = item.Day10;
                        day11[i] = item.Day11;
                        day12[i] = item.Day12;
                        day13[i] = item.Day13;
                        day14[i] = item.Day14;
                        day15[i] = item.Day15;
                        day16[i] = item.Day16;
                        day17[i] = item.Day17;
                        day18[i] = item.Day18;
                        day19[i] = item.Day19;
                        day20[i] = item.Day20;
                        day21[i] = item.Day21;
                        day22[i] = item.Day22;
                        day23[i] = item.Day23;
                        day24[i] = item.Day24;
                        day25[i] = item.Day25;
                        day26[i] = item.Day26;
                        day27[i] = item.Day27;
                        day28[i] = item.Day28;
                        day29[i] = item.Day29;
                        day30[i] = item.Day30;
                        day31[i] = item.Day31;
                        i += 1;
                    }
                }

                if (i > 0)
                {                   
                    var ds = QueryData.ExecuteStoreToTable("PKG_IMPORT.WORKSIGN_IMPORT",
                    new
                    {
                        P_REF_CODE = guid,
                        P_CUR = QueryData.OUT_CURSOR
                    }, true);

                    if (ds.Tables.Count > 0)
                    {
                        ds.Tables[0].TableName = "Data";
                        var pathTemp = _appContext._config["urlTempDecision"];
                        var memoryStream = Template.FillTemplate(pathTemp, ds);
                        return new ResultWithError(memoryStream);
                    }
                    return new ResultWithError(200);
                }
                else
                {
                    return new ResultWithError(200);
                }
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex.Message);
            }
        }


        public async Task<ResultWithError> Delete(WorkSignDeleteDTO param)
        {
            try
            {
                await QueryData.Execute("PKG_TIMESHEET.DELETE_WORKSIGN",
                                            new
                                            {
                                                
                                                P_EMP_ID = string.Join(",", param.Ids),
                                                P_TYPE = param.Type,
                                                P_PERIOD_ID = param.PeriodId
                                            }, false); ;
                await _appContext.SaveChangesAsync();
                return new ResultWithError(200);
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex.Message);
            }
        }

        public async Task<ResultWithError> TemplateExport(ExportTemplateDTO param)
        {
            try
            {
                // get list data emp
                var ds = QueryData.ExecuteStoreToTable("PKG_DEMO.GET_EMP_BY_ORG",
                                           new
                                           {
                                               
                                               P_ORG_ID = param.OrgId,
                                               P_PERIOD_ID = param.PeriodId,
                                               P_CUR_EMP = QueryData.OUT_CURSOR,
                                               P_CUR_SHIFT = QueryData.OUT_CURSOR
                                           }, false);
                if (ds.Tables[0].Rows.Count <= 0)
                {
                    return new ResultWithError("DATA_EMPTY");
                }
                ds.Tables[0].TableName = "DATA_EMP";
                ds.Tables[1].TableName = "DATA_SHIFT";
                var pathTemp = _appContext._config["urlTemplateTimeSort"];
                var memoryStream = Template.FillReport(pathTemp, ds);
                return new ResultWithError(memoryStream);
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex.Message);
            }
        }
    }
}
