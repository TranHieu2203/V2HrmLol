using System.Threading.Tasks;
using Common.Paging;
using ProfileDAL.EntityFrameworkCore;
using ProfileDAL.ViewModels;
using ProfileDAL.Models;
using System.Linq;
using Common.Repositories;
using Common.Extensions;
using Microsoft.EntityFrameworkCore;
using System;
using Common.Interfaces;
using System.Collections.Generic;
using Microsoft.Extensions.Logging;
using Oracle.ManagedDataAccess.Client;

namespace ProfileDAL.Repositories
{
    public class HuJobRepository : TLARepository<HUJob>, IHuJobRepository
    {
        private ProfileDbContext _appContext => (ProfileDbContext)_context;
        private readonly ILogger _logger;

        public HuJobRepository(ProfileDbContext context) : base(context)
        {

        }


        public async Task<PagedResult<HUJobInputDTO>> GetJobs(HUJobInputDTO param)
        {
            try
            {
                var queryable = from p in _appContext.HUJobs
                                from o in _appContext.OtOtherLists.Where(x => x.ID == p.JOB_FAMILY_ID).DefaultIfEmpty()

                                select new HUJobInputDTO
                                {
                                    Id = p.ID,
                                    NameVN = p.NAME_VN,
                                    NameEN = p.NAME_EN,
                                    Actflg = p.ACTFLG,
                                    ActflgStr = p.ACTFLG == "A" ? "Áp dụng" : "Ngừng áp dụng",
                                    Code = p.CODE,
                                    CreatedDate = p.CREATED_DATE,
                                    Note = p.NOTE
                                };
                if (param.NameVN != null)
                {
                    queryable = queryable.Where(p => p.NameVN.ToUpper().Contains(param.NameVN.ToUpper()));
                }

                if (param.NameEN != null)
                {
                    queryable = queryable.Where(p => p.NameEN.ToUpper().Contains(param.NameEN.ToUpper()));
                }

                if (param.Code != null)
                {
                    queryable = queryable.Where(p => p.Code.ToUpper().Contains(param.Code.ToUpper()));
                }

                if (param.ActflgStr != null)
                {
                    queryable = queryable.Where(p => p.ActflgStr.ToUpper().Contains(param.ActflgStr.ToUpper()));
                }

                if (param.Note != null)
                {
                    queryable = queryable.Where(p => p.Note.ToUpper().Contains(param.Note.ToUpper()));
                }

                return await PagingList(queryable, param);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.ToString(), param);
                return null;
            }
        }

        public async Task<ResultWithError> GetJob(int id)
        {
            try
            {
                var query = await (from p in _appContext.HUJobs
                                   where p.ID == id
                                   select new HUJobDTO
                                   {
                                       Id = p.ID,
                                       NameVN = p.NAME_VN,
                                       NameEN = p.NAME_EN,
                                       Actflg = p.ACTFLG,
                                       Purpose = p.PURPOSE,
                                       Code = p.CODE,
                                       typeId = p.JOB_FAMILY_ID,
                                       Note = p.NOTE
                                   }).FirstOrDefaultAsync();

                var query_child = await (from p in _appContext.HUJobFunction
                                   where p.JOB_ID == id
                                   select new HUJobFunctionDTO
                                   {
                                       Id = p.ID,
                                       Name = p.NAME,
                                       NameEN = p.NAME_EN,
                                       FunctionID = p.FUNCTION_ID,
                                       ParentID = p.PARENT_ID,
                                       JobID = p.JOB_ID
                                   }).ToListAsync();

                query.Child = query_child;
                return new ResultWithError(query);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.ToString());
                return new ResultWithError(ex.Message);
            }
        }
        
        public async Task<ResultWithError> UpdateAsync(HUJobInputDTO param)
        {
            try
            {
                if (param.Id != 0)
                {
                    var obj = (from p in _appContext.HUJobs where p.ID == param.Id select p).FirstOrDefault();
                    if (obj == null)
                    {
                        return new ResultWithError("OBJ_NULL");
                    }

                    obj.NAME_VN = param.NameVN;
                    obj.NAME_EN = param.NameEN;
                    obj.CODE = param.Code;
                    obj.PURPOSE = param.Purpose;
                    obj.REQUEST = param.Request;
                    obj.NOTE = param.Note;
                    obj.JOB_FAMILY_ID = param.typeId;
                    obj.MODIFIED_DATE = DateTime.Now;
                    obj.MODIFIED_BY = param.CreatedBy;
                    obj.CREATED_DATE = DateTime.Now;
                    obj.CREATED_BY = param.CreatedBy;
                    var result = _appContext.HUJobs.Update(obj);
                    await _appContext.SaveChangesAsync();
                }
                else
                {
                    var data = new HUJob();
                    data.NAME_VN = param.NameVN;
                    data.NAME_EN = param.NameEN;
                    data.CODE = param.Code;
                    data.PURPOSE = param.Purpose;
                    data.REQUEST = param.Request;
                    data.NOTE = param.Note;
                    data.JOB_FAMILY_ID = param.typeId;
                    data.ACTFLG = "A";
                    data.MODIFIED_DATE = DateTime.Now;
                    data.MODIFIED_BY = param.CreatedBy;
                    var result = await _appContext.HUJobs.AddAsync(data);
                    await _appContext.SaveChangesAsync();
                    return new ResultWithError(data);
                }
                return new ResultWithError(200);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.ToString());
                return new ResultWithError(ex.Message);
            }
        }

        public async Task<ResultWithError> ChangeStatusAsync(List<int> ids, string status, string userName)
        {
            try
            {
                var query = from p in _appContext.HUJobs where ids.Contains(p.ID) select p;
                foreach (var item in query)
                {
                    item.ACTFLG = status;
                    item.MODIFIED_DATE = DateTime.Now;
                    item.MODIFIED_BY = userName;
                }
                await _appContext.SaveChangesAsync();
                return new ResultWithError(200);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.ToString());
                return new ResultWithError(ex.Message);
            }
        }

        public async Task<ResultWithError> ChangeStatusAsync(List<int> ids, string userName)
        {
            try
            {
                var query = from p in _appContext.HUJobs where ids.Contains(p.ID) select p;
                foreach (var item in query)
                {
                    item.ACTFLG = item.ACTFLG == "A" ? "I" : "A";
                    item.MODIFIED_DATE = DateTime.Now;
                    item.MODIFIED_BY = userName;
                }
                await _appContext.SaveChangesAsync();
                return new ResultWithError(200);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.ToString());
                return new ResultWithError(ex.Message);
            }
        }

        public async Task<ResultWithError> DeleteAsync(List<int> ids)
        {
            try
            {
                var query = from p in _appContext.HUJobs where ids.Contains(p.ID) select p;
                foreach (var item in query)
                {
                    _appContext.HUJobs.Remove(item);
                }
                await _appContext.SaveChangesAsync();
                return new ResultWithError(200);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.ToString());
                return new ResultWithError(ex.Message);
            }
        }

        public async Task<bool> ValidateJob(HUJobInputDTO param)
        {
            try
            {
                var c = _appContext.HUJobs.Where(x => x.CODE.ToLower().Equals(param.Code.ToLower()) && x.ID != param.Id);
                return await c.AnyAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.ToString());
                return false;
            }
        }

    }
}
