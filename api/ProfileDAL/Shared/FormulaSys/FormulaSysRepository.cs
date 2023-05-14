using System.Threading.Tasks;
using Common.Paging;
using ProfileDAL.EntityFrameworkCore;
using ProfileDAL.ViewModels;
using ProfileDAL.Models;
using System.Linq;
using Common.Repositories;
using Common.Extensions;
using System;
using System.Dynamic;
using System.Collections.Generic;
using System.Data;

namespace ProfileDAL.Repositories
{
    public class FormulaSysRepository : TLARepository<FormulaSys>, IFormulaSysRepository
    {
        private ProfileDbContext _appContext => (ProfileDbContext)_context;
        public FormulaSysRepository(ProfileDbContext context) : base(context)
        {

        }

        /// <summary>
        /// Create Data for System
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public async Task<ResultWithError> Update(FormulaSysInputDTO param)
        {
            try
            {

                dynamic r = await QueryData.ExecuteObject("PKG_DEMO.ADD_FORMULA",
                    new
                    {
                        P_AREA_ID = param.AreaId,
                        P_FORMULAR_NAME = param.FormulaName,
                        P_COL_NAME = param.ColName,
                        P_SALARY_TYPE_ID = param.SalaryTypeId,
                        P_CUR = QueryData.OUT_CURSOR
                    }, false);
                if (r.STATUS == 400)
                {
                    return new ResultWithError(r.MESSAGE);
                }

                return new ResultWithError(200);
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex.Message);
            }
        }
        /// <summary>
        /// Get List grid ben phai
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public async Task<PagedResult<FormulaSysDTO>> GetElementCal(FormulaSysDTO param)
        {
            try
            {
                var queryable = from a in _appContext.SalaryStructSyses.Where(c =>  c.SALARY_TYPE_ID == param.SalaryTypeId)
                                join e in _appContext.SalaryElementSyses on a.ELEMENT_ID equals e.ID
                                join f in _appContext.FormulaSyses.Where(c => c.SALARY_TYPE_ID == param.SalaryTypeId)
                                on e.CODE.Trim().ToUpper() equals f.COL_NAME.Trim().ToUpper() into tmp2
                                from f2 in tmp2.DefaultIfEmpty()
                                where a.IS_CALCULATE == true
                                orderby a.ORDERS, e.NAME
                                select new FormulaSysDTO
                                {
                                    SalaryTypeId = param.SalaryTypeId,
                                    Name = e.NAME,
                                    ColName = e.CODE,
                                    FormulaName = f2.FORMULA_NAME,
                                    Orders = a.ORDERS
                                };
                return await PagingList(queryable, param);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<PagedResult<ExpandoObject>> ListPayrollSum(PayrollSysSumDTO param)
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
                return await QueryData.ExecutePaging("PKG_PAYROLL.LIST_PAYROLL_SUM",
                    new
                    {
                        p_is_admin = _appContext.IsAdmin == true ? 1 : 0,
                        p_org_id = param.OrgId,
                        p_period_id = param.PeriodId,
                        P_IS_QUIT = param.IS_QUIT, 
                        P_SALARY_TYPE_ID = param.SalaryTypeId,
                        P_CODE = param.EMPLOYEE_CODE,
                        P_NAME = param.EMPLOYEE_NAME,
                        P_ORG_NAME = param.ORG_NAME,
                        P_POS_NAME = param.POSITION_NAME,
                        p_page_no = param.PageNo,
                        p_page_size = param.PageSize,
                        P_CUR = QueryData.OUT_CURSOR,
                        P_CUR_PAGE = QueryData.OUT_CURSOR
                    }, true); ;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<ExpandoObject>> MBPayrollSum(PayrollSysInputMobile param)
        {
            try
            {

                return await QueryData.ExecuteList("PKG_PAYROLL.M_PAYROLL_SUM",
                    new
                    {
                        
                        P_EMP_ID = _appContext.EmpId,
                        P_PERIOD_ID = param.PeriodId,
                        P_SALARY_TYPE_ID = param.SalaryTypeId,
                        P_CUR = QueryData.OUT_CURSOR,
                    }, false);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ResultWithError> PayrollCal(PayrollSysInputDTO param)
        {
            try
            {
                // check log time sheet
                dynamic r = await QueryData.ExecuteObject("PKG_PAYROLL.CHECK_TIMESHEET_LOCK", new
                {
                    
                    p_org_id = param.OrgId,
                    p_period_id = param.PeriodId,
                    p_cur = QueryData.OUT_CURSOR
                }, false);
                if (r.STATUS == "UNLOCK")
                {
                    return new ResultWithError(Message.TIME_SHEET_UNLOCKED);
                }
                if (r.STATUS == "LOCK")
                {
                    
                    try
                    {
                        
                        await QueryData.Execute("PKG_PAYROLL.CAL_PAYROLL", new
                        {
                            p_is_admin = _appContext.IsAdmin == true ? 1 : 0,
                            p_org_id = param.OrgId,
                            p_period_id = param.PeriodId,
                            p_type_sal = param.SalaryTypeId // Bang luong
                        }, true);
                    }
                    catch (Exception ex)
                    {
                        throw ex;
                    }
                    var orgIds = await QueryData.ExecuteList("PKG_COMMON.LIST_ORG",
                         new
                         {
                             P_IS_ADMIN = _appContext.IsAdmin == true ? 1 : 0,
                             
                             P_ORG_ID = param.OrgId,
                             P_CURENT_USER_ID = _appContext.CurrentUserId,
                             P_CUR = QueryData.OUT_CURSOR
                         }, false);


                    List<decimal?> ids = orgIds.Select(c => (decimal?)((dynamic)c).ID).ToList();
                    ids.Add(param.OrgId);

                    var query = (from e in _appContext.Employees.Where(c =>  ids.Contains(c.ORG_ID))
                                 join a in _appContext.Workings on e.ID equals a.EMPLOYEE_ID into tmp1
                                 from a2 in tmp1.DefaultIfEmpty()
                                 select new
                                 {
                                     ID = e.ID,
                                     NAME = e.FULLNAME,
                                     CODE = e.CODE,
                                     WORKING_ID = (long?)a2.EMPLOYEE_ID
                                 }).ToList();
                    var x = query.Where(d => d.WORKING_ID == null).Select(f => f).ToList();
                    return new ResultWithError(x);
                }
                return new ResultWithError(400);

            }
            catch (Exception ex)
            {

                return new ResultWithError(ex.Message);
            }
        }
        public async Task<ResultWithError> CheckTimesheetLock(PayrollSysInputDTO param)
        {
            try
            {
                // check log time sheet
                string r = await QueryData.ExecuteStoreString("PKG_PAYROLL.CHECK_TIMESHEET_LOCK", new
                {
                    p_org_id = param.OrgId,
                    p_period_id = param.PeriodId,
                    p_cur = QueryData.OUT_CURSOR
                });
                return new ResultWithError(new { status = r });
            }
            catch (Exception ex)
            {

                return new ResultWithError(ex.Message);
            }
        }

        public async Task<List<object>> PortalGetBy(int periodId)
        {
            try
            {
                var x = new List<object>()
                {
                    new
                    {
                        NAME = "Bao hiem that nghiep nguoi lao dong",
                        VALUE = 60000.0
                    },
                                   new  {
                        NAME= "Cong di lam thuc te",
                        VALUE= 5.50
                    },
                   new {
                                NAME= "Bao hiem that nghiep cong ty",
                        VALUE= 60000.0
                    },
                   new {
                                NAME= "Bao hiem xa hoi cong ty ",
                        VALUE= 60000.0
                    },
                   new {
                                NAME= "Luong chinh",
                        VALUE= 12000000.0
                    },
                   new {
                                NAME= "OT dem ngay nghi",
                        VALUE = 0
                    },
                   new {
                                NAME= "Tong cac khoan giam tru",
                        VALUE= 22630000.0
                    },
                   new {
                                NAME= "Bao hiem y te nguoi lao dong",
                        VALUE= 90000.0
                    },
                   new {
                                NAME= "Doan phi cong doan",
                        VALUE= 60000.0
                    },
                  new  {
                                NAME= "Thu nhap tinh thue",
                        VALUE= 0.0
                    },
                   new {
                                NAME= "Bao hiem xa hoi nguoi  lao dong",
                        VALUE= 480000.0
                    },
                   new {
                                NAME= "Thue thu nhap ca nhan",
                        VALUE= 0.0
                    },
                   new {
                                NAME= "Luong co ban dong bao hiem",
                        VALUE= 6000000.0
                    },
                    new{
                                NAME= "Phu cap di lai",
                        VALUE= 325000.0
                    }

             };


                return x;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<PagedResult<ExpandoObject>> ListImportPayroll(PayrollSysSumDTO param)
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
                return await QueryData.ExecutePaging("PKG_PAYROLL.LIST_IMPORT",
                    new
                    {
                        p_is_admin = _appContext.IsAdmin == true ? 1 : 0,
                        p_org_id = param.OrgId,
                        p_period_id = param.PeriodId,
                        P_IS_QUIT = param.IS_QUIT,
                        P_SALARY_TYPE_ID = param.SalaryTypeId,
                        P_CODE = param.EMPLOYEE_CODE,
                        P_NAME = param.EMPLOYEE_NAME,
                        P_ORG_NAME = param.ORG_NAME,
                        P_POS_NAME = param.POSITION_NAME,
                        p_page_no = param.PageNo,
                        p_page_size = param.PageSize,
                        P_CUR = QueryData.OUT_CURSOR,
                        P_CUR_PAGE = QueryData.OUT_CURSOR
                    }, true); ;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
