using Common.Interfaces;
using CoreDAL.Models;
using CoreDAL.ViewModels;
using System.Threading.Tasks;
using Common.Paging;
using Common.Extensions;
using System.Collections.Generic;

namespace CoreDAL.Repositories
{
    public interface ISysGroupFunctionRepository : IRepository<SysGroupFunction>
    {
        Task<PagedResult<SysGroupFunctionDTO>> GetAll(SysGroupFunctionDTO param);
        Task<ResultWithError> GetById(int id);
        Task<ResultWithError> CreateAsync(SysGroupFunctionInputDTO param);
        Task<ResultWithError> UpdateAsync(SysGroupFunctionInputDTO param);
        Task<ResultWithError> ChangeStatusAsync(List<int> ids);
    }
}
