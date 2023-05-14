using ProfileDAL.ViewModels;
using ProfileDAL.Models;
using Common.Interfaces;
using Common.Paging;
using Common.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace ProfileDAL.Repositories
{
    public interface IWelfareRepository : IRepository<Welfare>
    {
        Task<PagedResult<WelfareDTO>> GetAll(WelfareDTO param);
        Task<ResultWithError> GetById(int id);
        Task<ResultWithError> CreateAsync(WelfareInputDTO param);
        Task<ResultWithError> UpdateAsync(WelfareInputDTO param);
        Task<ResultWithError> ChangeStatusAsync(List<int> ids);
    }
}
