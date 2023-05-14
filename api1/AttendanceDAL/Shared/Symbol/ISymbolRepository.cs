using AttendanceDAL.Models;
using AttendanceDAL.ViewModels;
using Common.Interfaces;
using Common.Paging;
using Common.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace AttendanceDAL.Repositories
{
    public interface ISymbolRepository : IRepository<Symbol>
    {
        Task<PagedResult<SymbolDTO>> GetAll(SymbolDTO param);
        Task<ResultWithError> GetById(int id);
        Task<ResultWithError> CreateAsync(SymbolInputDTO param);
        Task<ResultWithError> UpdateAsync(SymbolInputDTO param);
        Task<ResultWithError> ChangeStatusAsync(List<int> ids);
        Task<ResultWithError> GetList();
    }
}
