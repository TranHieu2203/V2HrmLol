using PayrollDAL.ViewModels;
using PayrollDAL.Models;
using Common.Interfaces;
using Common.Paging;
using Common.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PayrollDAL.Repositories
{
    public interface IKpiTargetRepository : IRepository<KpiTarget>
    {
        Task<PagedResult<KpiTargetOutDTO>> GetAll(KpiTargetDTO param);
        Task<ResultWithError> GetById(int id);
        Task<ResultWithError> CreateAsync(KpiTargetInputDTO param);
        Task<ResultWithError> UpdateAsync(KpiTargetInputDTO param);
        // Task<ResultWithError> GetList(int groupid, int? typeId);
        Task<ResultWithError> GetList();
        Task<ResultWithError> GetListFomula();
        Task<ResultWithError> ChangeStatusAsync(List<int> ids);
        Task<ResultWithError> QuickUpdate(KpiTargetQickDTO param);
    }
}
