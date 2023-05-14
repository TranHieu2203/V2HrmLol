using ProfileDAL.ViewModels;
using ProfileDAL.Models;
using Common.Interfaces;
using Common.Paging;
using Common.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace ProfileDAL.Repositories
{
    public interface IPositionPaperRepository : IRepository<PostionPapers>
    {
        Task<PagedResult<PostionPaperDTO>> GetAll(PostionPaperDTO param);
        Task<ResultWithError> CreateAsync(PosPaperInputDTO param);
        Task<ResultWithError> DeleteAsync(List<int> ids);
    }
}
