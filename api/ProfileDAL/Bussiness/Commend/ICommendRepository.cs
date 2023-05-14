using ProfileDAL.Models;
using Common.Interfaces;
using Common.Paging;
using Common.Extensions;
using System.Threading.Tasks;
using ProfileDAL.ViewModels;

namespace ProfileDAL.Repositories
{
    public interface ICommendRepository : IRepository<Commend>
    {
        Task<PagedResult<CommendDTO>> GetAll(CommendDTO param);
        Task<ResultWithError> GetById(long id);
        Task<ResultWithError> CreateAsync(CommendInputDTO param);
        Task<ResultWithError> UpdateAsync(CommendInputDTO param);
        Task<ResultWithError> RemoveAsync(long id);
        Task<ResultWithError> OpenStatus(long id);
        Task<ResultWithError> Approve(long id);
        Task<ResultWithError> PortalGetAll();
        Task<ResultWithError> PortalGetBy(long id);
    }
}
