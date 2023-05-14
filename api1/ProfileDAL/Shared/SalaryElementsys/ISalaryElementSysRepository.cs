using ProfileDAL.ViewModels;
using ProfileDAL.Models;
using Common.Interfaces;
using Common.Paging;
using Common.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProfileDAL.Repositories
{
    public interface ISalaryElementSysRepository : IRepository<SalaryElementSys>
    {
        Task<PagedResult<SalaryElementSysDTO>> GetAll(SalaryElementSysDTO param);
        Task<ResultWithError> GetById(int id);
        Task<ResultWithError> CreateAsync(SalaryElementSysInputDTO param);
        Task<ResultWithError> UpdateAsync(SalaryElementSysInputDTO param);
        Task<ResultWithError> GetSalaryElement(GroupElementSysDTO param);
        Task<ResultWithError> GetListGroup();
        Task<ResultWithError> GetList(int groupid);
        Task<ResultWithError> GetListCal(int SalaryTypeId);
        Task<ResultWithError> ChangeStatusAsync(List<int> ids);
    }
}
