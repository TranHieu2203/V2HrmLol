using Common.Interfaces;
using CoreDAL.Models;
using CoreDAL.ViewModels;
using System.Threading.Tasks;
using Common.Paging;
using Common.Extensions;
using System.Collections.Generic;

namespace CoreDAL.Repositories
{
    public interface ITenantGroupRepository : IRepository<TenantGroup>
    {
        Task<PagedResult<TenantGroupDTO>> GetAll(TenantGroupDTO param, int application);
        Task<ResultWithError> GetById(int id, int application);
        Task<ResultWithError> CreateAsync(TenantGroupInputDTO param, int application);
        Task<ResultWithError> UpdateAsync(TenantGroupInputDTO param, int application);
        Task<ResultWithError> ChangeStatusAsync(List<int> ids, int application);
        Task<ResultWithError> GetListGroup(int application);
    }
}
