using ProfileDAL.Models;
using Common.Interfaces;
using Common.Paging;
using Common.Extensions;
using System.Threading.Tasks;
using ProfileDAL.ViewModels;
using System.Collections.Generic;

namespace ProfileDAL.Repositories
{
    public interface IInsChangeRepository : IRepository<InsChange>
    {
        Task<PagedResult<InsChangeDTO>> GetAll(InsChangeDTO param);
        Task<ResultWithError> GetById(long id);
        Task<ResultWithError> CreateAsync(InsChangeInputDTO param);
        Task<ResultWithError> UpdateAsync(InsChangeInputDTO param);
        Task<ResultWithError> RemoveAsync(List<int> id);
        Task<ResultWithError> TemplateImport(int orgId);
        Task<ResultWithError> ImportTemplate(ImportInsParam param);
        Task<ResultWithError> PortalGetAll();
    }
}
