using Common.Interfaces;
using CoreDAL.Models;
using CoreDAL.ViewModels;
using System.Threading.Tasks;
using Common.Paging;
using Common.Extensions;
using System.Collections.Generic;

namespace CoreDAL.Repositories
{
    public interface ISysPermissionRepository : IRepository<SysPermission>
    {
        Task<PagedResult<SysPermissionDTO>> GetAll(SysPermissionDTO param);
        Task<ResultWithError> CreateAsync(SysPermissionInputDTO param);
        Task<ResultWithError> UpdateAsync(SysPermissionInputDTO param);
        Task<ResultWithError> ChangeStatusAsync(List<int> ids);
        Task<ResultWithError> GetListPermission();
    }
}
