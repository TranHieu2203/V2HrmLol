using ProfileDAL.ViewModels;
using ProfileDAL.Models;
using Common.Interfaces;
using Common.Paging;
using Common.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace ProfileDAL.Repositories
{
    public interface IGroupPositionSysRepository : IRepository<GroupPositionSys>
    {
        Task<PagedResult<GroupPositionSysDTO>> GetAll(GroupPositionSysDTO param);
        Task<ResultWithError> GetById(int id);
        Task<ResultWithError> CreateAsync(GroupPositionSysInputDTO param);
        Task<ResultWithError> UpdateAsync(GroupPositionSysInputDTO param);
        Task<ResultWithError> ChangeStatusAsync(List<int> ids);
        Task<ResultWithError> GetList();
        Task<ResultWithError> GetListByArea(int id);
        Task<ResultWithError> Delete(int id);
    }
}
