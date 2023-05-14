using PayrollDAL.ViewModels;
using PayrollDAL.Models;
using Common.Interfaces;
using Common.Paging;
using Common.Extensions;
using System.Threading.Tasks;
using System.Dynamic;
using System.Collections.Generic;

namespace PayrollDAL.Repositories
{
    public interface ISalaryImportRepository : IRepository<SalaryImport>
    {
       
        Task<ResultWithError> ExportTemplate(SalImpSearchParam param);
        Task<ResultWithError> ImportTemplate(SalImpImportParam param);
        Task<PagedResult<ExpandoObject>> GetAll(SalImportDTO param);
        Task<ResultWithError> Delete(SalImportDelParam param);
        
    }
}
