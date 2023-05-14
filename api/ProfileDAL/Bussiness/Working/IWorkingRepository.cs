using ProfileDAL.ViewModels;
using ProfileDAL.Models;
using Common.Interfaces;
using Common.Paging;
using Common.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace ProfileDAL.Repositories
{
    public interface IWorkingRepository : IRepository<Working>
    {
        Task<PagedResult<WorkingDTO>> GetAll(WorkingDTO param);
        Task<PagedResult<WorkingDTO>> GetWorking(WorkingDTO param);
        Task<ResultWithError> GetById(Int64 id);
        Task<ResultWithError> CreateAsync(WorkingInputDTO param);
        Task<ResultWithError> UpdateAsync(WorkingInputDTO param);
        Task<ResultWithError> RemoveAsync(List<long> param);
        Task<ResultWithError> OpenStatus(Int64 id);
        Task<ResultWithError> TemplateImport(int orgId);
        Task<ResultWithError> ImportTemplate(ImportParam param);
        Task<ResultWithError> GetLastWorking(long Id);
        Task<ResultWithError> PortalGetAll();
        Task<ResultWithError> PortalGetBy(long id);
    }
}
