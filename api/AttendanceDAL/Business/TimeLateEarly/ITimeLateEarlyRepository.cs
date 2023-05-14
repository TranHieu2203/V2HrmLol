using AttendanceDAL.Models;
using AttendanceDAL.ViewModels;
using Common.Interfaces;
using Common.Paging;
using Common.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace AttendanceDAL.Repositories
{
    public interface ITimeLateEarlyRepository : IRepository<TimeLateEarly>
    {
        Task<PagedResult<RegisterOffDTO>> GetAll(RegisterOffDTO param);
        Task<ResultWithError> GetById(int id);
        Task<ResultWithError> CreateAsync(TimeLateEarlyInputDTO param);
        Task<ResultWithError> UpdateAsync(TimeLateEarlyInputDTO param);
       
      

    }
}
