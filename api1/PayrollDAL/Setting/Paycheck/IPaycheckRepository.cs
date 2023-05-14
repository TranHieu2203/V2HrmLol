using PayrollDAL.ViewModels;
using PayrollDAL.Models;
using Common.Interfaces;
using Common.Paging;
using Common.Extensions;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace PayrollDAL.Repositories
{
    public interface IPaycheckRepository : IRepository<Paycheck>
    {
        Task<PagedResult<PaycheckDTO>> GetAll(PaycheckDTO param);
        Task<ResultWithError> GetById(int id);
        Task<ResultWithError> CreateAsync(PaycheckInputListDTO param);
        Task<ResultWithError> UpdateAsync(PaycheckInputDTO param);
        Task<ResultWithError> QuickUpdate(PaycheckInputDTO param);
        Task<ResultWithError> RemoveAsync(List<int> ids);
    }
}
