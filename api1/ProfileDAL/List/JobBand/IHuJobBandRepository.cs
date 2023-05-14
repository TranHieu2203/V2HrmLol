using ProfileDAL.ViewModels;
using ProfileDAL.Models;
using Common.Interfaces;
using Common.Paging;
using Common.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace ProfileDAL.Repositories
{
    public interface IHuJobBandRepository : IRepository<HUJobBand>
    {
        Task<PagedResult<HUJobBandInputDTO>> GetJobBands(HUJobBandInputDTO param);
        Task<ResultWithError> GetJobBand(int id);
        Task<ResultWithError> UpdateAsync(HUJobBandInputDTO param);
        Task<bool> ValidateJobBand(HUJobBandInputDTO param);
        Task<ResultWithError> ChangeStatusAsync(List<int> ids, int status);
        Task<ResultWithError> ChangeStatusAsync(List<int> ids);
        Task<ResultWithError> DeleteAsync(List<int> ids);
        Task<ResultWithError> GetCboJobBand();
    }
}
