using Common.Interfaces;
using CoreDAL.Models;
using CoreDAL.ViewModels;
using System.Threading.Tasks;
using Common.Paging;
using Common.Extensions;
using System.Collections.Generic;

namespace CoreDAL.Repositories
{
    public interface ISysGroupUserRepository : IRepository<SysGroupUser>
    {
        Task<PagedResult<SysGroupUserDTO>> GetAll(SysGroupUserDTO param);
        Task<ResultWithError> GetById(int id);
        Task<ResultWithError> CreateAsync(SysGroupUserInputDTO param);
        Task<ResultWithError> UpdateAsync(SysGroupUserInputDTO param);
        Task<ResultWithError> ChangeStatusAsync(List<int> ids);
        Task<ResultWithError> GetList();
    }
}
