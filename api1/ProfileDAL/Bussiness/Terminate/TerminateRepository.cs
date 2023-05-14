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
    public class TerminateRepository : TLARepository<Terminate>, ITerminateRepository
    {
        private ProfileDbContext _appContext => (ProfileDbContext)_context;
        public TerminateRepository(ProfileDbContext context) : base(context)
        {

        }
        /// <summary>
        /// CMS Get All Data
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public async Task<PagedResult<TerminateView>> GetAll(TerminateDTO param)
        {
            var queryable = from p in _appContext.Terminates
                            join e in _appContext.Employees on p.EMPLOYEE_ID equals e.ID
                            join t in _appContext.Positions on e.POSITION_ID equals t.ID
                            join o in _appContext.Organizations on e.ORG_ID equals o.ID
                            join c in _appContext.Contracts on e.CONTRACT_ID equals c.ID into tmp
                            from ct in tmp.DefaultIfEmpty()
                            join f in _appContext.OtherListFixs.Where(c => c.TYPE == SystemConfig.STATUS_APPROVE) on p.STATUS_ID equals f.ID
                            
                            orderby p.STATUS_ID, p.EFFECT_DATE descending
                            select new TerminateView
                            {
                                Id = p.ID,
                                EmployeeCode = e.CODE,
                                EmployeeName = e.FULLNAME,
                                DecisionNo = p.DECISION_NO,
                                OrgId = e.ORG_ID,
                                OrgName = o.NAME,
                                ContractNo = ct.CONTRACT_NO,
                                EffectDate = p.EFFECT_DATE,
                                DateEnd = ct.EXPIRE_DATE,
                                DateStart = ct.START_DATE,
                                TerReason = p.TER_REASON,
                                SignerName = p.SIGNER_NAME,
                                SignerPosition = p.SIGNER_POSITION,
                                SignDate = p.SIGN_DATE,
                                StatusId = p.STATUS_ID,
                                StatusName = f.NAME,
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
            if (!string.IsNullOrWhiteSpace(param.StatusName))
            {
                queryable = queryable.Where(p => p.StatusName.ToUpper().Contains(param.StatusName.ToUpper()));
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
            if (param.EffectDate != null)
            {
                queryable = queryable.Where(p => p.EffectDate == param.EffectDate);
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
                var r = await (from p in _appContext.Terminates.Where(x => x.ID == id)
                               from e in _appContext.Employees.Where(x => x.ID == p.EMPLOYEE_ID).DefaultIfEmpty()
                               from t in _appContext.Positions.Where(x => x.ID == e.POSITION_ID).DefaultIfEmpty()
                               from o in _appContext.Organizations.Where(x => x.ID == e.ORG_ID).DefaultIfEmpty()
                               from ct in _appContext.Contracts.Where(x => x.ID == e.CONTRACT_ID).DefaultIfEmpty()
                               from f in _appContext.OtherListFixs.Where(x => x.ID == p.STATUS_ID && x.TYPE == SystemConfig.STATUS_APPROVE)
                               
                               select new TerminateDTO
                               {
                                   Id = p.ID,
                                   EmployeeId = p.EMPLOYEE_ID,
                                   EmployeeCode = e.CODE,
                                   EmployeeName = e.FULLNAME,
                                   DecisionNo = p.DECISION_NO,
                                   PositionName = t.NAME,
                                   OrgId = e.ORG_ID,
                                   OrgName = o.NAME,
                                   ContractNo = ct.CONTRACT_NO,
                                   EffectDate = p.EFFECT_DATE,
                                   DateEnd = ct.EXPIRE_DATE,
                                   DateStart = ct.START_DATE,
                                   SendDate = p.SEND_DATE,
                                   LastDate = p.LAST_DATE,
                                   TerReason = p.TER_REASON,
                                   SignId = p.SIGN_ID,
                                   SignerName = p.SIGNER_NAME,
                                   SignerPosition = p.SIGNER_POSITION,
                                   SignDate = p.SIGN_DATE,
                                   StatusId = p.STATUS_ID,

                                   AmountViolations = p.AMOUNT_VIOLATIONS,
                                   TrainingCosts = p.TRAINING_COSTS,
                                   OtherCompensation = p.OTHER_COMPENSATION
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
        public async Task<ResultWithError> CreateAsync(TerminateInputDTO param)
        {
            try
            {
                // Gencode
                //var No = "";

                var status = await _appContext.OtherListFixs.Where(c => c.ID == param.StatusId && c.TYPE == SystemConfig.STATUS_APPROVE).CountAsync();
                if (status == 0)
                {
                    return new ResultWithError(Message.STATUS_NOT_EXIST);
                }

                var emp = await _appContext.Employees.Where(c => c.ID == param.EmployeeId).CountAsync();
                if (emp == 0)
                {
                    return new ResultWithError(Message.EMP_NOT_EXIST);
                }

                var signer = await _appContext.Employees.Where(c => c.ID == param.SignId).CountAsync();
                if (signer == 0)
                {
                    return new ResultWithError(Message.SIGNER_NOT_EXIST);
                }


                var data = Map<TerminateInputDTO, Terminate>(param, new Terminate());
                //data.NO = No;
                var result = await _appContext.Terminates.AddAsync(data);

                var e = await _appContext.Employees.Where(c => c.ID == data.EMPLOYEE_ID).FirstOrDefaultAsync();
                if (data.STATUS_ID == OtherConfig.STATUS_APPROVE)
                {
                    var chk = await _appContext.InsChanges.Where(x => x.EMPLOYEE_ID == data.EMPLOYEE_ID).OrderByDescending(x => x.CHANGE_MONTH).FirstOrDefaultAsync();
                    if (chk != null)
                    {
                        if (chk.CHANGE_TYPE_ID != 22 && chk.CHANGE_TYPE_ID != 24 && chk.CHANGE_TYPE_ID != 27 && chk.CHANGE_TYPE_ID != 29)
                        {
                            return new ResultWithError("INS_NOT_OFF");
                        }
                    }
                    e.WORK_STATUS_ID = OtherConfig.EMP_STATUS_TERMINATE;
                    e.TER_EFFECT_DATE = param.EffectDate;
                    _appContext.Employees.Update(e);
                }
                else
                {
                    e.WORK_STATUS_ID = OtherConfig.EMP_STATUS_WORKING;
                    e.TER_EFFECT_DATE = null;
                    _appContext.Employees.Update(e);
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
        public async Task<ResultWithError> UpdateAsync(TerminateInputDTO param)
        {
            try
            {
                var r = _appContext.Terminates.Where(x => x.ID == param.Id ).FirstOrDefault();

                if (r == null)
                {
                    return new ResultWithError(404);
                }
                if (r.STATUS_ID == OtherConfig.STATUS_APPROVE && !_appContext.IsAdmin)
                {
                    return new ResultWithError(Message.RECORD_IS_APPROVED);
                }
                var status = await _appContext.OtherListFixs.Where(c => c.ID == param.StatusId && c.TYPE == SystemConfig.STATUS_APPROVE).CountAsync();
                if (status == 0)
                {
                    return new ResultWithError(Message.STATUS_NOT_EXIST);
                }

                var emp = await _appContext.Employees.Where(c => c.ID == param.EmployeeId).CountAsync();
                if (emp == 0)
                {
                    return new ResultWithError(Message.EMP_NOT_EXIST);
                }

                var signer = await _appContext.Employees.Where(c => c.ID == param.SignId).CountAsync();
                if (signer == 0)
                {
                    return new ResultWithError(Message.SIGNER_NOT_EXIST);
                }
                var data = Map<TerminateInputDTO, Terminate>(param, r);
                var result = _appContext.Terminates.Update(data);
                var e = await _appContext.Employees.Where(c => c.ID == data.EMPLOYEE_ID).FirstOrDefaultAsync();
                if (data.STATUS_ID == OtherConfig.STATUS_APPROVE)
                {
                    var chk = await _appContext.InsChanges.Where(x => x.EMPLOYEE_ID == data.EMPLOYEE_ID).OrderByDescending(x => x.CHANGE_MONTH).FirstOrDefaultAsync();
                    if (chk != null)
                    {
                        if (chk.CHANGE_TYPE_ID != 22 && chk.CHANGE_TYPE_ID != 24 && chk.CHANGE_TYPE_ID != 27 && chk.CHANGE_TYPE_ID != 29)
                        {
                            return new ResultWithError("INS_NOT_OFF");
                        }
                    }
                    e.WORK_STATUS_ID = OtherConfig.EMP_STATUS_TERMINATE;
                    e.TER_EFFECT_DATE = r.EFFECT_DATE;
                    _appContext.Employees.Update(e);
                }
                else
                {
                    e.WORK_STATUS_ID = OtherConfig.EMP_STATUS_WORKING;
                    e.TER_EFFECT_DATE = null;
                    _appContext.Employees.Update(e);
                }

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
                var r = _appContext.Terminates.Where(x => x.ID == id ).FirstOrDefault();
                if (r == null)
                {
                    return new ResultWithError(404);
                }
                var chk = await _appContext.InsChanges.Where(x => x.EMPLOYEE_ID == r.EMPLOYEE_ID).OrderByDescending(x => x.CHANGE_MONTH).FirstOrDefaultAsync();
                if (chk != null)
                {
                    if (chk.CHANGE_TYPE_ID != 22 && chk.CHANGE_TYPE_ID != 24 && chk.CHANGE_TYPE_ID != 27 && chk.CHANGE_TYPE_ID != 29)
                    {
                        return new ResultWithError("INS_NOT_OFF");
                    }
                }
                // Kiểm tra xem nếu dữ liệu đang sửa ở trạng thái phê duyệt thì không cho  phê duyệt
                if (r.STATUS_ID == OtherConfig.STATUS_APPROVE)
                {
                    return new ResultWithError("RECORD_IS_APPROVED");
                }
                r.STATUS_ID = OtherConfig.STATUS_APPROVE;
                var result = _appContext.Terminates.Update(r);
                // update Working status
                var e = await _appContext.Employees.Where(c => c.ID == r.EMPLOYEE_ID).FirstOrDefaultAsync();

                e.WORK_STATUS_ID = OtherConfig.EMP_STATUS_TERMINATE;
                e.TER_EFFECT_DATE = r.EFFECT_DATE;
                _appContext.Employees.Update(e);

                await _appContext.SaveChangesAsync();
                return new ResultWithError(200);
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex.Message);
            }
        }

        public async Task<ResultWithError> RemoveAsync(List<long> ids)
        {
            try
            {
                var lst = new List<Terminate>();
                foreach (var item in ids)
                {
                    var c = await _appContext.Terminates.Where(x=>x.ID == item).FirstOrDefaultAsync();
                    if (c.STATUS_ID == Consts.ACTION_APPROVE)
                    {
                        return new ResultWithError("DATA_IS_APPROVED");
                    }
                    lst.Add(c);
                }
                _appContext.Terminates.RemoveRange(lst);
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
