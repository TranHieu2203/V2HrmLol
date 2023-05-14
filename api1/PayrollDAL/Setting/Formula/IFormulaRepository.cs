using PayrollDAL.ViewModels;
using PayrollDAL.Models;
using Common.Interfaces;
using Common.Paging;
using Common.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Dynamic;
using System.Data;

namespace PayrollDAL.Repositories
{
    public interface IFormulaRepository : IRepository<Formula>
    {
        /// <summary>
        /// Get list luong cua nhan vien theo phong ban va ky luong
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        Task<ResultWithError> ListPayrollSum(PayrollSumDTO param);
        /// <summary>
        /// Get list luong cua nhan vien theo phong ban va ky luong
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        Task<List<ExpandoObject>> MBPayrollSum(PayrollInputMobile param);
        Task<ResultWithError> Update(FormulaInputDTO param);
        Task<List<ValuesDTO>> PortalGetBy(int periodId);
        /// <summary>
        /// Get list element de nhap cong thuc theo bang luong 
        /// </summary>
        /// <returns></returns>
        Task<PagedResult<FormulaDTO>> GetElementCal(FormulaDTO param);
        /// <summary>
        /// Tinh luong theo ky luong va phong ban
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        Task<ResultWithError> PayrollCal(PayrollInputDTO param);
        /// <summary>
        /// Check timesheet lock
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        Task<ResultWithError> CheckTimesheetLock(PayrollInputDTO param);
        Task<ResultWithError> LockPayroll(LockInputDTO param);
        Task<ResultWithError> IsLockPayroll(LockInputDTO param);
        Task<ResultWithError> MoveTableIndex(List<TempSortInputDTO> param, int type);

    }
}
