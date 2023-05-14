using AttendanceDAL.Models;
using AttendanceDAL.ViewModels;
using Common.Interfaces;
using Common.Paging;
using Common.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace AttendanceDAL.Repositories
{
    public interface IShiftRepository : IRepository<Shift>
    {
        Task<PagedResult<ShiftDTO>> GetAll(ShiftDTO param);
        Task<ResultWithError> GetById(int id);
        Task<ResultWithError> CreateAsync(ShiftInputDTO param);
        Task<ResultWithError> UpdateAsync(ShiftInputDTO param);
        Task<ResultWithError> ChangeStatusAsync(List<int> ids);
        Task<ResultWithError> GetList(int type);
        Task<ResultWithError> GetListToImport();
        Task<ResultWithError> GetShiftCycle(int id);
        Task<ResultWithError> UpdateShiftCycle(ShiftCycleInput param);
    }
}
