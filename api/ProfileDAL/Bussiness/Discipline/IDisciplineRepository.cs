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
    public interface IDisciplineRepository : IRepository<Discipline>
    {
        Task<PagedResult<DisciplineDTO>> GetAll(DisciplineDTO param);
        Task<ResultWithError> GetById(long id);
        Task<ResultWithError> CreateAsync(DisciplineInputDTO param);
        Task<ResultWithError> UpdateAsync(DisciplineInputDTO param);
        Task<ResultWithError> RemoveAsync(long id);
        Task<ResultWithError> OpenStatus(long id);
        Task<ResultWithError> Approve(long id);
        Task<ResultWithError> PortalGetAll();
        Task<ResultWithError> PortalGetBy(long id);
    }
}
