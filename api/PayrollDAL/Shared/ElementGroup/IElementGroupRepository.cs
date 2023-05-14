using PayrollDAL.ViewModels;
using PayrollDAL.Models;
using Common.Interfaces;
using Common.Paging;
using Common.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace PayrollDAL.Repositories
{
    public interface IElementGroupRepository : IRepository<ElementGroup>
    {
        Task<PagedResult<ElementGroupDTO>> GetAll(ElementGroupDTO param);
        Task<ResultWithError> GetById(int id);
        Task<ResultWithError> CreateAsync(ElementGroupInputDTO param);
        Task<ResultWithError> UpdateAsync(ElementGroupInputDTO param);
        Task<ResultWithError> ChangeStatusAsync(List<int> ids);
        Task<ResultWithError> GetList();
    }
}
