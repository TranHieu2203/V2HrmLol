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
    public class CompanyInfoRepository : TLARepository<CompanyInfo>, ICompanyInfoRepository
    {
        private ProfileDbContext _appContext => (ProfileDbContext)_context;
        public CompanyInfoRepository(ProfileDbContext context) : base(context)
        {

        }
        /// <summary>
        /// CMS Get All Data
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public async Task<PagedResult<CompanyInfoDTO>> GetAll(CompanyInfoDTO param)
        {
            var queryable = from p in _appContext.CompanyInfos
                            from o in _appContext.Organizations.Where(o => o.ID == p.ORG_ID).DefaultIfEmpty()
                            from r in _appContext.OtherLists.Where(r => r.ID == p.REGION_ID).DefaultIfEmpty()
                            from i in _appContext.OtherLists.Where(i => i.ID == p.INS_UNIT).DefaultIfEmpty()
                            from pr in _appContext.Provinces.Where(pr => pr.ID == p.PROVINCE_ID).DefaultIfEmpty()
                            from d in _appContext.Districts.Where(d => d.ID == p.DISTRICT_ID).DefaultIfEmpty()
                            from w in _appContext.Wards.Where(w => w.ID == p.WARD_ID).DefaultIfEmpty()
                            from b in _appContext.Banks.Where(b => b.ID == p.BANK_ID).DefaultIfEmpty()
                            from bb in _appContext.BankBranchs.Where(bb => bb.ID == p.BANK_BRANCH_ID).DefaultIfEmpty()
                            from re in _appContext.Employees.Where(re => re.ID == p.REPRESENTATIVE_ID).DefaultIfEmpty()
                            from s in _appContext.Employees.Where(s => s.ID == p.SIGN_ID).DefaultIfEmpty()
                            orderby p.CREATE_DATE descending
                            select new CompanyInfoDTO
                            {
                                Id = p.ID,
                                NameVN = p.NAME_VN,
                                NameEN = p.NAME_EN,
                                OrgId = p.ORG_ID,
                                OrgCode = o.CODE,
                                OrgName = o.NAME,
                                GPKDAddress = p.GPKD_ADDRESS,
                                RegionId = p.REGION_ID,
                                RegionName = r.NAME,
                                PhoneNumber = p.PHONE_NUMBER,
                                WorkAddress = p.WORK_ADDRESS,
                                InsUnit = p.INS_UNIT,
                                InsUnitName = i.NAME,
                                ProvinceId = p.PROVINCE_ID,
                                ProvinceName = pr.NAME,
                                DistrictId = p.DISTRICT_ID,
                                DistrictName = d.NAME,
                                WardId = p.WARD_ID,
                                WardName = w.NAME,
                                FileLogo = p.FILE_LOGO,
                                BankAccount = p.BANK_ACCOUNT,
                                BankId = p.BANK_ID,
                                BankName = b.NAME,
                                BankBranch = p.BANK_BRANCH,
                                BankBranchId = p.BANK_BRANCH_ID,
                                BankBranchName = bb.NAME,
                                FileHeader = p.FILE_HEADER,
                                PitCode = p.PIT_CODE,
                                PitCodeChange = p.PIT_CODE_CHANGE,
                                PitCodeDate = p.PIT_CODE_DATE == null ? null : p.PIT_CODE_DATE.Value.ToString("dd/MM/yyyy"),
                                FileFooter = p.FILE_FOOTER,
                                RepresentativeId = p.REPRESENTATIVE_ID,
                                RepresentativeName = re.FULLNAME,
                                SignId = p.SIGN_ID,
                                SignName = s.FULLNAME,
                                PitCodePlace = p.PIT_CODE_PLACE,
                                GPKDNo = p.GPKD_NO,
                                GPKDDate = p.GPKD_DATE == null ? null : p.GPKD_DATE.Value.ToString("dd/MM/yyyy"),
                                Website = p.WEBSITE,
                                Fax = p.FAX,
                                IsActive = p.IS_ACTIVE,
                                IsActiveName = (p.IS_ACTIVE.HasValue ? p.IS_ACTIVE.Value : false) ? "Hiệu lực" : "Hết hiệu lực",
                                Note = p.NOTE,
                                CreateBy = p.CREATE_BY,
                                UpdatedBy = p.UPDATED_BY,
                                CreateDate = p.CREATE_DATE,
                                UpdatedDate = p.UPDATED_DATE,
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

            if (!string.IsNullOrWhiteSpace(param.NameVN))
            {
                queryable = queryable.Where(p => p.NameVN.ToUpper().Contains(param.NameVN.ToUpper()));
            }
            if (!string.IsNullOrWhiteSpace(param.NameEN))
            {
                queryable = queryable.Where(p => p.NameEN.ToUpper().Contains(param.NameEN.ToUpper()));
            }
            if (!string.IsNullOrWhiteSpace(param.OrgCode))
            {
                queryable = queryable.Where(p => p.OrgCode.ToUpper().Contains(param.OrgCode.ToUpper()));
            }
            if (!string.IsNullOrWhiteSpace(param.GPKDAddress))
            {
                queryable = queryable.Where(p => p.GPKDAddress.ToUpper().Contains(param.GPKDAddress.ToUpper()));
            }
            if (!string.IsNullOrWhiteSpace(param.RegionName))
            {
                queryable = queryable.Where(p => p.RegionName.ToUpper().Contains(param.RegionName.ToUpper()));
            }
            if (!string.IsNullOrWhiteSpace(param.PhoneNumber))
            {
                queryable = queryable.Where(p => p.PhoneNumber.ToUpper().Contains(param.PhoneNumber.ToUpper()));
            }
            if (!string.IsNullOrWhiteSpace(param.WorkAddress))
            {
                queryable = queryable.Where(p => p.WorkAddress.ToUpper().Contains(param.WorkAddress.ToUpper()));
            }
            if (!string.IsNullOrWhiteSpace(param.InsUnitName))
            {
                queryable = queryable.Where(p => p.InsUnitName.ToUpper().Contains(param.InsUnitName.ToUpper()));
            }
            if (!string.IsNullOrWhiteSpace(param.ProvinceName))
            {
                queryable = queryable.Where(p => p.ProvinceName.ToUpper().Contains(param.ProvinceName.ToUpper()));
            }
            if (!string.IsNullOrWhiteSpace(param.DistrictName))
            {
                queryable = queryable.Where(p => p.DistrictName.ToUpper().Contains(param.DistrictName.ToUpper()));
            }
            if (!string.IsNullOrWhiteSpace(param.WardName))
            {
                queryable = queryable.Where(p => p.WardName.ToUpper().Contains(param.WardName.ToUpper()));
            }
            if (!string.IsNullOrWhiteSpace(param.BankAccount))
            {
                queryable = queryable.Where(p => p.BankAccount.ToUpper().Contains(param.BankAccount.ToUpper()));
            }
            if (!string.IsNullOrWhiteSpace(param.BankName))
            {
                queryable = queryable.Where(p => p.BankName.ToUpper().Contains(param.BankName.ToUpper()));
            }
            if (!string.IsNullOrWhiteSpace(param.BankBranch))
            {
                queryable = queryable.Where(p => p.BankBranch.ToUpper().Contains(param.BankBranch.ToUpper()));
            }
            if (!string.IsNullOrWhiteSpace(param.BankBranchName))
            {
                queryable = queryable.Where(p => p.BankBranchName.ToUpper().Contains(param.BankBranchName.ToUpper()));
            }
            if (!string.IsNullOrWhiteSpace(param.PitCode))
            {
                queryable = queryable.Where(p => p.PitCode.ToUpper().Contains(param.PitCode.ToUpper()));
            }
            if (!string.IsNullOrWhiteSpace(param.PitCodeChange))
            {
                queryable = queryable.Where(p => p.PitCodeChange.ToUpper().Contains(param.PitCodeChange.ToUpper()));
            }
            if (!string.IsNullOrWhiteSpace(param.RepresentativeName))
            {
                queryable = queryable.Where(p => p.RepresentativeName.ToUpper().Contains(param.RepresentativeName.ToUpper()));
            }
            if (!string.IsNullOrWhiteSpace(param.SignName))
            {
                queryable = queryable.Where(p => p.SignName.ToUpper().Contains(param.SignName.ToUpper()));
            }
            if (!string.IsNullOrWhiteSpace(param.PitCodePlace))
            {
                queryable = queryable.Where(p => p.PitCodePlace.ToUpper().Contains(param.PitCodePlace.ToUpper()));
            }
            if (!string.IsNullOrWhiteSpace(param.GPKDNo))
            {
                queryable = queryable.Where(p => p.GPKDNo.ToUpper().Contains(param.GPKDNo.ToUpper()));
            }
            if (!string.IsNullOrWhiteSpace(param.Website))
            {
                queryable = queryable.Where(p => p.Website.ToUpper().Contains(param.Website.ToUpper()));
            }
            if (!string.IsNullOrWhiteSpace(param.Fax))
            {
                queryable = queryable.Where(p => p.Fax.ToUpper().Contains(param.Fax.ToUpper()));
            }
            if (!string.IsNullOrWhiteSpace(param.Note))
            {
                queryable = queryable.Where(p => p.Note.ToUpper().Contains(param.Note.ToUpper()));
            }
            if (!string.IsNullOrWhiteSpace(param.GPKDDate))
            {
                queryable = queryable.Where(p => p.GPKDDate.Contains(param.GPKDDate));
            }
            if (!string.IsNullOrWhiteSpace(param.PitCodeDate))
            {
                queryable = queryable.Where(p => p.PitCodeDate.Contains(param.PitCodeDate));
            }
            if (param.IsActive != null)
            {
                queryable = queryable.Where(p => p.IsActive == param.IsActive);
            }
            return await PagingList(queryable, param);
        }

        public async Task<ResultWithError> CreateAsync(CompanyInfoInputDTO param)
        {

            try
            {
                var data = Map<CompanyInfoInputDTO, CompanyInfo>(param, new CompanyInfo());
                data.IS_ACTIVE = true;
                var result = await _appContext.CompanyInfos.AddAsync(data);
                await _appContext.SaveChangesAsync();
                return new ResultWithError(data);
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex);
            }
        }

        public async Task<ResultWithError> GetById(int id)
        {
            try
            {
                var rs = await (from p in _appContext.CompanyInfos
                                from o in _appContext.Organizations.Where(o => o.ID == p.ORG_ID).DefaultIfEmpty()
                                from r in _appContext.OtherLists.Where(r => r.ID == p.REGION_ID).DefaultIfEmpty()
                                from i in _appContext.OtherLists.Where(i => i.ID == p.INS_UNIT).DefaultIfEmpty()
                                from pr in _appContext.Provinces.Where(pr => pr.ID == p.PROVINCE_ID).DefaultIfEmpty()
                                from d in _appContext.Districts.Where(d => d.ID == p.DISTRICT_ID).DefaultIfEmpty()
                                from w in _appContext.Wards.Where(w => w.ID == p.WARD_ID).DefaultIfEmpty()
                                from b in _appContext.Banks.Where(b => b.ID == p.BANK_ID).DefaultIfEmpty()
                                from bb in _appContext.BankBranchs.Where(bb => bb.ID == p.BANK_BRANCH_ID).DefaultIfEmpty()
                                from re in _appContext.Employees.Where(re => re.ID == p.REPRESENTATIVE_ID).DefaultIfEmpty()
                                from s in _appContext.Employees.Where(s => s.ID == p.SIGN_ID).DefaultIfEmpty()
                                from rp in _appContext.Positions.Where(s => s.ID == re.POSITION_ID).DefaultIfEmpty()
                                from sp in _appContext.Positions.Where(x => x.ID == s.POSITION_ID).DefaultIfEmpty()
                                from rn in _appContext.OtherLists.Where(x => x.ID == re.NATIONALITY_ID).DefaultIfEmpty()
                                from sn in _appContext.OtherLists.Where(x => x.ID == s.NATIONALITY_ID).DefaultIfEmpty()
                                where p.ID == id
                               select new
                               {
                                   Id = p.ID,
                                   NameVN = p.NAME_VN,
                                   NameEN = p.NAME_EN,
                                   OrgId = p.ORG_ID,
                                   OrgCode = o.CODE,
                                   OrgName = o.NAME,
                                   GPKDAddress = p.GPKD_ADDRESS,
                                   RegionId = p.REGION_ID,
                                   RegionName = r.NAME,
                                   PhoneNumber = p.PHONE_NUMBER,
                                   WorkAddress = p.WORK_ADDRESS,
                                   InsUnit = p.INS_UNIT,
                                   InsUnitName = i.NAME,
                                   ProvinceId = p.PROVINCE_ID,
                                   ProvinceName = pr.NAME,
                                   DistrictId = p.DISTRICT_ID,
                                   DistrictName = d.NAME,
                                   WardId = p.WARD_ID,
                                   WardName = w.NAME,
                                   FileLogo = p.FILE_LOGO,
                                   BankAccount = p.BANK_ACCOUNT,
                                   BankId = p.BANK_ID,
                                   BankName = b.NAME,
                                   BankBranch = p.BANK_BRANCH,
                                   BankBranchId = p.BANK_BRANCH_ID,
                                   BankBranchName = bb.NAME,
                                   FileHeader = p.FILE_HEADER,
                                   PitCode = p.PIT_CODE,
                                   PitCodeChange = p.PIT_CODE_CHANGE,
                                   PitCodeDate = p.PIT_CODE_DATE == null ? null : p.PIT_CODE_DATE.Value.ToString("dd/MM/yyyy"),
                                   FileFooter = p.FILE_FOOTER,
                                   RepresentativeId = p.REPRESENTATIVE_ID,
                                   RepresentativeName = re.FULLNAME,
                                   RepresentativePosition = rp.NAME,
                                   RepresentativeNation = rn.NAME,
                                   SignId = p.SIGN_ID,
                                   SignName = s.FULLNAME,
                                   SignPosition = sp.NAME,
                                   SignNation = sn.NAME,
                                   PitCodePlace = p.PIT_CODE_PLACE,
                                   GPKDNo = p.GPKD_NO,
                                   GPKDDate = p.GPKD_DATE == null ? null : p.GPKD_DATE.Value.ToString("dd/MM/yyyy"),
                                   Website = p.WEBSITE,
                                   Fax = p.FAX,
                                   IsActive = p.IS_ACTIVE,
                                   Note = p.NOTE,
                                   CreateBy = p.CREATE_BY,
                                   UpdatedBy = p.UPDATED_BY,
                                   CreateDate = p.CREATE_DATE,
                                   UpdatedDate = p.UPDATED_DATE,
                               }).FirstOrDefaultAsync();
                return new ResultWithError(rs);
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex.Message);
            }
        }
        public async Task<ResultWithError> UpdateAsync(CompanyInfoInputDTO param)
        {
            try
            {
                var r = _appContext.CompanyInfos.Where(x => x.ID == param.Id).FirstOrDefault();
                if (r == null)
                {
                    return new ResultWithError(404);
                }
                var data = Map<CompanyInfoInputDTO, CompanyInfo>(param, r);
                var result = _appContext.CompanyInfos.Update(data);
                await _appContext.SaveChangesAsync();
                return new ResultWithError(200);
            }
            catch (Exception ex)
            {

                return new ResultWithError(ex);
            }
        }
        public async Task<ResultWithError> ChangeStatusAsync(List<int> ids)
        {
            try
            {
                foreach (var item in ids)
                {
                    var r = _appContext.CompanyInfos.Where(x => x.ID == item).FirstOrDefault();
                    if (r == null)
                    {
                        return new ResultWithError(404);
                    }
                    r.IS_ACTIVE = !r.IS_ACTIVE;
                    var result = _appContext.CompanyInfos.Update(r);
                }
                await _appContext.SaveChangesAsync();
                return new ResultWithError(200);
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex.Message);
            }
        }

        public async Task<ResultWithError> DeleteAsync(List<int> ids)
        {
            try
            {
                var query = from p in _appContext.CompanyInfos where ids.Contains(p.ID) select p;
                foreach (var item in query)
                {
                    _appContext.CompanyInfos.Remove(item);
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
