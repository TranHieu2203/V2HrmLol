using ProfileDAL.ViewModels;
using ProfileDAL.Models;
using Common.Interfaces;
using Common.Paging;
using Common.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace ProfileDAL.Repositories
{
    public interface IBankBranchRepository : IRepository<BankBranch>
    {
        Task<PagedResult<BankBranchDTO>> GetAll(BankBranchDTO param);
        Task<ResultWithError> GetById(int id);
        Task<ResultWithError> CreateAsync(BankBranchInputDTO param);
        Task<ResultWithError> UpdateAsync(BankBranchInputDTO param);
        Task<ResultWithError> ChangeStatusAsync(List<int> ids);
        Task<ResultWithError> GetList(int BankId);
        Task<ResultWithError> Delete(int id);
    }
}
