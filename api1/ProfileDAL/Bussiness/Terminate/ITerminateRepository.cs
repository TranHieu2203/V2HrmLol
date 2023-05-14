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
    public interface ITerminateRepository : IRepository<Terminate>
    {
        Task<PagedResult<TerminateView>> GetAll(TerminateDTO param);
        Task<ResultWithError> GetById(long id);
        Task<ResultWithError> CreateAsync(TerminateInputDTO param);
        Task<ResultWithError> UpdateAsync(TerminateInputDTO param);
        Task<ResultWithError> Approve(long id);
        Task<ResultWithError> RemoveAsync(List<long> ids);
    }
}
