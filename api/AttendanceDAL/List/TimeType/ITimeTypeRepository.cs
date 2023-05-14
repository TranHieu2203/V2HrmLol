using AttendanceDAL.Models;
using AttendanceDAL.ViewModels;
using Common.Interfaces;
using Common.Paging;
using Common.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace AttendanceDAL.Repositories
{
    public interface ITimeTypeRepository : IRepository<TimeType>
    {
        Task<PagedResult<TimeTypeDTO>> GetAll(TimeTypeDTO param);
        Task<ResultWithError> GetById(int id);
        Task<ResultWithError> CreateAsync(TimeTypeInputDTO param);
        Task<ResultWithError> UpdateAsync(TimeTypeInputDTO param);
        Task<ResultWithError> ChangeStatusAsync(List<int> ids);
        Task<ResultWithError> GetList();
        Task<ResultWithError> GetListOff();
        Task<ResultWithError> PortalGetListOff();
    }
}
