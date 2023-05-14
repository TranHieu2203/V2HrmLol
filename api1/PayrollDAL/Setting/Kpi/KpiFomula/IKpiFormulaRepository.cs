using PayrollDAL.ViewModels;
using PayrollDAL.Models;
using Common.Interfaces;
using Common.Paging;
using Common.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PayrollDAL.Repositories
{
    public interface IKpiFormulaRepository : IRepository<KpiFormula>
    {
        Task<PagedResult<KpiFormulaDTO>> GetAll(KpiFormulaDTO param);
        Task<ResultWithError> GetById(int id);
        Task<ResultWithError> UpdateAsync(KpiFormulaCreateDTO param);
        Task<ResultWithError> GetList();
        Task<ResultWithError> ChangeStatusAsync(List<int> ids);
    }
}
