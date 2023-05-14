using AttendanceDAL.Models;
using AttendanceDAL.ViewModels;
using Common.Interfaces;
using Common.Paging;
using Common.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace AttendanceDAL.Repositories
{
    public interface IOverTimeRepository : IRepository<OverTime>
    {
        
        Task<PagedResult<OverTimeDTO>> GetAll(OverTimeDTO param);
        Task<ResultWithError> CreateAsync(OverTimeCreateDTO param);
        Task<ResultWithError> UpdateAsync(OverTimeInputDTO param);
        Task<ResultWithError> ChangeStatusAsync(List<int> ids, int StatusId);
        Task<ResultWithError> Delete(List<int> ids);
        Task<ResultWithError> UpdateConfig(OverTimeConfigDTO param);
        Task<ResultWithError> GetConfig();
        
    }
}
