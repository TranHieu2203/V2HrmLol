using ProfileDAL.ViewModels;
using ProfileDAL.Models;
using Common.Interfaces;
using Common.Paging;
using Common.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace ProfileDAL.Repositories
{
    public interface ISalaryLevelRepository : IRepository<SalaryLevel>
    {
        Task<PagedResult<SalaryLevelDTO>> GetAll(SalaryLevelDTO param);
        Task<ResultWithError> GetById(int id);
        Task<ResultWithError> CreateAsync(SalaryLevelInputDTO param);
        Task<ResultWithError> UpdateAsync(SalaryLevelInputDTO param);
        Task<ResultWithError> ChangeStatusAsync(List<int> ids);
        Task<ResultWithError> GetList(int rankId);
    }
}
