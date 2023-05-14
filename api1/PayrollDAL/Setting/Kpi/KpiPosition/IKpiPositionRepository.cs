using PayrollDAL.ViewModels;
using PayrollDAL.Models;
using Common.Interfaces;
using Common.Paging;
using Common.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PayrollDAL.Repositories
{
    public interface IKpiPositionRepository : IRepository<KpiPosition>
    {
        Task<PagedResult<KpiPositionDTO>> GetAll(KpiPositionDTO param);
        Task<ResultWithError> GetById(int id);
        Task<ResultWithError> CreateAsync(KpiPositionInputDTO param);
        Task<ResultWithError> Removes(List<long> ids);
    }
}
