using PayrollDAL.ViewModels;
using PayrollDAL.Models;
using Common.Interfaces;
using Common.Paging;
using Common.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PayrollDAL.Repositories
{
    public interface ISalaryElementRepository : IRepository<SalaryElement>
    {
        Task<PagedResult<SalaryElementDTO>> GetAll(SalaryElementDTO param);
        Task<ResultWithError> GetById(int id);
        Task<ResultWithError> AllowanceToElement(ReferParam param, int type);
        Task<ResultWithError> CreateAsync(SalaryElementInputDTO param);
        Task<ResultWithError> UpdateAsync(SalaryElementInputDTO param);
        Task<ResultWithError> GetSalaryElement(long groupId);
        Task<ResultWithError> GetListGroup();
        Task<ResultWithError> GetSalaryElementSys();
        Task<ResultWithError> GetList(int groupid);
        Task<ResultWithError> GetListCal(int SalaryTypeId);
        Task<ResultWithError> ChangeStatusAsync(List<int> ids);
        Task<ResultWithError> GetListAll();
    }
}
