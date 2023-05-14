using ProfileDAL.ViewModels;
using ProfileDAL.Models;
using Common.Interfaces;
using Common.Paging;
using Common.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace ProfileDAL.Repositories
{
    public interface IBankRepository : IRepository<Bank>
    {
        Task<PagedResult<BankDTO>> GetAll(BankDTO param);
        Task<ResultWithError> GetById(int id);
        Task<ResultWithError> CreateAsync(BankInputDTO param);
        Task<ResultWithError> UpdateAsync(BankInputDTO param);
        Task<ResultWithError> ChangeStatusAsync(List<int> ids);
        Task<ResultWithError> GetList();
        Task<ResultWithError> Delete(int id);
    }
}
