using ProfileDAL.ViewModels;
using ProfileDAL.Models;
using Common.Interfaces;
using Common.Paging;
using Common.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace ProfileDAL.Repositories
{
    public interface ISalaryStructureSysRepository : IRepository<SalaryStructSys>
    {
        Task<PagedResult<SalaryStructureSysDTO>> GetAll(SalaryStructureSysDTO param);
        Task<ResultWithError> GetById(int id);
        Task<ResultWithError> CreateAsync(SalaryStructureSysInputDTO param);
        Task<ResultWithError> UpdateAsync(SalaryStructureSysInputDTO param);
        Task<ResultWithError> GetElement(long salaryTypeId);
        /// <summary>
        /// Get list element salary visible 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<ResultWithError> GetList(int id);
    }
}
