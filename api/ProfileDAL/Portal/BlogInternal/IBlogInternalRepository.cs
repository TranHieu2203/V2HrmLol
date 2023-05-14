using ProfileDAL.ViewModels;
using ProfileDAL.Models;
using Common.Interfaces;
using Common.Paging;
using Common.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace ProfileDAL.Repositories
{
    public interface IBlogInternalRepository : IRepository<BlogInternal>
    {
        Task<PagedResult<BlogInternalDTO>> GetAll(BlogInternalDTO param);
        Task<ResultWithError> GetById(int id);
        Task<ResultWithError> CreateAsync(BlogInternalInputDTO param);
        Task<ResultWithError> UpdateAsync(BlogInternalInputDTO param);
        Task<ResultWithError> ChangeStatusAsync(List<int> ids);
        Task<PagedResult<BlogPortalDTO>> PortalGetList(Pagings param);
        Task<ResultWithError> PortalGetById(int id);
        Task<ResultWithError> PortalGetNewest();
        Task<List<NotifyView>> PortalNotify();
        Task<ResultWithError> PortalWatched(long id);
        Task<ResultWithError> PortalHomeNew();
        Task<ResultWithError> PortalHomeNotify();
        Task<ResultWithError> PortalApproveNotify();
    }
}
