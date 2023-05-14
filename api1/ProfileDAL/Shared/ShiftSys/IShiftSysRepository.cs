using Common.Interfaces;
using Common.Paging;
using Common.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;
using ProfileDAL.ViewModels;
using ProfileDAL.Models;

namespace ProfileDAL.Repositories
{
    public interface IShiftSysRepository : IRepository<ShiftSys>
    {
        Task<PagedResult<ShiftSysDTO>> GetAll(ShiftSysDTO param);
        Task<ResultWithError> GetById(int id);
        Task<ResultWithError> CreateAsync(ShiftSysInputDTO param);
        Task<ResultWithError> UpdateAsync(ShiftSysInputDTO param);
        Task<ResultWithError> ChangeStatusAsync(List<int> ids);
        Task<ResultWithError> GetList();
        Task<ResultWithError> GetShiftCycle(int id);
        Task<ResultWithError> UpdateShiftCycle(ShiftCycleSysInput param);
    }
}
