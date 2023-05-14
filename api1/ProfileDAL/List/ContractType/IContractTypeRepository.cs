using ProfileDAL.ViewModels;
using ProfileDAL.Models;
using Common.Interfaces;
using Common.Paging;
using Common.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace ProfileDAL.Repositories
{
    public interface IContractTypeRepository : IRepository<ContractType>
    {
        Task<PagedResult<ContractTypeViewDTO>> GetAll(ContractTypeViewDTO param);
        Task<ResultWithError> GetById(int id);
        Task<ResultWithError> CreateAsync(ContractTypeInputDTO param);
        Task<ResultWithError> UpdateAsync(ContractTypeInputDTO param);
        Task<ResultWithError> ChangeStatusAsync(List<int> ids);
        Task<ResultWithError> GetList();
    }
}
