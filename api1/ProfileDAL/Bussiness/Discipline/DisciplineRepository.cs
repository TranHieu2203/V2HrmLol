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
    public class DisciplineRepository : TLARepository<Discipline>, IDisciplineRepository
    {
        private ProfileDbContext _appContext => (ProfileDbContext)_context;
        public DisciplineRepository(ProfileDbContext context) : base(context)
        {

        }
        /// <summary>
        /// CMS Get All Data
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public async Task<PagedResult<DisciplineDTO>> GetAll(DisciplineDTO param)
        {
            var queryable = from p in _appContext.Disciplines
                            from e in _appContext.Employees.Where(x => x.ID == p.EMPLOYEE_ID).DefaultIfEmpty()
                            from t in _appContext.Positions.Where(x => x.ID == p.POSITION_ID).DefaultIfEmpty()
                            from o in _appContext.Organizations.Where(x => x.ID == e.ORG_ID).DefaultIfEmpty()
                            from f in _appContext.OtherListFixs.Where(x => x.ID == p.STATUS_ID && x.TYPE == SystemConfig.STATUS_APPROVE)
                            from c in _appContext.OtherListFixs.Where(x => x.ID == p.DISCIPLINE_OBJ_ID && x.TYPE == SystemConfig.OBJECT_COMMEND)
                            
                            orderby p.STATUS_ID, p.EFFECT_DATE descending
                            select new DisciplineDTO
                            {
                                Id = p.ID,
                                DisciplineObjName = c.NAME,
                                EmployeeCode = e.CODE,
                                EmployeeName = e.FULLNAME,
                                PositionName = t.NAME,
                                Reason = p.REASON,
                                OrgName = o.NAME,
                                OrgId = e.ORG_ID,
                                No = p.NO,
                                EffectDate = p.EFFECT_DATE,
                                DisciplineType = p.DISCIPLINE_TYPE,
                                Money = p.MONEY,
                                StatusName = f.NAME,
                                StatusId = p.STATUS_ID,
                                CreateBy = p.CREATE_BY,
                                UpdatedBy = p.UPDATED_BY,
                                CreateDate = p.CREATE_DATE,
                                UpdatedDate = p.UPDATED_DATE,
                                WorkStatusId = e.WORK_STATUS_ID
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
            if (!string.IsNullOrWhiteSpace(param.PositionName))
            {
                queryable = queryable.Where(p => p.PositionName.ToUpper().Contains(param.PositionName.ToUpper()));
            }
            if (!string.IsNullOrWhiteSpace(param.OrgName))
            {
                queryable = queryable.Where(p => p.OrgName.ToUpper().Contains(param.OrgName.ToUpper()));
            }
            if (!string.IsNullOrWhiteSpace(param.No))
            {
                queryable = queryable.Where(p => p.No.ToUpper().Contains(param.No.ToUpper()));
            }
            if (!string.IsNullOrWhiteSpace(param.StatusName))
            {
                queryable = queryable.Where(p => p.StatusName.ToUpper().Contains(param.StatusName.ToUpper()));
            }
            if (!string.IsNullOrWhiteSpace(param.DisciplineType))
            {
                queryable = queryable.Where(p => p.DisciplineType.ToUpper().Contains(param.DisciplineType.ToUpper()));
            }

            if (param.EffectDate != null)
            {
                queryable = queryable.Where(p => p.EffectDate == param.EffectDate);
            }
            if (param.WorkStatusId == null || param.WorkStatusId == 0)
            {
                queryable = queryable.Where(p => p.WorkStatusId != OtherConfig.EMP_STATUS_TERMINATE);
            }

            return await PagingList(queryable, param);

        }
        /// <summary>
        /// CMS Get Detail
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>        
        public async Task<ResultWithError> GetById(long id)
        {
            try
            {
                var r = await (from p in _appContext.Disciplines
                               from e in _appContext.Employees.Where(c => c.ID == p.EMPLOYEE_ID).DefaultIfEmpty()
                               from o in _appContext.Organizations.Where(c => c.ID == p.ORG_ID).DefaultIfEmpty()
                               from po in _appContext.Positions.Where(c => c.ID == e.POSITION_ID).DefaultIfEmpty()
                               from ot in _appContext.OtherListFixs.Where(c => c.ID == p.DISCIPLINE_OBJ_ID && c.TYPE == SystemConfig.OBJECT_COMMEND)
                               where p.ID == id 
                               select new
                               {
                                   Id = p.ID,
                                   EffectDate = p.EFFECT_DATE,
                                   No = p.NO,
                                   EmployeeId = p.EMPLOYEE_ID,
                                   EmployeeCode = e.CODE,
                                   EmployeeName = e.FULLNAME,
                                   PositionId = p.POSITION_ID,
                                   PositionName = po.NAME,
                                   OrgId = p.ORG_ID,
                                   OrgName = o.NAME,
                                   SignId = p.SIGN_ID,
                                   SignerName = p.SIGNER_NAME,
                                   SignerPosition = p.SIGNER_POSITION,
                                   SignDate = p.SIGN_DATE,
                                   StatusId = p.STATUS_ID,
                                   DisciplineObjId = p.DISCIPLINE_OBJ_ID,
                                   DisciplineObjCode = ot.CODE,
                                   DisciplineType = p.DISCIPLINE_TYPE,
                                   Money = p.MONEY,
                                   Reason = p.REASON,
                                   Year = p.YEAR,
                                   IsSalary = p.IS_SALARY,
                                   PeriodId = p.PERIOD_ID
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
        public async Task<ResultWithError> CreateAsync(DisciplineInputDTO param)
        {
            try
            {
                var r2 = _appContext.Disciplines.Where(x => x.NO == param.No ).Count();
                if (r2 > 0)
                {
                    return new ResultWithError(Consts.CODE_EXISTS);
                }
                // Gencode
                //var No = "";
                var obj = _appContext.OtherListFixs.Where(c => c.ID == param.DisciplineObjId && c.TYPE == SystemConfig.OBJECT_COMMEND).FirstOrDefault();
                if (obj == null)
                {
                    return new ResultWithError(Message.OBJECT_COMMEND_NOTE_EXIST);
                }
                if (obj.CODE == OtherListConst.OBJECT_ORG)
                {
                    var org = await _appContext.Organizations.Where(c => c.ID == param.OrgId).CountAsync();
                    if (org == 0)
                    {
                        return new ResultWithError(Message.ORG_NOT_EXIST);
                    }
                    param.EmployeeId = null;
                }
                else if (obj.CODE == OtherListConst.OBJECT_EMP)
                {
                    var emp = await _appContext.Employees.Where(c => c.ID == param.EmployeeId).CountAsync();
                    if (emp == 0)
                    {
                        return new ResultWithError(Message.EMP_NOT_EXIST);
                    }
                    param.OrgId = null;
                }

                var data = Map<DisciplineInputDTO, Discipline>(param, new Discipline());
                //data.NO = No;
                var result = await _appContext.Disciplines.AddAsync(data);
                await _appContext.SaveChangesAsync();
                return new ResultWithError(data);
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
        public async Task<ResultWithError> UpdateAsync(DisciplineInputDTO param)
        {
            try
            {
                if (param.StatusId == OtherConfig.STATUS_APPROVE && !_appContext.IsAdmin)
                {
                    return new ResultWithError(Message.RECORD_IS_APPROVED);
                }
                var r = _appContext.Disciplines.Where(x => x.ID == param.Id ).FirstOrDefault();
                if (r == null)
                {
                    return new ResultWithError(404);
                }
                var obj = _appContext.OtherListFixs.Where(c => c.ID == param.DisciplineObjId && c.TYPE == SystemConfig.OBJECT_COMMEND).FirstOrDefault();
                if (obj == null)
                {
                    return new ResultWithError(Message.OBJECT_COMMEND_NOTE_EXIST);
                }
                if (obj.CODE == OtherListConst.OBJECT_ORG)
                {
                    var org = await _appContext.Organizations.Where(c => c.ID == param.OrgId).CountAsync();
                    if (org == 0)
                    {
                        return new ResultWithError(Message.ORG_NOT_EXIST);
                    }
                    param.EmployeeId = null;
                }
                else if (obj.CODE == OtherListConst.OBJECT_EMP)
                {
                    var emp = await _appContext.Employees.Where(c => c.ID == param.EmployeeId).CountAsync();
                    if (emp == 0)
                    {
                        return new ResultWithError(Message.EMP_NOT_EXIST);
                    }
                    param.OrgId = null;
                }
                var data = Map<DisciplineInputDTO, Discipline>(param, r);
                var result = _appContext.Disciplines.Update(data);
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
        public async Task<ResultWithError> RemoveAsync(long id)
        {
            try
            {
                var r = _appContext.Disciplines.Where(x => x.ID == id ).FirstOrDefault();
                if (r == null)
                {
                    return new ResultWithError(404);
                }
                // Kiểm tra xem nếu dữ liệu đang sửa ở trạng thái phê duyệt thì không cho xóa
                if (r.STATUS_ID == OtherConfig.STATUS_APPROVE)
                {
                    return new ResultWithError("RECORD_IS_APPROVED");
                }
                // Remove Master
                _appContext.Disciplines.Remove(r);
                await _appContext.SaveChangesAsync();
                return new ResultWithError(200);
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex.Message);
            }
        }

        public async Task<ResultWithError> OpenStatus(long id)
        {
            try
            {
                var r = _appContext.Disciplines.Where(x => x.ID == id ).FirstOrDefault();
                if (r == null)
                {
                    return new ResultWithError(404);
                }

                // Kiểm tra xem nếu dữ liệu đang sửa ở trạng thái chờ phê duyệt thì không cho mở chờ phê duyệt
                if (r.STATUS_ID == OtherConfig.STATUS_WAITING)
                {
                    return new ResultWithError("RECORD_IS_WAITED");
                }
                r.STATUS_ID = OtherConfig.STATUS_WAITING;
                var result = _appContext.Disciplines.Update(r);
                await _appContext.SaveChangesAsync();
                return new ResultWithError(200);
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex.Message);
            }
        }

        public async Task<ResultWithError> Approve(long id)
        {
            try
            {
                var r = _appContext.Disciplines.Where(x => x.ID == id ).FirstOrDefault();
                if (r == null)
                {
                    return new ResultWithError(404);
                }

                // Kiểm tra xem nếu dữ liệu đang sửa ở trạng thái phê duyệt thì không cho  phê duyệt
                if (r.STATUS_ID == OtherConfig.STATUS_APPROVE)
                {
                    return new ResultWithError("RECORD_IS_APPROVED");
                }
                r.STATUS_ID = OtherConfig.STATUS_APPROVE;
                var result = _appContext.Disciplines.Update(r);
                await _appContext.SaveChangesAsync();
                return new ResultWithError(200);
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex.Message);
            }
        }
        /// <summary>
        /// Portal Get All
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>        
        public async Task<ResultWithError> PortalGetAll()
        {
            try
            {
                var r = await (from p in _appContext.Disciplines
                               where p.EMPLOYEE_ID == _appContext.EmpId
                               orderby p.EFFECT_DATE descending
                               select new
                               {
                                   Id = p.ID,
                                   No = p.NO,
                                   EffectDate = p.EFFECT_DATE
                               }).ToListAsync();
                return new ResultWithError(r);
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex.Message);
            }
        }
        /// <summary>
        /// Portal Get All
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>        
        public async Task<ResultWithError> PortalGetBy(long id)
        {
            try
            {
                var r = await (from p in _appContext.Disciplines
                               where p.EMPLOYEE_ID == _appContext.EmpId && p.ID == id
                               orderby p.EFFECT_DATE descending
                               select new
                               {
                                   No = p.NO,
                                   EffectDate = p.EFFECT_DATE,
                                   DiscripType = p.DISCIPLINE_TYPE,
                                   Reason = p.REASON,
                                   Money = p.MONEY,
                                   SignerName = p.SIGNER_NAME,
                                   SignerPos = p.SIGNER_POSITION,
                                   SignerDate = p.SIGN_DATE,
                                   Year = p.YEAR,
                                   Period = "",
                                   IsSalary = p.IS_SALARY
                               }).FirstOrDefaultAsync();
                return new ResultWithError(r);
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex.Message);
            }
        }
    }
}
