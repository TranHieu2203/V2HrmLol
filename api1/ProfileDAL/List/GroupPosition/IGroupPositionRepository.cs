using ProfileDAL.ViewModels;
using ProfileDAL.Models;
using Common.Interfaces;
using Common.Paging;
using Common.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace ProfileDAL.Repositories
{
    public interface IGroupPositionRepository : IRepository<GroupPosition>
    {
        Task<PagedResult<GroupPositionDTO>> GetAll(GroupPositionDTO param);
        Task<ResultWithError> GetById(int id);
        Task<ResultWithError> CreateAsync(GroupPositionInputDTO param);
        Task<ResultWithError> UpdateAsync(GroupPositionInputDTO param);
        Task<ResultWithError> ChangeStatusAsync(List<int> ids);
        Task<ResultWithError> GetList();
        Task<ResultWithError> Delete(int id);
    }
}
