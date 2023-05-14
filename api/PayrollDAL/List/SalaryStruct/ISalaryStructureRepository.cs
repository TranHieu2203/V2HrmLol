using PayrollDAL.ViewModels;
using PayrollDAL.Models;
using Common.Interfaces;
using Common.Paging;
using Common.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace PayrollDAL.Repositories
{
    public interface ISalaryStructureRepository : IRepository<SalaryStructure>
    {
        Task<PagedResult<SalaryStructureDTO>> GetAll(SalaryStructureDTO param);
        Task<ResultWithError> GetById(int id);
        Task<ResultWithError> CreateAsync(SalaryStructureInputDTO param);
        Task<ResultWithError> UpdateAsync(SalaryStructureInputDTO param);
        Task<ResultWithError> GetElement(long salaryTypeId);
        /// <summary>
        /// Get list element salary visible 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<ResultWithError> GetList(int id);
        Task<ResultWithError> GetListImport(int id);
        Task<ResultWithError> QuickUpdate(SalaryStructureInputDTO param);
        Task<ResultWithError> Delete(int id);
    }
}
