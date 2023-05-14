using Common.Interfaces;
using CoreDAL.Models;
using CoreDAL.ViewModels;
using System.Threading.Tasks;
using Common.Paging;
using Common.Extensions;
using System.Collections.Generic;

namespace CoreDAL.Repositories
{
    public interface ISysFunctionRepository : IRepository<SysFunction>
    {
        Task<PagedResult<SysFunctionDTO>> GetAll(SysFunctionDTO param);
        Task<ResultWithError> GetById(int Id);
        Task<ResultWithError> CreateAsync(SysFunctionInputDTO param);
        Task<ResultWithError> UpdateAsync(SysFunctionInputDTO param);
        Task<ResultWithError> ChangeStatusAsync(List<int> ids);
    }
}
