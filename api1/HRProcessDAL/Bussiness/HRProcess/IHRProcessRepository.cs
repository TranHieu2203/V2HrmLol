using Common.BaseRequest;
using Common.Extensions;
using Common.Interfaces;
using Common.Paging;
using HRProcessDAL.Models;
using HRProcessDAL.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HRProcessDAL.Repositories
{
    public interface IHRProcessRepository : IRepository<SE_HR_PROCESS_TYPE>
    {
        Task<PagedResult<SeHrProcessTypeDTO>> GetAll(SeHrProcessTypeDTO param);
       
    }
}
