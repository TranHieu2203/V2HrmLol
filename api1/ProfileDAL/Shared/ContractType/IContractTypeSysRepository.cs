using ProfileDAL.ViewModels;
using ProfileDAL.Models;
using Common.Interfaces;
using Common.Paging;
using Common.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace ProfileDAL.Repositories
{
    public interface IContractTypeSysRepository : IRepository<ContractTypeSys>
    {
        Task<PagedResult<ContractTypeSysViewDTO>> GetAll(ContractTypeSysViewDTO param);
        Task<ResultWithError> GetById(int id);
        Task<ResultWithError> CreateAsync(ContractTypeSysInputDTO param);
        Task<ResultWithError> UpdateAsync(ContractTypeSysInputDTO param);
        Task<ResultWithError> ChangeStatusAsync(List<int> ids);
        Task<ResultWithError> GetList();
    }
}
