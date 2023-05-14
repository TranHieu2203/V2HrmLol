using Common.Interfaces;
using CoreDAL.Models;
using System.Threading.Tasks;
using Common.Paging;
using Common.Extensions;
using System.Collections.Generic;

namespace CoreDAL.Repositories
{
    public interface ITenantUserRepository : IRepository<TenantUser>
    {
        Task<PagedResult<TenantUserResponDTO>> GetAll(TenantUserDTO param);
        Task<ResultWithError> GetById(int id);
        Task<ResultWithError> CreateAsync(TenantUserInputDTO param);
        Task<ResultWithError> UpdateAsync(TenantUserInputDTO param);
        Task<ResultWithError> ChangeStatusAsync(List<int> ids, int application);
        Task<ResultWithError> LockTenantUser(List<string> ids);
        Task<ResultWithError> GetListGroup(int application);
        Task<ResultWithError> GetListByTenant(int? groupId);
        Task<ResultWithError> TemplateImport();
        Task<ResultWithError> ImportUser(ImportUserParam param);
        Task<ResultWithError> ClearEquitment(EquitmentParam param);
    }
}
