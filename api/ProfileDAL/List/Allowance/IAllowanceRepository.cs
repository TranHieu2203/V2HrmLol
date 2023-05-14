using ProfileDAL.ViewModels;
using ProfileDAL.Models;
using Common.Interfaces;
using Common.Paging;
using Common.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace ProfileDAL.Repositories
{
    public interface IAllowanceRepository : IRepository<Allowance>
    {
        Task<PagedResult<AllowanceViewDTO>> GetAll(AllowanceViewDTO param);
        Task<ResultWithError> GetById(int id);
        Task<ResultWithError> CreateAsync(AllowanceInputDTO param);
        Task<ResultWithError> UpdateAsync(AllowanceInputDTO param);
        Task<ResultWithError> ChangeStatusAsync(List<int> ids);
        Task<ResultWithError> GetList();
        Task<ResultWithError> CheckAllowIsUsed(string param);
    }
}
