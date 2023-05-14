using ProfileDAL.Models;
using Common.Interfaces;
using Common.Paging;
using Common.Extensions;
using System.Threading.Tasks;
using ProfileDAL.ViewModels;

namespace ProfileDAL.Repositories
{
    public interface IInsInformationRepository : IRepository<InsInformation>
    {
        Task<PagedResult<InsInformationDTO>> GetAll(InsInformationDTO param);
        Task<ResultWithError> GetById(long id);
        Task<ResultWithError> CreateAsync(InsInformationInputDTO param);
        Task<ResultWithError> UpdateAsync(InsInformationInputDTO param);
    }
}
