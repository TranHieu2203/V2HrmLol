using AttendanceDAL.Models;
using AttendanceDAL.ViewModels;
using Common.Interfaces;
using Common.Paging;
using Common.Extensions;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace AttendanceDAL.Repositories
{
    public interface IEntitlementEditRepository : IRepository<EntitlementEdit>
    {

        Task<PagedResult<EntitlementEditDTO>> GetAll(EntitlementEditDTO param);
        Task<ResultWithError> CreateAsync(EntitlementEditInputDTO param);
        Task<ResultWithError> UpdateAsync(EntitlementEditInputDTO param);
        Task<ResultWithError> Delete(List<int> ids);
        Task<ResultWithError> GetBy(int id);
        Task<ResultWithError> ExportTemplate(ParaOrg param);
        Task<ResultWithError> ImportTemplate(EntitlementEditParam param);
        Task<ResultWithError> PortalEntilmentGet();
    }
}
