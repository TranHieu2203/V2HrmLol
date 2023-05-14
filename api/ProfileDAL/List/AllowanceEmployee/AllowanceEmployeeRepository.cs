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
    public class AllowanceEmpRepository : TLARepository<AllowanceEmp>, IAllowanceEmpRepository
    {
        private ProfileDbContext _appContext => (ProfileDbContext)_context;
        public AllowanceEmpRepository(ProfileDbContext context) : base(context)
        {

        }
        /// <summary>
        /// CMS Get All Data
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public async Task<PagedResult<AllowanceEmpDTO>> GetAll(AllowanceEmpDTO param)
        {
            var queryable = from p in _appContext.AllowanceEmps
                            from g in _appContext.Allowances.Where(c => c.ID == p.ALLOWANCE_ID)
                            from e in _appContext.Employees.Where(x => x.ID == p.EMPLOYEE_ID)
                            from o in _appContext.Organizations.Where(x => x.ID == e.ORG_ID)
                            from t in _appContext.Positions.Where(x => x.ID == e.POSITION_ID)
                            
                            select new AllowanceEmpDTO
                            {
                                Id = p.ID,
                                EmployeeId = p.EMPLOYEE_ID,
                                EmployeeCode = e.CODE,
                                EmployeeName = e.FULLNAME,
                                OrgId = e.ORG_ID,
                                OrgName = o.NAME,
                                PosName = t.NAME,
                                AllowanceId = p.ALLOWANCE_ID,
                                AllowanceName = g.NAME,
                                Monney = p.MONNEY,
                                DateStart = p.DATE_START,
                                DateEnd = p.DATE_END,
                                Note = p.NOTE,
                                IsActive = p.IS_ACTIVE,
                                CreateBy = p.CREATE_BY,
                                UpdatedBy = p.UPDATED_BY,
                                CreateDate = p.CREATE_DATE,
                                UpdatedDate = p.UPDATED_DATE
                            };

            var orgIds = await QueryData.ExecuteList("PKG_COMMON.LIST_ORG",
                   new
                   {
                       P_IS_ADMIN = _appContext.IsAdmin == true ? 1 : 0,
                       
                       P_ORG_ID = param.OrgId,
                       P_CURENT_USER_ID = _appContext.CurrentUserId,
                       P_CUR = QueryData.OUT_CURSOR
                   }, false);


            List<int?> ids = orgIds.Select(c => (int?)((dynamic)c).ID).ToList();
            if (param.OrgId != null)
            {
                ids.Add(param.OrgId);
            }
            queryable = queryable.Where(p => ids.Contains(p.OrgId));
            if (!string.IsNullOrWhiteSpace(param.EmployeeCode))
            {
                queryable = queryable.Where(p => p.EmployeeCode.ToUpper().Contains(param.EmployeeCode.ToUpper()));
            }
            if (!string.IsNullOrWhiteSpace(param.EmployeeName))
            {
                queryable = queryable.Where(p => p.EmployeeName.ToUpper().Contains(param.EmployeeName.ToUpper()));
            }
            if (!string.IsNullOrWhiteSpace(param.OrgName))
            {
                queryable = queryable.Where(p => p.OrgName.ToUpper().Contains(param.OrgName.ToUpper()));
            }
            if (!string.IsNullOrWhiteSpace(param.PosName))
            {
                queryable = queryable.Where(p => p.PosName.ToUpper().Contains(param.PosName.ToUpper()));
            }
            if (param.IsActive != null)
            {
                queryable = queryable.Where(p => p.IsActive == param.IsActive);
            }
            if (param.Monney != null)
            {
                queryable = queryable.Where(p => p.Monney == param.Monney);
            }
            if (param.DateStart != null)
            {
                queryable = queryable.Where(p => p.DateStart == param.DateStart);
            }
            if (param.DateEnd != null)
            {
                queryable = queryable.Where(p => p.DateEnd == param.DateEnd);
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
                var r = await (from p in _appContext.AllowanceEmps
                               from a in _appContext.Employees.Where(c => c.ID == p.EMPLOYEE_ID)
                               where p.ID == id 
                               select new
                               {
                                   Id = p.ID,
                                   EmployeeId = p.EMPLOYEE_ID,
                                   EmployeeName = a.CODE + " - " + a.FULLNAME,
                                   AllowanceId = p.ALLOWANCE_ID,
                                   Monney = p.MONNEY,
                                   DateStart = p.DATE_START,
                                   DateEnd = p.DATE_END,
                                   Note = p.NOTE,
                                   IsActive = p.IS_ACTIVE
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
        public async Task<ResultWithError> CreateAsync(AllowanceEmpInputDTO param)
        {
            try
            {
                foreach (var item in param.Emps)
                {
                    var r = _appContext.AllowanceEmps.Where(x => x.EMPLOYEE_ID == item.EmployeeId  && x.ALLOWANCE_ID == param.AllowanceId).FirstOrDefault();
                    if (r != null && (r.DATE_END is null || r.DATE_END >= DateTime.Now))
                    {
                        return new ResultWithError("ALLOWANCE_STILL_EFFECT");
                    }

                    var data = Map<AllowanceEmpInputDTO, AllowanceEmp>(param, new AllowanceEmp());
                    data.EMPLOYEE_ID = item.EmployeeId;
                    data.IS_ACTIVE = true;
                    var result = await _appContext.AllowanceEmps.AddAsync(data);
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
        /// CMS Edit Data
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public async Task<ResultWithError> UpdateAsync(AllowanceEmpInputDTO param)
        {
            try
            {
                var r = _appContext.AllowanceEmps.Where(x => x.ID == param.Id ).FirstOrDefault();
                if (r == null)
                {
                    return new ResultWithError(404);
                }
                var data = Map<AllowanceEmpInputDTO, AllowanceEmp>(param, r);
                var result = _appContext.AllowanceEmps.Update(data);
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
                    var r = _appContext.AllowanceEmps.Where(x => x.ID == item ).FirstOrDefault();
                    if (r == null)
                    {
                        return new ResultWithError(404);
                    }
                    r.IS_ACTIVE = !r.IS_ACTIVE;
                    var result = _appContext.AllowanceEmps.Update(r);
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
        public async Task<ResultWithError> RemoteAsync(List<int> ids)
        {
            try
            {
                foreach (var item in ids)
                {
                    var r = _appContext.AllowanceEmps.Where(x => x.ID == item ).FirstOrDefault();
                    if (r == null)
                    {
                        return new ResultWithError(404);
                    }

                    var result = _appContext.AllowanceEmps.Remove(r);
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
