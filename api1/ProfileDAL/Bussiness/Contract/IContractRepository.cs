using ProfileDAL.ViewModels;
using ProfileDAL.Models;
using Common.Interfaces;
using Common.Paging;
using Common.Extensions;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;

namespace ProfileDAL.Repositories
{
    public interface IContractRepository : IRepository<Contract>
    {
        Task<PagedResult<ContractDTO>> GetAll(ContractDTO param);
        Task<ResultWithError> GetById(long id);
        Task<ResultWithError> CreateAsync(ContractInputDTO param);
        Task<ResultWithError> UpdateAsync(ContractInputDTO param);
        Task<ResultWithError> RemoveAsync(List<long> param);
        Task<ResultWithError> OpenStatus(long id);
        Task<ResultWithError> TemplateImport(int orgId);
        Task<ResultWithError> ImportTemplate(ImportCTractParam param);
        Task<ResultWithError> PortalGetAll();
        Task<ResultWithError> PortalGetBy(long id);
    }
}
