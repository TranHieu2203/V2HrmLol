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

namespace ProfileDAL.Repositories
{
    public class ContractRepository : TLARepository<Contract>, IContractRepository
    {
        private ProfileDbContext _appContext => (ProfileDbContext)_context;
        public ContractRepository(ProfileDbContext context) : base(context)
        {

        }
        /// <summary>
        /// CMS Get All Data
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public async Task<PagedResult<ContractDTO>> GetAll(ContractDTO param)
        {
            var queryable = from p in _appContext.Contracts
                            join e in _appContext.Employees on p.EMPLOYEE_ID equals e.ID
                            join o in _appContext.Organizations on e.ORG_ID equals o.ID
                            from f in _appContext.OtherListFixs.Where(c => c.ID == p.STATUS_ID && c.TYPE == SystemConfig.STATUS_APPROVE).DefaultIfEmpty()
                            join l in _appContext.ContractTypes on p.CONTRACT_TYPE_ID equals l.ID
                            
                            orderby p.STATUS_ID, p.START_DATE descending
                            select new ContractDTO
                            {
                                Id = p.ID,
                                EmployeeId = p.EMPLOYEE_ID,
                                EmployeeCode = e.CODE,
                                EmployeeName = e.FULLNAME,
                                OrgName = o.NAME,
                                OrgId = e.ORG_ID,
                                StartDate = p.START_DATE,
                                ExpireDate = p.EXPIRE_DATE,
                                ContractNo = p.CONTRACT_NO,
                                SignerName = p.SIGNER_NAME,
                                SignerPosition = p.SIGNER_POSITION,
                                SignDate = p.SIGN_DATE,
                                StatusName = f.NAME,
                                WorkStatusId = e.WORK_STATUS_ID,
                                StatusId = p.STATUS_ID,
                                ContractTypeName = l.NAME
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
            if (!string.IsNullOrWhiteSpace(param.ContractNo))
            {
                queryable = queryable.Where(p => p.ContractNo.ToUpper().Contains(param.ContractNo.ToUpper()));
            }
            if (!string.IsNullOrWhiteSpace(param.StatusName))
            {
                queryable = queryable.Where(p => p.StatusName.ToUpper().Contains(param.StatusName.ToUpper()));
            }
            if (!string.IsNullOrWhiteSpace(param.ContractTypeName))
            {
                queryable = queryable.Where(p => p.ContractTypeName.ToUpper().Contains(param.ContractTypeName.ToUpper()));
            }

            if (param.StartDate != null)
            {
                queryable = queryable.Where(p => p.StartDate == param.StartDate);
            }
            if (param.ExpireDate != null)
            {
                queryable = queryable.Where(p => p.ExpireDate == param.ExpireDate);
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
                var n = await (from p in _appContext.Contracts
                               join e in _appContext.Employees on p.EMPLOYEE_ID equals e.ID
                               join o in _appContext.Organizations on e.ORG_ID equals o.ID
                               join o2 in _appContext.Organizations on o.PARENT_ID equals o2.ID into tmp1
                               from o3 in tmp1.DefaultIfEmpty()
                               join t in _appContext.Positions on e.POSITION_ID equals t.ID into tmp2
                               from t1 in tmp2.DefaultIfEmpty()
                               join w in _appContext.Workings on p.WORKING_ID equals w.ID into tmp5
                               from w1 in tmp5.DefaultIfEmpty()                              
                               where p.ID == id 
                               select new
                               {
                                   Id = p.ID,
                                   EmployeeId = p.EMPLOYEE_ID,
                                   EmployeeName = e.FULLNAME,
                                   EmployeeCode = e.CODE,
                                   PositionName = t1.NAME,
                                   OrgId = e.ORG_ID,
                                   OrgName = o.NAME,
                                   OrgParentName = o3.NAME,
                                   StartDate = p.START_DATE,
                                   ExpireDate = p.EXPIRE_DATE,
                                   ContractNo = p.CONTRACT_NO,
                                   ContractTypeId = p.CONTRACT_TYPE_ID,
                                   StatusId = p.STATUS_ID,
                                   SignId = p.SIGN_ID,
                                   SignerName = p.SIGNER_NAME,
                                   SignerPosition = p.SIGNER_POSITION,
                                   SignDate = p.SIGN_DATE,
                                   WorkingId = p.WORKING_ID,
                                   WorkingNo = w1.DECISION_NO,
                                   //SalaryScaleName = s2.NAME,
                                   //SalaryRankName = r2.NAME,
                                   //SalaryLevelName = l2.NAME,
                                   //SalaryTypeName = tb.NAME,
                                   SalBasic = w1.SAL_BASIC,
                                   SalPercent = w1.SAL_PERCENT,
                                   salTotal = w1.SAL_TOTAL,
                                   Note = p.NOTE
                               }).FirstOrDefaultAsync();
                return new ResultWithError(n);
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
        public async Task<ResultWithError> CreateAsync(ContractInputDTO param)
        {
            try
            {
                // Kiểm tra xem ngày bắt đầu HĐ mới có lớn hơn ngày kết thúc của HĐ gần nhất không
                var r = await _appContext.Contracts.Where(x => x.EMPLOYEE_ID == param.EmployeeId  && x.EXPIRE_DATE >= param.StartDate && x.STATUS_ID == OtherConfig.STATUS_APPROVE).CountAsync();
                if (r > 0)
                {
                    return new ResultWithError("STARTDATE_NOT_LESS_CURRENT");
                }
                // Gencode
                //var ContractNo = "";
                var data = Map<ContractInputDTO, Contract>(param, new Contract());
                //data.CONTRACT_NO = ContractNo;

                await _appContext.Database.BeginTransactionAsync();
                var result = await _appContext.Contracts.AddAsync(data);
                await _appContext.SaveChangesAsync();

                // update lai contract id cho nhan vien
                if (data.STATUS_ID == OtherConfig.STATUS_APPROVE)
                {
                    var e = _appContext.Employees.Where(x => x.ID == param.EmployeeId ).FirstOrDefault();
                    if (e == null)
                    {
                        return new ResultWithError(Message.EMP_NOT_EXIST);
                    }
                    e.CONTRACT_ID = data.ID;
                    e.CONTRACT_TYPE_ID = data.CONTRACT_TYPE_ID;
                    e.CONTRACT_EXPIRED = param.ExpireDate;
                    _appContext.Employees.Update(e);
                    await _appContext.SaveChangesAsync();
                    await QueryData.Execute("PKG_ENTITLEMENT.CREATE_BY_CONTRACT", new { P_START_DATE = param.StartDate, P_EMP_ID = param.EmployeeId, P_CONTRACT_TYPE = param.ContractTypeId }, true);
                }
                _appContext.Database.CommitTransaction();

                return new ResultWithError(200);
            }
            catch (Exception ex)
            {
                _appContext.Database.RollbackTransaction();
                return new ResultWithError(ex.Message);
            }
        }

        /// <summary>
        /// CMS Edit Data
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public async Task<ResultWithError> UpdateAsync(ContractInputDTO param)
        {
            try
            {
                // Kiểm tra xem ngày bắt đầu HĐ mới có lớn hơn ngày kết thúc của HĐ gần nhất không
                var c = await _appContext.Contracts.Where(x => x.EMPLOYEE_ID == param.EmployeeId && x.ID != param.Id  && x.EXPIRE_DATE >= param.StartDate && x.STATUS_ID == OtherConfig.STATUS_APPROVE).CountAsync();
                if (c > 0)
                {
                    return new ResultWithError("EFFECTDATE_NOT_LESS_CURRENT");
                }

                var r = _appContext.Contracts.Where(x => x.ID == param.Id ).FirstOrDefault();
                if (r == null)
                {
                    return new ResultWithError(404);
                }
                // Kiểm tra xem nếu dữ liệu đang sửa ở trạng thái phê duyệt thì không cho sửa
                if (r.STATUS_ID == OtherConfig.STATUS_APPROVE && !_appContext.IsAdmin)
                {
                    return new ResultWithError(Message.RECORD_IS_APPROVED);
                }
                var data = Map<ContractInputDTO, Contract>(param, r);
                var result = _appContext.Contracts.Update(data);
                // Nếu là trạng thái đã phê duyệt thì cập nhật thông tin mới nhất vào Employee
                if (data.STATUS_ID == OtherConfig.STATUS_APPROVE)
                {
                    var e = _appContext.Employees.Where(x => x.ID == param.EmployeeId ).FirstOrDefault();
                    if (e == null)
                    {
                        return new ResultWithError(Message.EMP_NOT_EXIST);
                    }
                    e.CONTRACT_ID = param.Id;
                    e.CONTRACT_TYPE_ID = data.CONTRACT_TYPE_ID;
                    _appContext.Employees.Update(e);
                    await QueryData.Execute("PKG_ENTITLEMENT.CREATE_BY_CONTRACT", new { P_START_DATE = param.StartDate, P_EMP_ID = param.EmployeeId, P_CONTRACT_TYPE = param.ContractTypeId }, true);
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
                    var r = _appContext.Contracts.Where(x => x.ID == item ).FirstOrDefault();
                    if (r == null)
                    {
                        return new ResultWithError(404);
                    }
                    // Kiểm tra xem nếu dữ liệu đang sửa ở trạng thái phê duyệt thì không cho xóa
                    if (r.STATUS_ID == OtherConfig.STATUS_APPROVE)
                    {
                        return new ResultWithError("RECORD_IS_APPROVED");
                    }
                    _appContext.Contracts.Remove(r);
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
                var r = _appContext.Contracts.Where(x => x.ID == id ).FirstOrDefault();
                if (r == null)
                {
                    return new ResultWithError(404);
                }
                // Kiểm tra xem HĐ mở chờ phê duyệt có phải là hđ cuối cùng không
                var c = await _appContext.Contracts.Where(x => x.EMPLOYEE_ID == r.EMPLOYEE_ID && x.ID != id  && x.EXPIRE_DATE > r.START_DATE && x.STATUS_ID == OtherConfig.STATUS_APPROVE).CountAsync();
                if (c > 0)
                {
                    return new ResultWithError("CONTRACT_NOT_LASTEST");
                }
                // Kiểm tra xem nếu dữ liệu đang sửa ở trạng thái chờ phê duyệt thì không cho mở chờ phê duyệt
                if (r.STATUS_ID == OtherConfig.STATUS_WAITING)
                {
                    return new ResultWithError("RECORD_IS_WAITED");
                }
                r.STATUS_ID = OtherConfig.STATUS_WAITING;
                var result = _appContext.Contracts.Update(r);
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
                var ds = QueryData.ExecuteStoreToTable("PKG_IMPORT.CONTRACT_DATA_IMPORT",
                new
                {
                    P_ORG_ID = orgId,
                    P_CUR_STATUS = QueryData.OUT_CURSOR,
                    P_CUR_CONTRACT = QueryData.OUT_CURSOR,
                    P_CUR = QueryData.OUT_CURSOR
                }, true);

                if (ds.Tables[0].Rows.Count <= 0)
                {
                    return new ResultWithError("DATA_EMPTY");
                }
                ds.Tables[0].TableName = "Status";
                ds.Tables[1].TableName = "Contract";
                ds.Tables[2].TableName = "Data";
                var pathTemp = _appContext._config["urlTempContract"];
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
        public async Task<ResultWithError> ImportTemplate(ImportCTractParam param)
        {
            try
            {
                param.Data.RemoveRange(0, 2);
                if (param.Data.Count == 0)
                {
                    return new ResultWithError(404);
                }
                var lst = new List<ContractTmp>();
                var guid = Guid.NewGuid().ToString();
                var error = false;
                var lstError = new List<ImportCTractDtlParam>();
                foreach (var item in param.Data)
                {
                    var dtl = new ContractTmp();
                    if (string.IsNullOrWhiteSpace(item.TypeName))
                    {
                        error = true;
                        item.TypeName = "!Không được để trống";
                    }
                    if (string.IsNullOrWhiteSpace(item.ContractNo))
                    {
                        error = true;
                        item.ContractNo = "!Không được để trống";
                    }
                    try
                    {
                        
                        dtl.DATE_START = DateTime.ParseExact(item.DateStart.Trim(), "dd/MM/yyyy", System.Globalization.CultureInfo.InvariantCulture);
                    }
                    catch
                    {
                        error = true;
                        item.DateStart = "!Không đúng định dạng dd/MM/yyyy";
                    }
                    try
                    {
                        if (!string.IsNullOrWhiteSpace(item.DateEnd))
                        {
                            dtl.DATE_END = DateTime.ParseExact(item.DateEnd.Trim(), "dd/MM/yyyy", System.Globalization.CultureInfo.InvariantCulture);
                        }
                    }
                    catch
                    {
                        error = true;
                        item.DateEnd = "!Không đúng định dạng dd/MM/yyyy";
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
                    if (string.IsNullOrWhiteSpace(item.StatusName))
                    {
                        error = true;
                        item.StatusName = "!Không được để trống";
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
                        dtl.CONTRACT_NO = item.ContractNo;
                        dtl.CONTRACT_TYPE_NAME = item.TypeName.Trim();
                        dtl.STATUS_NAME = item.StatusName.Trim();
                        if (item.SignName!= null)
                        {
                            dtl.SIGNER_NAME = item.SignName.Trim();
                        }
                        if (item.SignPosition != null)
                        {
                            dtl.SIGNER_POSITION = item.SignPosition.Trim();
                        }
                        lst.Add(dtl);
                    }
                }

                if (lstError.Count > 0)
                {
                    var pathTemp = _appContext._config["urlTempContract"];
                    var memoryStream = Template.FillTemp<ImportCTractDtlParam>(pathTemp, lstError);
                    return new ResultWithError(memoryStream);
                }
                else
                {
                    if (lst.Count > 0)
                    {
                        await _appContext.ContractTmps.AddRangeAsync(lst);
                        await _appContext.SaveChangesAsync();
                        // xử lý fill dữ liệu vào master data
                        var ds = QueryData.ExecuteStoreToTable("PKG_IMPORT.CONTRACT_IMPORT",
                        new
                        {
                            P_REF_CODE = guid,
                            P_CUR = QueryData.OUT_CURSOR
                        }, true);
                        
                        if (ds.Tables.Count > 0)
                        {
                            ds.Tables[0].TableName = "Data";
                            var pathTemp = _appContext._config["urlTempContract"];
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
                var r = await (from p in _appContext.Contracts
                               join o in _appContext.ContractTypes on p.CONTRACT_TYPE_ID equals o.ID
                               where p.EMPLOYEE_ID == _appContext.EmpId  && p.STATUS_ID == OtherConfig.STATUS_APPROVE
                               orderby p.START_DATE descending
                               select new
                               {
                                   Id = p.ID,
                                   No = p.CONTRACT_NO,
                                   StartDate = p.START_DATE,
                                   EndDate = p.EXPIRE_DATE,
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
                var r = await (from p in _appContext.Contracts
                               join o in _appContext.ContractTypes on p.CONTRACT_TYPE_ID equals o.ID
                               where p.EMPLOYEE_ID == _appContext.EmpId  && p.ID == id
                               select new
                               {
                                   No = p.CONTRACT_NO,
                                   TypeName = o.NAME,
                                   StartDate = p.START_DATE,
                                   EndDate = p.EXPIRE_DATE,
                                   SignName = p.SIGNER_NAME,
                                   SignPos = p.SIGNER_POSITION,
                                   SignDate = p.SIGN_DATE,
                                   SalBasic = p.SAL_BASIC,
                                   SalPercent = p.SAL_PERCENT
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
