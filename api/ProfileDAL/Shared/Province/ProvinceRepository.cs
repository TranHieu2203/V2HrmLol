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
    public class ProvinceRepository : TLARepository<Province>, IProvinceRepository
    {
        private ProfileDbContext _appContext => (ProfileDbContext)_context;
        public ProvinceRepository(ProfileDbContext context) : base(context)
        {

        }
        /// <summary>
        /// CMS Get All Data
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public async Task<PagedResult<ProvinceDTO>> GetAll(ProvinceDTO param)
        {
            var queryable = from p in _appContext.Provinces
                            select new ProvinceDTO
                            {
                                ID = p.ID,
                                Code = p.CODE,
                                Name = p.NAME,
                                IsActive = p.IS_ACTIVE,
                                CreateBy = p.CREATE_BY,
                                UpdatedBy = p.UPDATED_BY,
                                CreateDate = p.CREATE_DATE,
                                UpdatedDate = p.UPDATED_DATE
                            };


            if (!string.IsNullOrWhiteSpace(param.Name))
            {
                queryable = queryable.Where(p => p.Name.ToUpper().Contains(param.Name.ToUpper()));
            }
            if (!string.IsNullOrWhiteSpace(param.Code))
            {
                queryable = queryable.Where(p => p.Code.ToUpper().Contains(param.Code.ToUpper()));
            }
            if (param.IsActive != null)
            {
                queryable = queryable.Where(p => p.IsActive == param.IsActive);
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
                var r = await (from p in _appContext.Provinces
                               where p.ID == id
                               select new
                               {
                                   ID = p.ID,
                                   Code = p.CODE,
                                   Name = p.NAME,
                                   IsActive = p.IS_ACTIVE,
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
        public async Task<ResultWithError> CreateAsync(ProvinceInputDTO param)
        {
            try
            {

                var data = Map<ProvinceInputDTO, Province>(param, new Province());
                data.IS_ACTIVE = true;
                var result = await _appContext.Provinces.AddAsync(data);
                await _appContext.SaveChangesAsync();
                param.ID = data.ID;
                return new ResultWithError(param);
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex);
            }
        }
        /// <summary>
        /// CMS Edit Data
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public async Task<ResultWithError> UpdateAsync(ProvinceInputDTO param)
        {
            try
            {
                var r = _appContext.Provinces.Where(x => x.ID == param.ID).FirstOrDefault();
                if (r == null)
                {
                    return new ResultWithError(404);
                }
                // check code
                var c = _appContext.Provinces.Where(x => x.CODE.ToLower() == param.Code.ToLower() && x.ID != param.ID).Count();
                if (c > 0)
                {
                    return new ResultWithError(Consts.CODE_EXISTS);
                }

                var data = Map<ProvinceInputDTO, Province>(param, r);
                var result = _appContext.Provinces.Update(data);
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
                    var r = _appContext.Provinces.Where(x => x.ID == item).FirstOrDefault();
                    if (r == null)
                    {
                        return new ResultWithError(404);
                    }
                    r.IS_ACTIVE = !r.IS_ACTIVE;
                    var result = _appContext.Provinces.Update(r);
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
        /// Get List Group is Activce
        /// </summary>
        /// <param name="ids"></param>
        /// <returns></returns>
        public async Task<ResultWithError> GetListProvince()
        {
            try
            {
                var queryable = await (from p in _appContext.Provinces
                                       where p.IS_ACTIVE == true
                                       orderby p.CODE
                                       select new
                                       {
                                           Id = p.ID,
                                           Name = p.NAME,
                                           Code = p.CODE
                                       }).ToListAsync();
                return new ResultWithError(queryable);
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex.Message);
            }
        }
        /// <summary>
        /// CMS Get All Data District
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public async Task<PagedResult<DistrictDTO>> DistrictGetAll(DistrictDTO param)
        {
            var queryable = from p in _appContext.Provinces
                            join d in _appContext.Districts on p.ID equals d.PROVINCE_ID
                            select new DistrictDTO
                            {
                                ID = p.ID,
                                Code = p.CODE,
                                Name = p.NAME,
                                ProvinceId = d.PROVINCE_ID,
                                ProvinceName = p.NAME,
                                IsActive = p.IS_ACTIVE,
                                CreateBy = p.CREATE_BY,
                                UpdatedBy = p.UPDATED_BY,
                                CreateDate = p.CREATE_DATE,
                                UpdatedDate = p.UPDATED_DATE
                            };


            if (!string.IsNullOrWhiteSpace(param.Name))
            {
                queryable = queryable.Where(p => p.Name.ToUpper().Contains(param.Name.ToUpper()));
            }
            if (!string.IsNullOrWhiteSpace(param.Code))
            {
                queryable = queryable.Where(p => p.Code.ToUpper().Contains(param.Code.ToUpper()));
            }
            if (!string.IsNullOrWhiteSpace(param.ProvinceName))
            {
                queryable = queryable.Where(p => p.ProvinceName.ToUpper().Contains(param.ProvinceName.ToUpper()));
            }
            if (param.ProvinceId != null)
            {
                queryable = queryable.Where(p => p.ProvinceId == param.ProvinceId);
            }
            if (param.IsActive != null)
            {
                queryable = queryable.Where(p => p.IsActive == param.IsActive);
            }
            return await PagingList(queryable, param);
        }
        /// <summary>
        /// CMS Get Detail District
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>        
        public async Task<ResultWithError> DistrictById(int id)
        {
            try
            {
                var r = await (from p in _appContext.Districts
                               where p.ID == id
                               select new
                               {
                                   ID = p.ID,
                                   Code = p.CODE,
                                   Name = p.NAME,
                                   ProvinceId = p.PROVINCE_ID,
                                   IsActive = p.IS_ACTIVE,
                               }).FirstOrDefaultAsync();
                return new ResultWithError(r);
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex.Message);
            }
        }
        /// <summary>
        /// Create Data District
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public async Task<ResultWithError> DistrictCreateAsync(DistrictInputDTO param)
        {
            try
            {

                var data = Map<DistrictInputDTO, District>(param, new District());
                data.IS_ACTIVE = true;
                var result = await _appContext.Districts.AddAsync(data);
                await _appContext.SaveChangesAsync();
                param.ID = data.ID;
                return new ResultWithError(param);
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex);
            }
        }

        /// <summary>
        /// CMS Edit Data
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public async Task<ResultWithError> DistrictUpdateAsync(DistrictInputDTO param)
        {
            try
            {
                var r = _appContext.Districts.Where(x => x.ID == param.ID).FirstOrDefault();
                if (r == null)
                {
                    return new ResultWithError(404);
                }
                // check code
                var c = _appContext.Districts.Where(x => x.CODE.ToLower() == param.Code.ToLower() && x.ID != param.ID).Count();
                if (c > 0)
                {
                    return new ResultWithError(Consts.CODE_EXISTS);
                }

                var data = Map<DistrictInputDTO, District>(param, r);
                var result = _appContext.Districts.Update(data);
                await _appContext.SaveChangesAsync();
                return new ResultWithError(200);
            }
            catch (Exception ex)
            {

                return new ResultWithError(ex);
            }
        }
        /// <summary>
        /// CMS Change Status Data DIstrict
        /// </summary>
        /// <param name="ids"></param>
        /// <returns></returns>
        public async Task<ResultWithError> DistrictChangeStatusAsync(List<int> ids)
        {
            try
            {
                foreach (var item in ids)
                {
                    var r = _appContext.Districts.Where(x => x.ID == item).FirstOrDefault();
                    if (r == null)
                    {
                        return new ResultWithError(404);
                    }
                    r.IS_ACTIVE = !r.IS_ACTIVE;
                    var result = _appContext.Districts.Update(r);
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
        /// Get List district is Activce
        /// </summary>
        /// <param name="ids"></param>
        /// <returns></returns>
        public async Task<ResultWithError> GetListDistrict(int ProvinceId)
        {
            try
            {
                var queryable = from p in _appContext.Districts
                                where p.IS_ACTIVE == true
                                orderby p.CODE
                                select new { p };
                if (ProvinceId != 0)
                {
                    queryable = queryable.Where(c => c.p.PROVINCE_ID == ProvinceId);
                }

                var data = await queryable.Select(f => new
                {
                    Id = f.p.ID,
                    Code = f.p.CODE,
                    Name = f.p.NAME,
                    ProvinceId = f.p.PROVINCE_ID
                }).ToListAsync();

                return new ResultWithError(data);
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex.Message);
            }
        }
        /// <summary>
        /// CMS Get All Data District
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public async Task<PagedResult<WardDTO>> WardGetAll(WardDTO param)
        {
            var queryable = from p in _appContext.Provinces
                            join d in _appContext.Districts on p.ID equals d.PROVINCE_ID
                            join w in _appContext.Wards on d.ID equals w.DISTRICT_ID
                            select new WardDTO
                            {
                                ID = p.ID,
                                Code = p.CODE,
                                Name = p.NAME,
                                ProvinceId = d.PROVINCE_ID,
                                ProvinceName = p.NAME,
                                DistrictId = w.DISTRICT_ID,
                                DistrictName = d.NAME,
                                IsActive = p.IS_ACTIVE,
                                CreateBy = p.CREATE_BY,
                                UpdatedBy = p.UPDATED_BY,
                                CreateDate = p.CREATE_DATE,
                                UpdatedDate = p.UPDATED_DATE
                            };


            if (!string.IsNullOrWhiteSpace(param.Name))
            {
                queryable = queryable.Where(p => p.Name.ToUpper().Contains(param.Name.ToUpper()));
            }
            if (!string.IsNullOrWhiteSpace(param.Code))
            {
                queryable = queryable.Where(p => p.Code.ToUpper().Contains(param.Code.ToUpper()));
            }
            if (!string.IsNullOrWhiteSpace(param.ProvinceName))
            {
                queryable = queryable.Where(p => p.ProvinceName.ToUpper().Contains(param.ProvinceName.ToUpper()));
            }
            if (!string.IsNullOrWhiteSpace(param.DistrictName))
            {
                queryable = queryable.Where(p => p.DistrictName.ToUpper().Contains(param.DistrictName.ToUpper()));
            }
            if (param.ProvinceId != null)
            {
                queryable = queryable.Where(p => p.ProvinceId == param.ProvinceId);
            }
            if (param.IsActive != null)
            {
                queryable = queryable.Where(p => p.IsActive == param.IsActive);
            }
            return await PagingList(queryable, param);
        }

        /// <summary>
        /// Create Data Ward
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public async Task<ResultWithError> WardCreateAsync(WardInputDTO param)
        {
            try
            {
                var data = Map<WardInputDTO, District>(param, new District());
                data.IS_ACTIVE = true;
                var result = await _appContext.Districts.AddAsync(data);
                await _appContext.SaveChangesAsync();
                param.ID = data.ID;
                return new ResultWithError(param);
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex);
            }
        }
        /// <summary>
        /// CMS Edit Data
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public async Task<ResultWithError> WardUpdateAsync(WardInputDTO param)
        {
            try
            {
                var r = _appContext.Wards.Where(x => x.ID == param.ID).FirstOrDefault();
                if (r == null)
                {
                    return new ResultWithError(404);
                }
                // check code
                var c = _appContext.Wards.Where(x => x.CODE.ToLower() == param.Code.ToLower() && x.ID != param.ID).Count();
                if (c > 0)
                {
                    return new ResultWithError(Consts.CODE_EXISTS);
                }

                var data = Map<WardInputDTO, Ward>(param, r);
                var result = _appContext.Wards.Update(data);
                await _appContext.SaveChangesAsync();
                return new ResultWithError(200);
            }
            catch (Exception ex)
            {

                return new ResultWithError(ex);
            }
        }
        /// <summary>
        /// CMS Change Status Data DIstrict
        /// </summary>
        /// <param name="ids"></param>
        /// <returns></returns>
        public async Task<ResultWithError> WardChangeStatusAsync(List<int> ids)
        {
            try
            {
                foreach (var item in ids)
                {
                    var r = _appContext.Wards.Where(x => x.ID == item).FirstOrDefault();
                    if (r == null)
                    {
                        return new ResultWithError(404);
                    }
                    r.IS_ACTIVE = !r.IS_ACTIVE;
                    var result = _appContext.Wards.Update(r);
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
        /// Get List Ward is Activce
        /// </summary>
        /// <param name="ids"></param>
        /// <returns></returns>
        public async Task<ResultWithError> GetListWard(int DistrictId)
        {
            try
            {
                var queryable = from p in _appContext.Wards
                                where p.IS_ACTIVE == true
                                orderby p.CODE
                                select new { p };
                if (DistrictId != 0)
                {
                    queryable = queryable.Where(c => c.p.DISTRICT_ID == DistrictId);
                }

                var data = await queryable.Select(f => new
                {
                    Id = f.p.ID,
                    Code = f.p.CODE,
                    Name = f.p.NAME,
                    DistrictId = f.p.DISTRICT_ID
                }).ToListAsync();

                return new ResultWithError(data);
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex.Message);
            }
        }

    }
}
