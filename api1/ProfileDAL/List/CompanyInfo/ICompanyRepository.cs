using ProfileDAL.ViewModels;
using ProfileDAL.Models;
using Common.Interfaces;
using Common.Paging;
using Common.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace ProfileDAL.Repositories
{
    public interface ICompanyInfoRepository : IRepository<CompanyInfo>
    {
        Task<PagedResult<CompanyInfoDTO>> GetAll(CompanyInfoDTO param);
        Task<ResultWithError> CreateAsync(CompanyInfoInputDTO param);
        Task<ResultWithError> GetById(int id);
        Task<ResultWithError> UpdateAsync(CompanyInfoInputDTO param);
        Task<ResultWithError> ChangeStatusAsync(List<int> ids);
        Task<ResultWithError> DeleteAsync(List<int> ids);
    }
}
