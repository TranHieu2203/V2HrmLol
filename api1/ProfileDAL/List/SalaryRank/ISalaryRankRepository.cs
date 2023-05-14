using ProfileDAL.ViewModels;
using ProfileDAL.Models;
using Common.Interfaces;
using Common.Paging;
using Common.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace ProfileDAL.Repositories
{
    public interface ISalaryRankRepository : IRepository<SalaryRank>
    {
        Task<PagedResult<SalaryRankDTO>> GetAll(SalaryRankDTO param);
        Task<ResultWithError> GetById(int id);
        Task<ResultWithError> CreateAsync(SalaryRankInputDTO param);
        Task<ResultWithError> UpdateAsync(SalaryRankInputDTO param);
        Task<ResultWithError> ChangeStatusAsync(List<int> ids);
        Task<ResultWithError> GetListByScale(int? scaleId);
        Task<ResultWithError> GetRankList();
        Task<ResultWithError> GetRankListAll();
        Task<ResultWithError> UpdateLevelStart(SalaryRankStart param);
    }
}
