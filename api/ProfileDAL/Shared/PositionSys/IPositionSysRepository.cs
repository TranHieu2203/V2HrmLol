using ProfileDAL.ViewModels;
using ProfileDAL.Models;
using Common.Interfaces;
using Common.Paging;
using Common.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace ProfileDAL.Repositories
{
    public interface IPositionSysRepository : IRepository<PositionSys>
    {
        Task<PagedResult<PositionSysViewDTO>> GetAll(PositionSysViewDTO param);
        Task<ResultWithError> GetById(int id);
        Task<ResultWithError> CreateAsync(PositionSysInputDTO param);
        Task<ResultWithError> UpdateAsync(PositionSysInputDTO param);
        Task<ResultWithError> ChangeStatusAsync(List<int> ids);
        Task<ResultWithError> GetList(int groupId);
        Task<ResultWithError> Delete(int id);
    }
}
