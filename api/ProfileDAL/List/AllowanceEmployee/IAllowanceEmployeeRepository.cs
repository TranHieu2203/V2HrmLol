using ProfileDAL.ViewModels;
using ProfileDAL.Models;
using Common.Interfaces;
using Common.Paging;
using Common.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace ProfileDAL.Repositories
{
    public interface IAllowanceEmpRepository : IRepository<AllowanceEmp>
    {
        Task<PagedResult<AllowanceEmpDTO>> GetAll(AllowanceEmpDTO param);
        Task<ResultWithError> GetById(int id);
        Task<ResultWithError> CreateAsync(AllowanceEmpInputDTO param);
        Task<ResultWithError> UpdateAsync(AllowanceEmpInputDTO param);
        Task<ResultWithError> ChangeStatusAsync(List<int> ids);
        Task<ResultWithError> RemoteAsync(List<int> ids);


    }
}
