using ProfileDAL.ViewModels;
using ProfileDAL.Models;
using Common.Interfaces;
using Common.Paging;
using Common.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace ProfileDAL.Repositories
{
    public interface IHuJobRepository : IRepository<HUJob>
    {
        Task<PagedResult<HUJobInputDTO>> GetJobs(HUJobInputDTO param);
        Task<ResultWithError> GetJob(int id);
        Task<ResultWithError> UpdateAsync(HUJobInputDTO param);
        Task<bool> ValidateJob(HUJobInputDTO param);
        Task<ResultWithError> ChangeStatusAsync(List<int> ids, string status, string userName);
        Task<ResultWithError> ChangeStatusAsync(List<int> ids, string userName);
        Task<ResultWithError> DeleteAsync(List<int> ids);
    }
}
