using ProfileDAL.ViewModels;
using ProfileDAL.Models;
using Common.Interfaces;
using Common.Paging;
using Common.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace ProfileDAL.Repositories
{
    public interface ISalaryScaleRepository : IRepository<SalaryScale>
    {
        Task<PagedResult<SalaryScaleDTO>> GetAll(SalaryScaleDTO param);
        Task<ResultWithError> GetById(int id);
        Task<ResultWithError> CreateAsync(SalaryScaleInputDTO param);
        Task<ResultWithError> UpdateAsync(SalaryScaleInputDTO param);
        Task<ResultWithError> ChangeStatusAsync(List<int> ids);
        Task<ResultWithError> GetList();
    }
}
