using Common.Interfaces;
using CoreDAL.Models;
using CoreDAL.ViewModels;
using System.Threading.Tasks;
using Common.Paging;
using Common.Extensions;
using System.Collections.Generic;

namespace CoreDAL.Repositories
{
    public interface ITenantUserPermissionRepository : IRepository<TenantUserPermission>
    {
        /// <summary>
        /// Get pagesing Data AspGroupPermission.
        /// </summary>
        Task<PagedResult<TenantUserPermissionDTO>> GetAll(TenantUserPermissionDTO param, int application);
        /// <summary>
        /// Get All Data By GroupUer Or/And Function.
        /// </summary>
        Task<ResultWithError> GetBy(TenantUserPermissionDTO param, int application);
        /// <summary>
        /// Update Or Create Data By GroupUser and Function.
        /// </summary>
        Task<ResultWithError> UpdateAsync(List<TenantUserPermissionInputDTO> param, int application);
        /// <summary>
        /// Get permission bu grroup user
        /// 
        /// </summary>
        Task<PagedResult<GridFunctionOutput>> GridPermission(GridFunctionInput param, int application);
    }
}
