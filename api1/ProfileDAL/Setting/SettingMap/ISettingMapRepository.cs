using ProfileDAL.ViewModels;
using ProfileDAL.Models;
using Common.Interfaces;
using Common.Paging;
using Common.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace ProfileDAL.Repositories
{
    public interface ISettingMapRepository : IRepository<SettingMap>
    {
        Task<PagedResult<SettingMapDTO>> GetAll(SettingMapDTO param);
        Task<ResultWithError> GetById(int id);
        Task<ResultWithError> CreateAsync(SettingMapInputDTO param);
        Task<ResultWithError> UpdateAsync(SettingMapInputDTO param);
        Task<ResultWithError> ChangeStatusAsync(List<int> ids);
        Task<ResultWithError> GetList();
        ResultWithError GetIP();
        ResultWithError GetBSSID();
    }
}
