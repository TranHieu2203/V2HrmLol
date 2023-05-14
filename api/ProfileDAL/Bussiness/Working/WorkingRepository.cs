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
using Common.EPPlus;
using Newtonsoft.Json;
using System.Data;

namespace ProfileDAL.Repositories
{
    public class WorkingRepository : TLARepository<Working>, IWorkingRepository
    {
        private ProfileDbContext _appContext => (ProfileDbContext)_context;
        public WorkingRepository(ProfileDbContext context) : base(context)
        {

        }
        /// <summary>
        /// CMS Get All Data
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public async Task<PagedResult<WorkingDTO>> GetAll(WorkingDTO param)
        {
            var queryable = from p in _appContext.Workings
                            join e in _appContext.Employees on p.EMPLOYEE_ID equals e.ID
                            join t in _appContext.Positions on e.POSITION_ID equals t.ID
                            join o in _appContext.Organizations on e.ORG_ID equals o.ID
                            from f in _appContext.OtherListFixs.Where(c => c.ID == p.STATUS_ID && c.TYPE == SystemConfig.STATUS_APPROVE).DefaultIfEmpty()
                            join l in _appContext.OtherLists on p.TYPE_ID equals l.ID
                            from s in _appContext.Employees.Where(c => c.ID == p.SIGN_ID).DefaultIfEmpty()
                            join tl in _appContext.SalaryTypes on p.SALARY_TYPE_ID equals tl.ID
                            orderby p.STATUS_ID, p.EFFECT_DATE descending
                            select new WorkingDTO
                            {
                                Id = p.ID,
                                EmployeeId = p.EMPLOYEE_ID,
                                EmployeeCode = e.CODE,
                                EmployeeName = e.FULLNAME,
                                PositionName = t.NAME,
                                SignDate = p.SIGN_DATE,
                                SignerName = p.SIGNER_NAME,
                                SignerCode = s.CODE,
                                SignerPosition = p.SIGNER_POSITION,
                                OrgName = o.NAME,
                                OrgId = p.ORG_ID,
                                EffectDate = p.EFFECT_DATE,
                                DecisionNo = p.DECISION_NO,
                                StatusId = p.STATUS_ID,
                                StatusName = f.NAME,
                                TypeId = p.TYPE_ID,
                                TypeName = l.NAME,
                                WorkStatusId = e.WORK_STATUS_ID,
                                SalBasic = p.SAL_BASIC,
                                SalTotal = p.SAL_TOTAL,
                                SalPercent = p.SAL_PERCENT,
                                SalaryType = tl.NAME
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
            if (!string.IsNullOrWhiteSpace(param.StatusName))
            {
                queryable = queryable.Where(p => p.StatusName.ToUpper().Contains(param.StatusName.ToUpper()));
            }

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
            if (!string.IsNullOrWhiteSpace(param.DecisionNo))
            {
                queryable = queryable.Where(p => p.DecisionNo.ToUpper().Contains(param.DecisionNo.ToUpper()));
            }
            if (!string.IsNullOrWhiteSpace(param.StatusName))
            {
                queryable = queryable.Where(p => p.StatusName.ToUpper().Contains(param.StatusName.ToUpper()));
            }
            if (!string.IsNullOrWhiteSpace(param.TypeName))
            {
                queryable = queryable.Where(p => p.TypeName.ToUpper().Contains(param.TypeName.ToUpper()));
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
        public async Task<PagedResult<WorkingDTO>> GetWorking(WorkingDTO param)
        {
            var queryable = from p in _appContext.Workings
                            join e in _appContext.Employees on p.EMPLOYEE_ID equals e.ID
                            join f in _appContext.OtherListFixs.Where(c => c.TYPE == SystemConfig.STATUS_APPROVE && c.ID == 2) on p.STATUS_ID equals f.ID
                            orderby p.EFFECT_DATE descending
                            where p.EMPLOYEE_ID == param.EmployeeId
                            select new WorkingDTO
                            {
                                Id = p.ID,
                                EmployeeId = p.EMPLOYEE_ID,
                                EmployeeCode = e.CODE,
                                EmployeeName = e.FULLNAME,
                                SignDate = p.SIGN_DATE,
                                SignerName = p.SIGNER_NAME,
                                SignerPosition = p.SIGNER_POSITION,
                                OrgId = p.ORG_ID,
                                EffectDate = p.EFFECT_DATE,
                                DecisionNo = p.DECISION_NO,
                                StatusName = f.NAME,
                                StatusId = p.STATUS_ID,
                                TypeId = p.TYPE_ID,
                                Note = p.NOTE
                            };



            if (!string.IsNullOrWhiteSpace(param.DecisionNo))
            {
                queryable = queryable.Where(p => p.DecisionNo.ToUpper().Contains(param.DecisionNo.ToUpper()));
            }
            if (!string.IsNullOrWhiteSpace(param.StatusName))
            {
                queryable = queryable.Where(p => p.StatusName.ToUpper().Contains(param.StatusName.ToUpper()));
            }




            return await PagingList(queryable, param);
        }
        /// <summary>
        /// CMS Get Detail
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>        
        public async Task<ResultWithError> GetById(Int64 id)
        {
            try
            {
                var r = await (from p in _appContext.Workings
                               from e in _appContext.Employees.Where(c => c.ID == p.EMPLOYEE_ID)
                               from o in _appContext.Organizations.Where(c => c.ID == p.ORG_ID)
                               from o2 in _appContext.Organizations.Where(c => c.ID == o.PARENT_ID ).DefaultIfEmpty()
                               where p.ID == id
                               select new
                               {
                                   Id = p.ID,
                                   EmployeeId = p.EMPLOYEE_ID,
                                   EmployeeName = e.FULLNAME,
                                   EmployeeCode = e.CODE,
                                   PositionId = p.POSITION_ID,
                                   OrgId = p.ORG_ID,
                                   OrgName = o.NAME,
                                   EffectDate = p.EFFECT_DATE,
                                   DecisionNo = p.DECISION_NO,
                                   TypeId = p.TYPE_ID,
                                   StatusId = p.STATUS_ID,
                                   Note = p.NOTE,
                                   SalaryTypeId = p.SALARY_TYPE_ID,
                                   SalaryScaleId = p.SALARY_SCALE_ID,
                                   SalaryRankId = p.SALARY_RANK_ID,
                                   SalaryLevelId = p.SALARY_LEVEL_ID,
                                   SalBasic = p.SAL_BASIC,
                                   SalTotal = p.SAL_TOTAL,
                                   SalPercent = p.SAL_PERCENT,
                                   SignId = p.SIGN_ID,
                                   SignerName = p.SIGNER_NAME,
                                   SignerPosition = p.SIGNER_POSITION,
                                   SignDate = p.SIGN_DATE,
                                   Coefficient = p.COEFFICIENT,
                                   orgParentName = o2.NAME
                               }).FirstOrDefaultAsync();
                return new ResultWithError(r);
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex.Message);
            }
        }
        /// <summary>
        /// Get last working by employee.lastWorkingId
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>        
        public async Task<ResultWithError> GetLastWorking(long Id)
        {
            try
            {
                var r = await (from p in _appContext.Workings
                               from t in _appContext.SalaryTypes.Where(c => c.ID == p.SALARY_TYPE_ID).DefaultIfEmpty()
                               from s in _appContext.SalaryScales.Where(c => c.ID == p.SALARY_SCALE_ID).DefaultIfEmpty()
                               from ra in _appContext.SalaryRanks.Where(c => c.ID == p.SALARY_RANK_ID).DefaultIfEmpty()
                               from l in _appContext.SalaryLevels.Where(c => c.ID == p.SALARY_LEVEL_ID).DefaultIfEmpty()
                               where p.ID == Id 
                               select new
                               {
                                   Id = p.ID,
                                   StatusId = p.STATUS_ID,
                                   WorkingNo = p.DECISION_NO,
                                   SalaryTypeId = p.SALARY_TYPE_ID,
                                   SalaryTypeName = t.NAME,
                                   SalaryScaleId = p.SALARY_SCALE_ID,
                                   SalaryScaleName = s.NAME,
                                   SalaryRankId = p.SALARY_RANK_ID,
                                   SalaryRankName = ra.NAME,
                                   SalaryLevelId = p.SALARY_LEVEL_ID,
                                   SalaryLevelName = l.NAME,
                                   SalBasic = p.SAL_BASIC,
                                   SalTotal = p.SAL_TOTAL,
                                   SalPercent = p.SAL_PERCENT,
                                   SignId = p.SIGN_ID,
                                   SignerName = p.SIGNER_NAME,
                                   SignerPosition = p.SIGNER_POSITION,
                                   SignDate = p.SIGN_DATE,
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
        public async Task<ResultWithError> CreateAsync(WorkingInputDTO param)
        {
            try
            {

                var r2 = _appContext.Workings.Where(x => x.DECISION_NO == param.DecisionNo ).Count();
                if (r2 > 0)
                {
                    return new ResultWithError(Consts.CODE_EXISTS);
                }
                // Kiểm tra xem có QĐ nào có ngày hiệu lực lớn hơn ngày QĐ đang làm (chỉ tính các quyết định đã phê duyệt)
                var r = await _appContext.Workings.Where(x => x.EMPLOYEE_ID == param.EmployeeId && x.STATUS_ID == OtherConfig.STATUS_APPROVE).OrderByDescending(f => f.EFFECT_DATE).FirstOrDefaultAsync();
                if (r != null)
                {
                    if (r.EFFECT_DATE > param.EffectDate)
                    {
                        return new ResultWithError("EFFECTDATE_NOT_LESS_CURRENT");
                    }
                    //Check thay đổi lương
                    if (r.SAL_BASIC != param.SalBasic || r.SAL_TOTAL != param.SalTotal || r.SAL_PERCENT != param.SalPercent)
                    {
                        r.IS_CHANGE_SAL = true;
                    }
                }


                // Gencode
                //var DecisionCode = "";
                var data = Map<WorkingInputDTO, Working>(param, new Working());
                //data.DECISION_NO = DecisionCode;
                await _appContext.Database.BeginTransactionAsync();
                var result = await _appContext.Workings.AddAsync(data);
                await _appContext.SaveChangesAsync();
                if (data.STATUS_ID == OtherConfig.STATUS_APPROVE)
                {
                    var e = _appContext.Employees.Where(x => x.ID == param.EmployeeId).FirstOrDefault();
                    if (e == null)
                    {
                        return new ResultWithError("EMPLOYEE_NOT_FOUND");
                    }

                    e.ORG_ID = data.ORG_ID;
                    e.POSITION_ID = data.POSITION_ID;
                    e.LAST_WORKING_ID = data.ID;
                    e.SALARY_TYPE_ID = data.SALARY_TYPE_ID;
                    e.SAL_TOTAL = data.SAL_TOTAL;
                    e.SAL_BASIC = data.SAL_BASIC;
                    e.SAL_RATE = data.SAL_PERCENT;
                    e.EFFECT_DATE = data.EFFECT_DATE;
                    if (e.JOIN_DATE == null)
                    {
                        e.JOIN_DATE = param.EffectDate;
                    }
                    _appContext.Employees.Update(e);
                    await _appContext.SaveChangesAsync();
                }

                _appContext.Database.CommitTransaction();
                return new ResultWithError(data);
            }
            catch (Exception ex)
            {
                _appContext.Database.RollbackTransaction();
                return new ResultWithError(ex);
            }
        }
        /// <summary>
        /// CMS Edit Data
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public async Task<ResultWithError> UpdateAsync(WorkingInputDTO param)
        {
            try
            {

                // Kiểm tra xem có QĐ nào có ngày hiệu lực lớn hơn ngày QĐ đang làm (chỉ tính các quyết định đã phê duyệt)
                var c = await _appContext.Workings.Where(x => x.EMPLOYEE_ID == param.EmployeeId && x.ID != param.Id  && x.EFFECT_DATE > param.EffectDate && x.STATUS_ID == OtherConfig.STATUS_APPROVE).CountAsync();
                if (c > 0)
                {
                    return new ResultWithError("EFFECTDATE_NOT_LESS_CURRENT");
                }

                var r = _appContext.Workings.Where(x => x.ID == param.Id ).FirstOrDefault();
                if (r == null)
                {
                    return new ResultWithError(404);
                }
                // Kiểm tra xem nếu dữ liệu đang sửa ở trạng thái phê duyệt thì không cho sửa
                if (r.STATUS_ID == OtherConfig.STATUS_APPROVE && !_appContext.IsAdmin)
                {
                    return new ResultWithError(Message.RECORD_IS_APPROVED);
                }
                //param.DecisionNo = null;
                var data = Map<WorkingInputDTO, Working>(param, r);

                var result = _appContext.Workings.Update(data);
                // Nếu là trạng thái đã phê duyệt thì cập nhật thông tin mới nhất vào Employee
                if (data.STATUS_ID == OtherConfig.STATUS_APPROVE)
                {
                    var e = _appContext.Employees.Where(x => x.ID == param.EmployeeId).FirstOrDefault();
                    if (e == null)
                    {
                        return new ResultWithError(Message.EMP_NOT_EXIST);
                    }
                    e.ORG_ID = data.ORG_ID;
                    e.POSITION_ID = data.POSITION_ID;
                    e.LAST_WORKING_ID = param.Id;
                    e.SALARY_TYPE_ID = data.SALARY_TYPE_ID;
                    e.SAL_TOTAL = data.SAL_TOTAL;
                    e.SAL_BASIC = data.SAL_BASIC;
                    e.SAL_RATE = data.SAL_PERCENT;
                    e.EFFECT_DATE = data.EFFECT_DATE;
                    if (e.JOIN_DATE == null)
                    {
                        e.JOIN_DATE = param.EffectDate;
                    }
                    _appContext.Employees.Update(e);
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
        public async Task<ResultWithError> RemoveAsync(List<long> param)
        {
            try
            {
                await _appContext.Database.BeginTransactionAsync();
                foreach (var item in param)
                {
                    var r = await _appContext.Workings.Where(x => x.ID == item).FirstOrDefaultAsync();
                    if (r == null)
                    {
                        return new ResultWithError(404);
                    }
                    // Kiểm tra xem nếu dữ liệu đang sửa ở trạng thái phê duyệt thì không cho xóa
                    if (r.STATUS_ID == OtherConfig.STATUS_APPROVE)
                    {
                        return new ResultWithError("RECORD_IS_APPROVED");
                    }
                    _appContext.Workings.Remove(r);
                }
                await _appContext.SaveChangesAsync();
                _appContext.Database.CommitTransaction();
                return new ResultWithError(200);
            }
            catch (Exception ex)
            {
                _appContext.Database.RollbackTransaction();
                return new ResultWithError(ex.Message);
            }
        }
        public async Task<ResultWithError> OpenStatus(long id)
        {
            try
            {
                var r = _appContext.Workings.Where(x => x.ID == id).FirstOrDefault();
                if (r == null)
                {
                    return new ResultWithError(404);
                }
                // Kiểm tra xem QĐ mở chờ phê duyệt có phải là quyết định cuối cùng không
                var c = await _appContext.Workings.Where(x => x.EMPLOYEE_ID == r.EMPLOYEE_ID && x.ID != id && x.EFFECT_DATE > r.EFFECT_DATE && x.STATUS_ID == OtherConfig.STATUS_APPROVE).CountAsync();
                if (c > 0)
                {
                    return new ResultWithError("EFFECTDATE_NOT_LESS_CURRENT");
                }
                // Kiểm tra xem nếu dữ liệu đang sửa ở trạng thái chờ phê duyệt thì không cho mở chờ phê duyệt
                if (r.STATUS_ID == OtherConfig.STATUS_WAITING)
                {
                    return new ResultWithError("RECORD_IS_WAITED");
                }
                r.STATUS_ID = OtherConfig.STATUS_WAITING;
                var result = _appContext.Workings.Update(r);
                await _appContext.SaveChangesAsync();
                return new ResultWithError(200);
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex.Message);
            }
        }
        public async Task<ResultWithError> TemplateImport(int orgId)
        {
            try
            {
                // xử lý fill dữ liệu vào master data
                var ds = QueryData.ExecuteStoreToTable("PKG_IMPORT.DECISION_DATA_IMPORT",
                new
                {
                    P_ORG_ID = orgId,
                    P_CUR_ORG = QueryData.OUT_CURSOR,
                    P_CUR_POS = QueryData.OUT_CURSOR,
                    P_CUR_LVL = QueryData.OUT_CURSOR,
                    P_CUR_SAL_TYPE = QueryData.OUT_CURSOR,
                    P_CUR_STATUS = QueryData.OUT_CURSOR,
                    P_CUR_DECISION = QueryData.OUT_CURSOR,
                    P_CUR = QueryData.OUT_CURSOR
                }, true);

                if (ds.Tables[0].Rows.Count <= 0)
                {
                    return new ResultWithError("DATA_EMPTY");
                }
                ds.Tables[0].TableName = "Org";
                ds.Tables[1].TableName = "Pos";
                ds.Tables[2].TableName = "Lvl";
                ds.Tables[3].TableName = "SalType";
                ds.Tables[4].TableName = "Status";
                ds.Tables[5].TableName = "Decision";
                ds.Tables[6].TableName = "Data";
                var pathTemp = _appContext._config["urlTempDecision"];
                var memoryStream = Template.FillTemplate(pathTemp, ds);
                return new ResultWithError(memoryStream);
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex.Message);
            }
        }
      
        /// <summary>
        /// Import Data
        /// </summary>
        /// <param name="ids"></param>
        /// <returns></returns>
        public async Task<ResultWithError> ImportTemplate(ImportParam param)
        {
            try
            {
                param.Data.RemoveRange(0, 2);
                if (param.Data.Count == 0)
                {
                    return new ResultWithError(404);
                }
                var lst = new List<WorkingTmp>();
                var guid = Guid.NewGuid().ToString();
                var error = false;
                var lstError = new List<ImportDtlParam>();
                foreach (var item in param.Data)
                {
                    var dtl = new WorkingTmp();
                    if (string.IsNullOrWhiteSpace(item.OrgId))
                    {
                        error = true;
                        item.OrgId = "!Không được để trống";
                    }
                    else
                    {
                        var org = item.OrgId.Split("-");
                        try
                        {
                            dtl.ORG_ID = int.Parse(org[0]);
                        }
                        catch
                        {
                            error = true;
                            item.OrgId = "!Phòng ban không tồn tại";
                        }
                    }

                    try
                    {
                        dtl.EFFECT_DATE = DateTime.ParseExact(item.EffectDate.Trim(), "dd/MM/yyyy", System.Globalization.CultureInfo.InvariantCulture);
                    }
                    catch
                    {
                        error = true;
                        item.EffectDate = "!Không đúng định dạng dd/MM/yyyy";
                    }
                    if (!string.IsNullOrWhiteSpace(item.SalaryLevelId))
                    {
                        try
                        {
                            var salType = item.SalaryLevelId.Trim().Split("-");
                            dtl.SALARY_LEVEL_ID = int.Parse(salType[0]);
                        }
                        catch
                        {
                            error = true;
                            item.SalaryLevelId = "!Bậc lương không tồn tại";
                        }
                    }
                    if (!string.IsNullOrWhiteSpace(item.SignDate))
                    {
                        try
                        {
                            dtl.SIGN_DATE = DateTime.ParseExact(item.SignDate.Trim(), "dd/MM/yyyy", System.Globalization.CultureInfo.InvariantCulture);
                        }
                        catch
                        {
                            error = true;
                            item.SignDate = "!Không đúng định dạng dd/MM/yyyy";
                        }
                    }
                    if (string.IsNullOrWhiteSpace(item.SalaryBasic))
                    {
                        error = true;
                        item.SalaryBasic = "!Không được để trống";
                    }
                    else
                    {
                        try
                        {
                            dtl.SAL_BASIC = decimal.Parse(item.SalaryBasic);
                        }
                        catch
                        {

                            error = true;
                            item.SalaryBasic = "!Sai định dạng kiểu số";
                        }
                    }
                    //if (!string.IsNullOrWhiteSpace(item.Coefficient))
                    //{
                    //    try
                    //    {
                    //        dtl.COEFFICIENT = decimal.Parse(item.Coefficient);
                    //    }
                    //    catch
                    //    {

                    //        error = true;
                    //        item.Coefficient = "!Sai định dạng kiểu số";
                    //    }
                    //}
                    if (string.IsNullOrWhiteSpace(item.SalaryTotal))
                    {
                        error = true;
                        item.SalaryTotal = "!Không được để trống";
                    }
                    else
                    {
                        try
                        {
                            dtl.SAL_TOTAL = decimal.Parse(item.SalaryTotal);
                        }
                        catch
                        {

                            error = true;
                            item.SalaryTotal = "!Sai định dạng kiểu số";
                        }
                    }
                    if (string.IsNullOrWhiteSpace(item.SalaryPercent))
                    {
                        error = true;
                        item.SalaryPercent = "!Không được để trống";
                    }
                    else
                    {
                        try
                        {
                            dtl.SAL_PERCENT = decimal.Parse(item.SalaryPercent);
                        }
                        catch
                        {
                            error = true;
                            item.SalaryPercent = "!Sai định dạng kiểu số";
                        }
                    }
                    if (error)
                    {
                        error = false;
                        lstError.Add(item);
                    }
                    else
                    {
                        dtl.REF_CODE = guid;
                        dtl.CODE = item.Code;
                        dtl.POS_NAME = item.PosName;
                        dtl.DECISION_NO = item.DecisionNo;
                        dtl.TYPE_NAME = item.TypeName;
                        dtl.SALARY_TYPE_NAME = item.SalaryTypeName;
                        dtl.STATUS_NAME = item.StatusName;
                        dtl.SIGNER_NAME = item.SignName;
                        dtl.SIGNER_POSITION = item.SignPosition;
                        lst.Add(dtl);
                    }
                }

                if (lstError.Count > 0)
                {
                    var pathTemp = _appContext._config["urlTempDecision"];
                    var memoryStream = Template.FillTemp<ImportDtlParam>(pathTemp, lstError);
                    return new ResultWithError(memoryStream);
                }
                else
                {
                    if (lst.Count > 0)
                    {
                        await _appContext.WorkingTmps.AddRangeAsync(lst);
                        await _appContext.SaveChangesAsync();
                        // xử lý fill dữ liệu vào master data
                        var ds = QueryData.ExecuteStoreToTable("PKG_IMPORT.DECISION_IMPORT",
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
                    }
                }
                return new ResultWithError(200);
            }
            catch (Exception ex)
            {
                return new ResultWithError(204);
                // throw ex;
            }
        }

        /// <summary>
        /// Portal
        /// </summary>
        /// <param name="ids"></param>
        /// <returns></returns>
        public async Task<ResultWithError> PortalGetAll()
        {
            try
            {
                var r = await (from p in _appContext.Workings
                               join o in _appContext.OtherLists on p.TYPE_ID equals o.ID
                               where p.EMPLOYEE_ID == _appContext.EmpId  && p.STATUS_ID == OtherConfig.STATUS_APPROVE
                               orderby p.EFFECT_DATE descending
                               select new
                               {
                                   id = p.ID,
                                   No = p.DECISION_NO,
                                   EffectDate = p.EFFECT_DATE,
                                   TypeName = o.NAME
                               }).ToListAsync();
                return new ResultWithError(r);
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex.Message);
            }
        }

        /// <summary>
        /// Portal
        /// </summary>
        /// <param name="ids"></param>
        /// <returns></returns>
        public async Task<ResultWithError> PortalGetBy(long id)
        {
            try
            {
                var r = await (from p in _appContext.Workings
                               join o in _appContext.OtherLists on p.TYPE_ID equals o.ID
                               join b in _appContext.Organizations on p.ORG_ID equals b.ID
                               join t in _appContext.Positions on p.POSITION_ID equals t.ID
                               from s in _appContext.SalaryScales.Where(x => x.ID == p.SALARY_SCALE_ID).DefaultIfEmpty()
                               from n in _appContext.SalaryRanks.Where(x => x.ID == p.SALARY_RANK_ID).DefaultIfEmpty()
                               from l in _appContext.SalaryLevels.Where(x => x.ID == p.SALARY_LEVEL_ID).DefaultIfEmpty()
                               where p.EMPLOYEE_ID == _appContext.EmpId && p.ID == id
                               select new
                               {
                                   No = p.DECISION_NO,
                                   EffectDate = p.EFFECT_DATE,
                                   TypeName = o.NAME,
                                   OrgName = b.NAME,
                                   PosName = t.NAME,
                                   ScaleName = s.NAME,
                                   RankName = n.NAME,
                                   LevelName = l.NAME,
                                   SalBasic = p.SAL_BASIC,
                                   SalTotal = p.SAL_TOTAL,
                                   SalPercent = p.SAL_PERCENT,
                                   SignName = p.SIGNER_NAME,
                                   SignPos = p.SIGNER_POSITION,
                                   SignDate = p.SIGN_DATE
                               }).ToListAsync();
                return new ResultWithError(r);
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex.Message);
            }
        }
    }
}
