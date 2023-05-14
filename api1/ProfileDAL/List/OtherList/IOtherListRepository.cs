using ProfileDAL.ViewModels;
using Common.Paging;
using Common.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace ProfileDAL.Repositories
{
    public interface IOtherListRepository
    {
        Task<ResultWithError> GetAllType();
        Task<PagedResult<OtherListDTO>> GetAllByType(OtherListDTO param);
        Task<ResultWithError> GetById(int id);
        Task<ResultWithError> CreateTypeAsync(SysOtherListTypeInputDTO param);
        Task<ResultWithError> UpdateTypeAsync(SysOtherListTypeInputDTO param);
        Task<ResultWithError> ChangeStatusTypeAsync(List<int> ids);
        Task<ResultWithError> CreateAsync(SysOtherListInputDTO param);
        Task<ResultWithError> UpdateAsync(SysOtherListInputDTO param);
        Task<ResultWithError> ChangeStatusAsync(List<int> ids);
        Task<ResultWithError> GetOtherListByType(string typeCode);
        Task<ResultWithError> GetOtherListFixByType(string typeCode);
        Task<ResultWithError> GetOtherListTreeView();
        Task<ResultWithError> GetOtherListByTypeID(int? id);
        Task<ResultWithError> Delete(List<int> ids);
    }
}
