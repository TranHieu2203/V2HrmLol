using PayrollDAL.ViewModels;
using PayrollDAL.Models;
using Common.Interfaces;
using Common.Paging;
using Common.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PayrollDAL.Repositories
{
    public interface IAdvanceRepository : IRepository<Advance>
    {
        Task<PagedResult<AdvanceDTO>> GetAll(AdvanceDTO param);
        Task<ResultWithError> GetById(int id);
        Task<ResultWithError> CreateAsync(AdvanceInputDTO param);
        Task<ResultWithError> UpdateAsync(AdvanceInputDTO param);
        Task<ResultWithError> Delete(List<int> ids);
        Task<ResultWithError> TemplateImport(AdvanceTmpParam param);
        Task<ResultWithError> ImportTemplate(AdvanceTmpParam param);
    }
}
