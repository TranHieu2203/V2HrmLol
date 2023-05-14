using ProfileDAL.ViewModels;
using ProfileDAL.Models;
using Common.Interfaces;
using Common.Paging;
using Common.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace ProfileDAL.Repositories
{
    public interface IInsuranceTypeRepository : IRepository<InsuranceType>
    {
        Task<PagedResult<InsuranceTypeDTO>> GetAll(InsuranceTypeDTO param);
        Task<ResultWithError> GetById(int id);
        Task<ResultWithError> CreateAsync(InsuranceTypeInputDTO param);
        Task<ResultWithError> UpdateAsync(InsuranceTypeInputDTO param);
        Task<ResultWithError> ChangeStatusAsync(List<int> ids);
        Task<ResultWithError> GetList();
    }
}
