using ProfileDAL.ViewModels;
using ProfileDAL.Models;
using Common.Interfaces;
using Common.Paging;
using Common.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace ProfileDAL.Repositories
{
    public interface IRoomRepository : IRepository<Room>
    {
        Task<PagedResult<RoomDTO>> GetAll(RoomDTO param);
        Task<ResultWithError> GetById(int id);
        Task<ResultWithError> CreateAsync(RoomInputDTO param);
        Task<ResultWithError> UpdateAsync(RoomInputDTO param);
        Task<ResultWithError> ChangeStatusAsync(List<int> ids);
        Task<ResultWithError> GetList();
        Task<ResultWithError> Remove(int id);
    }
}
