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
    public class OtherListRepository : TLARepository<OtherList>, IOtherListRepository
    {
        private ProfileDbContext _appContext => (ProfileDbContext)_context;
        public OtherListRepository(ProfileDbContext context) : base(context)
        {

        }
        /// <summary>
        /// CMS Get All Type Data Is Active
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public async Task<ResultWithError> GetAllType()
        {
            var r = await (from p in _appContext.OtherListTypes
                           where p.IS_ACTIVE == true
                           orderby p.ORDERS
                           select new
                           {
                               Id = p.ID,
                               Name = p.NAME,
                               Code = p.CODE
                           }).ToListAsync();
            return new ResultWithError(r);
        }
        /// <summary>
        /// CMS Get All Data by Type
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public async Task<PagedResult<OtherListDTO>> GetAllByType(OtherListDTO param)
        {
            var queryable = from p in _appContext.OtherLists
                            select new OtherListDTO
                            {
                                Id = p.ID,
                                Code = p.CODE,
                                Name = p.NAME,
                                Note = p.NOTE,
                                IsActive = p.IS_ACTIVE,
                                TypeId = p.TYPE_ID,
                                Orders = p.ORDERS 
                            };
            if (param.TypeId != null)
            {
                queryable = queryable.Where(p => p.TypeId == param.TypeId);
            }
            if (param.Name != null)
            {
                queryable = queryable.Where(p => p.Name.ToUpper().Contains(param.Name.ToUpper()));
            }

            if (param.Code != null)
            {
                queryable = queryable.Where(p => p.Code.ToUpper().Contains(param.Code.ToUpper()));
            }

            if (param.Note != null)
            {
                queryable = queryable.Where(p => p.Note.ToUpper().Contains(param.Note.ToUpper()));
            }

            if (param.IsActive != null)
            {
                queryable = queryable.Where(p => p.IsActive == param.IsActive);
            }
            queryable = queryable.OrderByField("Orders");
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
                var r = await (from p in _appContext.OtherLists
                               where p.ID == id
                               select new
                               {
                                   Id = p.ID,
                                   Name = p.NAME,
                                   Code = p.CODE,
                                   TypeId = p.TYPE_ID,
                                   Orders = p.ORDERS,
                                   Note = p.NOTE,
                                
                               }).FirstOrDefaultAsync();
                return new ResultWithError(r);
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex.Message);
            }
        }
        /// <summary>
        /// CMS Create Type
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public async Task<ResultWithError> CreateTypeAsync(SysOtherListTypeInputDTO param)
        {
            var r = _appContext.OtherListTypes.Where(x => x.CODE.ToLower() == param.Code.ToLower()).Count();
            if (r > 0)
            {
                return new ResultWithError(409);
            }
            var data = Map<SysOtherListTypeInputDTO, OtherListType>(param, new OtherListType());
            data.IS_ACTIVE = true;
            var result = await _appContext.OtherListTypes.AddAsync(data);
            await _appContext.SaveChangesAsync();
            return new ResultWithError(data);
        }
        /// <summary>
        /// CMS Update Type
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public async Task<ResultWithError> UpdateTypeAsync(SysOtherListTypeInputDTO param)
        {
            var r = _appContext.OtherListTypes.Where(x => x.ID == param.Id).FirstOrDefault();
            if (r == null)
            {
                return new ResultWithError(404);
            }
            var r1 = _appContext.OtherListTypes.Where(x => x.ID != param.Id && x.CODE.ToLower() == param.Code.ToLower()).Count();
            if (r1 > 0)
            {
                return new ResultWithError(409);
            }
            var data = Map<SysOtherListTypeInputDTO, OtherListType>(param, r);
            var result = _appContext.OtherListTypes.Update(data);
            await _appContext.SaveChangesAsync();
            return new ResultWithError(200);
        }
        /// <summary>
        /// CMS Change Status Type
        /// </summary>
        /// <param name="ids"></param>
        /// <returns></returns>
        public async Task<ResultWithError> ChangeStatusTypeAsync(List<int> ids)
        {
            foreach (var item in ids)
            {
                var r = _appContext.OtherListTypes.Where(x => x.ID == item).FirstOrDefault();
                if (r == null)
                {
                    return new ResultWithError(400);
                }
                r.IS_ACTIVE = !r.IS_ACTIVE;
                var result = _appContext.OtherListTypes.Update(r);
            }
            await _appContext.SaveChangesAsync();
            return new ResultWithError(200);
        }
        /// <summary>
        /// /// CMS Create Data OtherList
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public async Task<ResultWithError> CreateAsync(SysOtherListInputDTO param)
        {
            try
            {
                var r = _appContext.OtherLists.Where(x => x.CODE.ToLower() == param.Code.ToLower()).Count();
                if (r > 0)
                {
                    return new ResultWithError(Consts.CODE_EXISTS);
                }
                var n = _appContext.OtherListTypes.Where(x => x.ID == param.TypeId).Count();
                if (n == 0)
                {
                    return new ResultWithError("TYPE_NOT_EXIST");
                }
                var data = Map<SysOtherListInputDTO, OtherList>(param, new OtherList());
                data.IS_ACTIVE = true;
                var result = await _appContext.OtherLists.AddAsync(data);
                await _appContext.SaveChangesAsync();
                return new ResultWithError(data);

            }
            catch (Exception ex)
            {

                throw ex;
            }
            
        }
        /// <summary>
        /// CMS Update Data OtherList 
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public async Task<ResultWithError> UpdateAsync(SysOtherListInputDTO param)
        {
            var r = _appContext.OtherLists.Where(x => x.ID == param.Id).FirstOrDefault();
            if (r == null)
            {
                return new ResultWithError(404);
            }
            var n = _appContext.OtherListTypes.Where(x => x.ID == param.TypeId).Count();
            if (n == 0)
            {
                return new ResultWithError("TYPE_NOT_EXIST");
            }

            //var r1 = _appContext.OtherLists.Where(x => x.ID != param.Id && x.CODE.ToLower() == param.Code.ToLower()).Count();
            //if (r1 > 0)
            //{
            //    return new ResultWithError(Consts.CODE_EXISTS);
            //}
            var data = Map<SysOtherListInputDTO, OtherList>(param, r);
            var result = _appContext.OtherLists.Update(data);
            await _appContext.SaveChangesAsync();
            return new ResultWithError(200);
        }

        /// <summary>
        /// CMS Change Status OtherList
        /// </summary>
        /// <param name="ids"></param>
        /// <returns></returns>
        public async Task<ResultWithError> ChangeStatusAsync(List<int> ids)
        {
            try
            {
                foreach (var item in ids)
                {
                    var r = _appContext.OtherLists.Where(x => x.ID == item).FirstOrDefault();
                    if (r == null)
                    {
                        return new ResultWithError(404);
                    }
                    r.IS_ACTIVE = !r.IS_ACTIVE;
                    var result = _appContext.OtherLists.Update(r);
                }
                await _appContext.SaveChangesAsync();
                return new ResultWithError(200);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// Backend Get Data is Active by Type
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public async Task<ResultWithError> GetOtherListByType(string typeCode)
        {
            if (typeCode == null || typeCode.Trim().Length == 0)
            {
                return new ResultWithError("CODE_NOT_BLANK");
            }
            var r = await (from p in _appContext.OtherLists
                           join o in _appContext.OtherListTypes on p.TYPE_ID equals o.ID
                           where p.IS_ACTIVE == true && o.CODE == typeCode
                           orderby p.ORDERS
                           select new
                           {
                               Id = p.ID,
                               Name = p.NAME
                           }).ToListAsync();
            return new ResultWithError(r);
        }

        /// <summary>
        /// Backend Get Data is Active by Type
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public async Task<ResultWithError> GetOtherListFixByType(string typeCode)
        {
            if (typeCode == null || typeCode.Trim().Length == 0)
            {
                return new ResultWithError("CODE_NOT_BLANK");
            }
            var r = await (from p in _appContext.OtherListFixs
                           where p.TYPE == typeCode
                           orderby p.ORDERS
                           select new
                           {
                               Id = p.ID,
                               Name = p.NAME,
                               Code = p.CODE
                           }).ToListAsync();
            return new ResultWithError(r);
        }
        /// <summary>
        /// Backend Get Data is Active by Type
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public async Task<ResultWithError> GetOtherListTreeView()
        {
            var r = await (from p in _appContext.OtherListTypes
                           orderby p.ORDERS
                           select new
                           {
                               Id = p.ID,
                               Name = p.NAME

                           }).ToListAsync();
            return new ResultWithError(r);
        }
        public async Task<ResultWithError> GetOtherListByTypeID(int? id)
        {
            try
            {
                var r = await (from p in _appContext.OtherLists
                               where p.TYPE_ID == id
                               select new
                               {
                                   Id = p.ID,
                                   Name = p.NAME,
                                   Code = p.CODE,
                                   TypeId = p.TYPE_ID,
                                   Orders = p.ORDERS,
                                   Note = p.NOTE,

                               }).FirstOrDefaultAsync();
                return new ResultWithError(r);
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex.Message);
            }
        }
        public async Task<ResultWithError> Delete(List<int> Ids)
        {
            try
            {
                List<OtherList> data = new List<OtherList>();
                foreach (var id in Ids)
                {
                    var r = _appContext.OtherLists.Where(x => x.ID == id).FirstOrDefault();
                    data.Add(r);
                }
                _appContext.OtherLists .RemoveRange(data);
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

