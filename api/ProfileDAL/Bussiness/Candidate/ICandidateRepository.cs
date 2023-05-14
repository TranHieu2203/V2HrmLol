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
    public interface ICandidateRepository : IRepository<Candidate>
    {
        Task<PagedResult<CandidateScanCVDTO>> GetAll(CandidateScanCVDTO param);
        Task<ResultWithError> GetById(long id);
        Task<ResultWithError> CreateAsync(CandidateScanCVInputDTO param);
        Task<ResultWithError> UpdateAsync(CandidateScanCVInputDTO param);
        Task<ResultWithError> RemoveAsync(long id);

        Task<ResultWithError> ReadFileCVAsync(CandidateScanCVImportDTO param);

    }
}
