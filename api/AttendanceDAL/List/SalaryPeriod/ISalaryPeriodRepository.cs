using AttendanceDAL.Models;
using AttendanceDAL.ViewModels;
using Common.Interfaces;
using Common.Paging;
using Common.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace AttendanceDAL.Repositories
{
    public interface ISalaryPeriodRepository : IRepository<SalaryPeriod>
    {
        Task<PagedResult<SalaryPeriodDTO>> GetAll(SalaryPeriodDTO param);
        Task<ResultWithError> GetById(int id);
        Task<ResultWithError> CreateAsync(SalaryPeriodInputDTO param);
        Task<ResultWithError> UpdateAsync(SalaryPeriodInputDTO param);
        Task<ResultWithError> ChangeStatusAsync(List<int> ids);
        Task<ResultWithError> GetList(int? Id);
        Task<ResultWithError> GetYear();
        Task<ResultWithError> PortalGetYear();
        Task<ResultWithError> PortalByYear(int year);
    }
}
