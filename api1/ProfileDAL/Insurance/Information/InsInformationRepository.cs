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
    public class InsInformationRepository : TLARepository<InsInformation>, IInsInformationRepository
    {
        private ProfileDbContext _appContext => (ProfileDbContext)_context;
        public InsInformationRepository(ProfileDbContext context) : base(context)
        {

        }
        /// <summary>
        /// CMS Get All Data
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public async Task<PagedResult<InsInformationDTO>> GetAll(InsInformationDTO param)
        {
            var queryable = from p in _appContext.InsInformations
                            from e in _appContext.Employees.Where(c => c.ID == p.EMPLOYEE_ID)
                            from o in _appContext.Organizations.Where(c => c.ID == e.ORG_ID)
                            from ps in _appContext.Positions.Where(c => c.ID == e.POSITION_ID)
                            from s in _appContext.OtherListFixs.Where(x => x.ID == p.BHXH_STATUS_ID && x.TYPE == SystemConfig.STATUS_BHXH).DefaultIfEmpty()
                            
                            orderby e.CODE
                            select new InsInformationDTO
                            {
                                Id = p.ID,
                                // EmployeeId = p.EMPLOYEE_ID,
                                EmployeeName = e.FULLNAME,
                                EmployeeCode = e.CODE,
                                OrgId = e.ORG_ID,
                                OrgName = o.NAME,
                                PositionName = ps.NAME,
                                BhxhNo = p.BHXH_NO,
                                BhxhDate = p.BHXH_DATE,
                                BhxhPlace = p.BHXH_PLACE,
                                BhxhStatusId = p.BHXH_STATUS_ID,
                                BhxhStatusName = s.NAME,
                                // BhxhNote = p.BHXH_NOTE,
                                BhytNo = p.BHYT_NO,
                                BhytEffectDate = p.BHYT_EFFECT_DATE,
                                BhytExpireDate = p.BHYT_EXPIRE_DATE,
                                // PlaceRegisId = p.PLACE_REGIS_ID,
                                TerEffectDate = e.TER_EFFECT_DATE,
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

            if (!string.IsNullOrWhiteSpace(param.EmployeeName))
            {
                queryable = queryable.Where(p => p.EmployeeName.ToUpper().Contains(param.EmployeeName.ToUpper()));
            }
            if (!string.IsNullOrWhiteSpace(param.BhxhNo))
            {
                queryable = queryable.Where(p => p.BhxhNo.ToUpper().Contains(param.BhxhNo.ToUpper()));
            }
            if (!string.IsNullOrWhiteSpace(param.BhytNo))
            {
                queryable = queryable.Where(p => p.BhytNo.ToUpper().Contains(param.BhytNo.ToUpper()));
            }
            if (!string.IsNullOrWhiteSpace(param.BhxhPlace))
            {
                queryable = queryable.Where(p => p.BhxhPlace.ToUpper().Contains(param.BhxhPlace.ToUpper()));
            }

            if (param.BhxhDate != null)
            {
                queryable = queryable.Where(p => p.BhxhDate == param.BhxhDate);
            }

            if (param.WorkStatusId == null || param.WorkStatusId == 0)
            {
                queryable = queryable.Where(p => p.WorkStatusId != OtherConfig.EMP_STATUS_TERMINATE || (p.WorkStatusId == OtherConfig.EMP_STATUS_TERMINATE && p.TerEffectDate > DateTime.Now));
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
                var r = await (from p in _appContext.InsInformations.Where(c => c.ID == id)
                               from e in _appContext.Employees.Where(c => c.ID == p.EMPLOYEE_ID)
                               from o in _appContext.Organizations.Where(c => c.ID == e.ORG_ID)
                               from ps in _appContext.Positions.Where(c => c.ID == e.POSITION_ID)
                               from s in _appContext.OtherListFixs.Where(x => x.ID == p.BHXH_STATUS_ID && x.TYPE == SystemConfig.STATUS_BHXH).DefaultIfEmpty()
                               
                               select new InsInformationDTO
                               {
                                   Id = p.ID,
                                   EmployeeId = p.EMPLOYEE_ID,
                                   EmployeeName = e.FULLNAME,
                                   EmployeeCode = e.CODE,
                                   OrgName = o.NAME,
                                   PositionName = ps.NAME,
                                   BhxhNo = p.BHXH_NO,
                                   BhxhDate = p.BHXH_DATE,
                                   BhxhPlace = p.BHXH_PLACE,
                                   BhxhStatusId = p.BHXH_STATUS_ID,
                                   BhxhStatusName = s.NAME,
                                   BhxhNote = p.BHXH_NOTE,
                                   BhytNo = p.BHYT_NO,
                                   BhytEffectDate = p.BHYT_EFFECT_DATE,
                                   BhytExpireDate = p.BHYT_EXPIRE_DATE,
                                   PlaceRegisId = p.PLACE_REGIS_ID
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
        public async Task<ResultWithError> CreateAsync(InsInformationInputDTO param)
        {
            try
            {
                if (param.BhxhStatusId != null)
                {
                    var obj = await _appContext.OtherListFixs.Where(c => c.ID == param.BhxhStatusId && c.TYPE == SystemConfig.STATUS_BHXH).CountAsync();
                    if (obj == 0)
                    {
                        return new ResultWithError(Message.STATUS_BHXH_NOT_EXIST);
                    }
                }

                var emp = await _appContext.Employees.Where(c => c.ID == param.EmployeeId).CountAsync();
                if (emp == 0)
                {
                    return new ResultWithError(Message.EMP_NOT_EXIST);
                }

                var chk = await _appContext.InsInformations.Where(c => c.ID == param.EmployeeId).CountAsync();
                if (chk > 0)
                {
                    return new ResultWithError(Message.DATA_IS_EXISTS);
                }
                if (param.BhxhNo != null)
                {
                    var a = await _appContext.InsInformations.Where(c => c.BHXH_NO == param.BhxhNo).AnyAsync();
                    if (a == true)
                    {
                        return new ResultWithError(Message.CODE_EXIST);
                    }
                }

                var data = Map<InsInformationInputDTO, InsInformation>(param, new InsInformation());
                await _appContext.InsInformations.AddAsync(data);
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
        public async Task<ResultWithError> UpdateAsync(InsInformationInputDTO param)
        {
            try
            {
                var r = await _appContext.InsInformations.Where(c => c.ID == param.Id).FirstOrDefaultAsync();
                if (r is null)
                {
                    return new ResultWithError(Message.RECORD_NOT_FOUND);
                }
                var obj = await _appContext.OtherListFixs.Where(c => c.ID == param.BhxhStatusId && c.TYPE == SystemConfig.STATUS_BHXH).CountAsync();
                if (obj == 0)
                {
                    return new ResultWithError(Message.STATUS_BHXH_NOT_EXIST);
                }
                var a = await _appContext.InsInformations.Where(c => c.BHXH_NO == param.BhxhNo && c.ID != r.ID).AnyAsync();
                if (a == true)
                {
                    return new ResultWithError(Message.CODE_EXIST);
                }
                param.EmployeeId = null;
                var data = Map<InsInformationInputDTO, InsInformation>(param, r);
                _appContext.InsInformations.Update(data);
                await _appContext.SaveChangesAsync();
                return new ResultWithError(data);
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex);
            }
        }



    }
}
