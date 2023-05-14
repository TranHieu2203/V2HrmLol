using System.Threading.Tasks;
using Common.Paging;
using HRProcessDAL.EntityFrameworkCore;
using HRProcessDAL.ViewModels;
using HRProcessDAL.Models;
using System.Linq;
using Common.Repositories;
using Common.Extensions;
using System.Collections.Generic;
using System;

namespace HRProcessDAL.Repositories
{
    public class HRProcessRepository : TLARepository<SE_HR_PROCESS_TYPE>, IHRProcessRepository
    {
        private HRProcessDbContext _appContext => (HRProcessDbContext)_context;
        public HRProcessRepository(HRProcessDbContext context) : base(context)
        {

        }
        /// <summary>
        /// CMS Get All Data
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public async Task<PagedResult<SeHrProcessTypeDTO>> GetAll(SeHrProcessTypeDTO param)
        {

            var queryable = from p in _appContext.SeHrProcessType
                            
                            orderby p.CODE
                            select new SeHrProcessTypeDTO
                            {
                                Id = p.ID,
                                Code = p.CODE,
                                Name = p.NAME
                            };

            return await PagingList(queryable, param);
        }

       
    }
}
