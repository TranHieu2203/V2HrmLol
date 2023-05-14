using ProfileDAL.ViewModels;
using ProfileDAL.Models;
using Common.Interfaces;
using Common.Paging;
using Common.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Dynamic;
using System.Data;

namespace ProfileDAL.Repositories
{
    public interface IFormulaSysRepository : IRepository<FormulaSys>
    {
        /// <summary>
        /// Get list luong cua nhan vien theo phong ban va ky luong
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        Task<PagedResult<ExpandoObject>> ListPayrollSum(PayrollSysSumDTO param);
        /// <summary>
        /// Get list luong cua nhan vien theo phong ban va ky luong
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        Task<List<ExpandoObject>> MBPayrollSum(PayrollSysInputMobile param);
        Task<ResultWithError> Update(FormulaSysInputDTO param);
        Task<List<object>> PortalGetBy(int periodId);
        /// <summary>
        /// Get list element de nhap cong thuc theo bang luong 
        /// </summary>
        /// <returns></returns>
        Task<PagedResult<FormulaSysDTO>> GetElementCal(FormulaSysDTO param);
        /// <summary>
        /// Tinh luong theo ky luong va phong ban
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        Task<ResultWithError> PayrollCal(PayrollSysInputDTO param);
        /// <summary>
        /// Check timesheet lock
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        Task<ResultWithError> CheckTimesheetLock(PayrollSysInputDTO param);
        /// <summary>
        /// Get List Import Payroll
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        Task<PagedResult<ExpandoObject>> ListImportPayroll(PayrollSysSumDTO param);
    }
}
