using AttendanceDAL.Models;
using AttendanceDAL.ViewModels;
using Common.Interfaces;
using Common.Paging;
using Common.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace AttendanceDAL.Repositories
{
    public interface IHolidayRepository : IRepository<Holiday>
    {
        Task<PagedResult<HolidayDTO>> GetAll(HolidayDTO param);
        Task<ResultWithError> GetById(int id);
        Task<ResultWithError> CreateAsync(HolidayInputDTO param);
        Task<ResultWithError> UpdateAsync(HolidayInputDTO param);
        Task<ResultWithError> ChangeStatusAsync(List<int> ids);
        Task<ResultWithError> GetList();
    }
}
