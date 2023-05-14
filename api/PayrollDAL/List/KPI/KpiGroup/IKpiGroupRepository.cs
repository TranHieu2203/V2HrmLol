using PayrollDAL.ViewModels;
using PayrollDAL.Models;
using Common.Interfaces;
using Common.Paging;
using Common.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PayrollDAL.Repositories
{
    public interface IKpiGroupRepository : IRepository<KpiGroup>
    {
        Task<PagedResult<KpiGroupOutDTO>> GetAll(KpiGroupDTO param);
        Task<ResultWithError> GetById(int id);
        Task<ResultWithError> CreateAsync(KpiGroupInputDTO param);
        Task<ResultWithError> UpdateAsync(KpiGroupInputDTO param);
        Task<ResultWithError> GetList();
        Task<ResultWithError> ChangeStatusAsync(List<int> ids);
    }
}
