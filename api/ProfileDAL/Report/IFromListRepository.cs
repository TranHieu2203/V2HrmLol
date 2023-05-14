using ProfileDAL.ViewModels;
using ProfileDAL.Models;
using Common.Interfaces;
using Common.Paging;
using Common.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace ProfileDAL.Repositories
{
    public interface IFormListRepository : IRepository<FormList>
    {
        Task<ResultWithError> GetById(int id);
        Task<ResultWithError> GetTreeView();
        Task<ResultWithError> PrintForm(int id, int typeId);
        Task<ResultWithError> PrintFormProfile(int id);
        Task<ResultWithError> PrintFormSalary(PayrollInputDTO param);
        Task<ResultWithError> PrintFormAttendance(PayrollInputDTO param);
        Task<ResultWithError> UpdateAsync(FormListDTO param);
        /// <summary>
        /// Get list loi nhac
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<ResultWithError> GetListRemind();
        /// <summary>
        /// Get list loi nhac
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<ResultWithError> UpdateRemind(List<SettingRemindDTO> param);
        /// <summary>
        /// Get data cho popup remind
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<ResultWithError> GetRemind();
        Task<ResultWithError> GetDashboard();
    }
}
