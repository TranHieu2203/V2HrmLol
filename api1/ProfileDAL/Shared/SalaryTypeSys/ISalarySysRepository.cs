using ProfileDAL.ViewModels;
using ProfileDAL.Models;
using Common.Interfaces;
using Common.Paging;
using Common.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace ProfileDAL.Repositories
{
    public interface ISalarySysRepository : IRepository<SalaryTypeSys>
    {
        Task<PagedResult<SalaryTypeSysDTO>> GetAll(SalaryTypeSysDTO param);
        Task<ResultWithError> GetById(int id);
        Task<ResultWithError> CreateAsync(SalaryTypeSysInputDTO param);
        Task<ResultWithError> UpdateAsync(SalaryTypeSysInputDTO param);
        Task<ResultWithError> ChangeStatusAsync(List<int> ids);
        Task<ResultWithError> GetList(long areaId);
    }
}
