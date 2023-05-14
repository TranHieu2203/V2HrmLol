using PayrollDAL.ViewModels;
using PayrollDAL.Models;
using Common.Interfaces;
using Common.Paging;
using Common.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.IO;

namespace PayrollDAL.Repositories
{
    public interface IKpiEmployeeRepository : IRepository<KpiEmployee>
    {
        Task<PagedResult<KpiEmployeeDTO>> GetAll(KpiEmployeeDTO param);
        Task<ResultWithError> GetById(int id);
        Task<ResultWithError> CreateAsync(KpiEmployeeInputDTO param);
        Task<ResultWithError> UpdateAsync(KpiEmployeeInputDTO param);
        Task<ResultWithError> ChangeStatusAsync(List<int> ids);
        Task<ResultWithError> Delete(List<int> ids);
        Task<ResultWithError> ExportTemplate(KpiEmployeeInput param);
        Task<ResultWithError> ImportFromTemplate(KpiEmployeeImport param);
        Task<ResultWithError> CaclKpiSalary(KpiEmployeeInput param);
        Task<ResultWithError> LockKPI(LockInputDTO param);
        Task<ResultWithError> IsLockKPI(LockInputDTO param);
    }
}
