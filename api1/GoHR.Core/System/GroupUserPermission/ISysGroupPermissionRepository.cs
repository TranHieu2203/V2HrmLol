using Common.Interfaces;
using CoreDAL.Models;
using CoreDAL.ViewModels;
using System.Threading.Tasks;
using Common.Paging;
using Common.Extensions;
using System.Collections.Generic;

namespace CoreDAL.Repositories
{
    public interface ISysGroupPermissionRepository : IRepository<SysGroupPermission>
    {
        /// <summary>
        /// Get pagesing Data AspGroupPermission.
        /// </summary>
        Task<PagedResult<SysGroupPermissionDTO>> GetAll(SysGroupPermissionDTO param);
        /// <summary>
        /// Get All Data By GroupUer Or/And Function.
        /// </summary>
        Task<ResultWithError> GetBy(SysGroupPermissionDTO param);
        /// <summary>
        /// Update Or Create Data By GroupUser and Function.
        /// </summary>
        Task<ResultWithError> UpdateAsync(List<GroupPermissionInputDTO> param);

        /// <summary>
        /// Get permission bu grroup user
        /// 
        /// </summary>
        Task<PagedResult<GridFunctionOutput>> GridPermission(GridFunctionInput param);
    }
}
