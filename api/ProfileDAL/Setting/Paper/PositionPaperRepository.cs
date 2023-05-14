﻿using System.Threading.Tasks;
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
    public class PositionPaperRepository : TLARepository<PostionPapers>, IPositionPaperRepository
    {
        private ProfileDbContext _appContext => (ProfileDbContext)_context;
        public PositionPaperRepository(ProfileDbContext context) : base(context)
        {

        }
        /// <summary>
        /// CMS Get All Data
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public async Task<PagedResult<PostionPaperDTO>> GetAll(PostionPaperDTO param)
        {
            try
            {
                var queryable = from p in _appContext.PostionPaperses
                                join o in _appContext.OtherLists on p.PAPER_ID equals o.ID
                                
                                orderby p.ID
                                select new PostionPaperDTO
                                {
                                    Id = p.ID,
                                    PaperName = o.NAME,
                                    PosId = p.POS_ID,
                                    CreateBy = p.CREATE_BY,
                                    CreateDate = p.CREATE_DATE
                                };

                if (param.PosId != 0)
                {
                    queryable = queryable.Where(p => p.PosId == param.PosId);
                }
                if (param.PaperName != null)
                {
                    queryable = queryable.Where(p => p.PaperName == param.PaperName);
                }

                return await PagingList(queryable, param);
            }
            catch (Exception ex)
            {

                throw;
            }
            
        }

        public async Task<ResultWithError> CreateAsync(PosPaperInputDTO param)
        {
            try
            {

                var data = new List<PostionPapers>();
                for (int i = 0; i < param.PaperId.Count; i++)
                {
                    var chkr = _appContext.PostionPaperses.Where(x => x.PAPER_ID == param.PaperId[i] && x.POS_ID == param.PosId).Count();
                    if (chkr == 0)
                    {
                        var r = new PostionPapers();
                        r.POS_ID = param.PosId;
                        r.PAPER_ID = param.PaperId[i];
                        data.Add(r);
                    }
                }
                if (data.Count > 0)
                {
                    await _appContext.PostionPaperses.AddRangeAsync(data);
                    await _appContext.SaveChangesAsync();
                }
                return new ResultWithError(200);
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex);
            }
        }

        /// <summary>
        /// Delete 
        /// </summary>
        /// <param name="ids"></param>
        /// <returns></returns>
        public async Task<ResultWithError> DeleteAsync(List<int> ids)
        {
            try
            {
                foreach (var item in ids)
                {
                    var r = _appContext.PostionPaperses.Where(x => x.ID == item ).FirstOrDefault();
                    if (r != null)
                    {
                        _appContext.PostionPaperses.Remove(r);
                    }
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
