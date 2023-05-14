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
using System.Dynamic;
using System.IO;
using static System.Net.WebRequestMethods;
using System.Net.Http;
using System.Net.Http.Headers;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using OfficeOpenXml.FormulaParsing.Excel.Functions.Numeric;
using OfficeOpenXml.FormulaParsing.Excel.Functions.Math;
using System.Security.Policy;
using System.Text;
using Newtonsoft.Json;
using OfficeOpenXml.FormulaParsing.Excel.Functions.Text;
using System.Net;
using Microsoft.AspNetCore.Http;
using System.Reflection;
using OfficeOpenXml.FormulaParsing.Excel.Functions.RefAndLookup;
using OfficeOpenXml.FormulaParsing.Excel.Functions.Logical;
using Microsoft.AspNetCore.Hosting;
using System.Configuration;
using Microsoft.Extensions.Hosting.Internal;

namespace ProfileDAL.Repositories
{
    public class CandidateRepository : TLARepository<Candidate>, ICandidateRepository
    {
        private ProfileDbContext _appContext => (ProfileDbContext)_context;
        public CandidateRepository(ProfileDbContext context) : base(context)
        {

        }
        /// <summary>
        /// CMS Get All Data
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public async Task<PagedResult<CandidateScanCVDTO>> GetAll(CandidateScanCVDTO param)
        {
            var queryable = from p in _appContext.CandidateScanCVs
                            select new CandidateScanCVDTO
                            {
                                Id = p.ID,
                                CreateBy = p.CREATE_BY,
                                //Code=p.CODE,
                                Fullname=p.FULLNAME_VN,
                                GenderName=p.GENDER,
                                BirthDate=p.BIRTH_DATE,
                                Address=p.ADDRESS,
                                Email=p.EMAIL,
                                MobilePhone=p.MOBILEPHONE,
                                UpdatedBy = p.UPDATED_BY,
                                CreateDate = p.CREATE_DATE,
                                UpdatedDate = p.UPDATED_DATE,
                            };

            return await PagingList(queryable, param);

        }
     
        public async Task<ResultWithError> GetById(long id)
        {
            try
            {
                var r = await (from p in _appContext.CandidateScanCVs
                               where p.ID == id 
                               select new
                               {
                                   Id = p.ID,
                                   CreateBy = p.CREATE_BY,
                                   //Code = p.CODE,
                                   FullName = p.FULLNAME_VN,
                                   GenderName = p.GENDER,
                                   BirthDate = p.BIRTH_DATE,
                                   Address = p.ADDRESS,
                                   Email = p.EMAIL,
                                   MobilePhone = p.MOBILEPHONE,
                                   UpdatedBy = p.UPDATED_BY,
                                   CreateDate = p.CREATE_DATE,
                                   UpdatedDate = p.UPDATED_DATE,
                                   Description =p.DESCRIPTION,
                                   Skill =p.SKILL,
                               }).FirstOrDefaultAsync();
                return new ResultWithError(r);
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex.Message);
            }
        }

        public async Task<ResultWithError> CreateAsync(CandidateScanCVInputDTO param)
        {
            try
            {
                param.Fullname_VN = param.Fullname;
                param.Gender = param.GenderName;
                var data = Map<CandidateScanCVInputDTO, Candidate>(param, new Candidate());
                //data.NO = No;
                var result = await _appContext.CandidateScanCVs.AddAsync(data);
                await _appContext.SaveChangesAsync();
                return new ResultWithError(data);
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex.Message);
            }
        }
        public async Task<ResultWithError> UpdateAsync(CandidateScanCVInputDTO param)
        {
            try
            {
                var a = _appContext.CandidateScanCVs.Where(x => x.ID == param.Id).Any();
                var aa = _appContext.CandidateScanCVs.Where(x => x.ID == param.Id);
                var r = _appContext.CandidateScanCVs.Where(x => x.ID == param.Id).FirstOrDefault();
                if (r == null)
                {
                    return new ResultWithError(404);
                }
                param.Fullname_VN = param.Fullname;
                param.Gender = param.GenderName;
                var data = Map<CandidateScanCVInputDTO, Candidate>(param, r);
                var result = _appContext.CandidateScanCVs.Update(data);
                await _appContext.SaveChangesAsync();
                return new ResultWithError(200);
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex.Message);
            }
        }

        public async Task<ResultWithError> RemoveAsync(long id)
        {
            try
            {
                var r = _appContext.CandidateScanCVs.Where(x => x.ID == id).FirstOrDefault();
                if (r == null)
                {
                    return new ResultWithError(404);
                }
                // Remove Master
                _appContext.CandidateScanCVs.Remove(r);
                await _appContext.SaveChangesAsync();
                return new ResultWithError(200);
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex.Message);
            }
        }
        public async Task<ResultWithError> ReadFileCVAsync(CandidateScanCVImportDTO param)
        {
            try
            {
                var path1 = param.Environment.ContentRootPath;
                var path2 = "media/documents/" + param.file.FileName;
                var scheme = param.scheme;
                var host = param.host;
                var file = param.file;
                if (file.Length > 0)
                {
                    string FolderPath= Path.Combine(path1, "media/documents/");
                    string filePath = Path.Combine(path1, path2);
                    if (!System.IO.File.Exists(FolderPath))
                    {
                        Directory.CreateDirectory(FolderPath);
                    }
                    using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(fileStream);
                    }
                }
                var _Uri = new Uri($"{scheme}://{host}/{path2}");
                var url = _appContext._config["urlAPICV"];
                string Cvurl = _Uri.AbsoluteUri;
                var dict = new Dictionary<string, string>();
                dict.Add("cv_url", Cvurl);
                var client = new HttpClient();
                var req = new HttpRequestMessage(HttpMethod.Post, url) { Content = new FormUrlEncodedContent(dict) };
                var res = await client.SendAsync(req);
                if (res.StatusCode == HttpStatusCode.OK)
                {
                    object rep = await res.Content.ReadAsStringAsync();
                    //var result = JsonConvert.DeserializeObject<T>(rep);
                    return new ResultWithError(rep);
                }
                return new ResultWithError("NO_DATA_FOUND");
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex.Message + " url:Cvurl");
            }
        }

    }
}
