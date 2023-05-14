using Common.Extensions;
using Common.Interfaces;
using Common.Paging;
using CoreDAL.Models;
using CoreDAL.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;
namespace CoreDAL.Repositories
{
    public interface ISysModuleRepository : IRepository<SysModule>
    {
        Task<PagedResult<SysModuleDTO>> GetAll(SysModuleDTO param);
        Task<ResultWithError> GetById(int Id);
        Task<ResultWithError> CreateAsync(SysModuleInputDTO param);
        Task<ResultWithError> UpdateAsync(SysModuleInputDTO param);
        Task<ResultWithError> ChangeStatusAsync(List<int> ids);
    }
}
