using Common.Extensions;
using Common.Paging;
using CoreDAL.Models;
using CoreDAL.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace CoreDAL.Repositories
{
    public interface ISysOtherListRepository
    {
        Task<ResultWithError> CMSGetAllType(SysOtherListTypeDTO param);
        Task<PagedResult<SysOtherList>> CMSGetByType(SysOtherListDTO param);
        Task<ResultWithError> CreateTypeAsync(SysOtherListTypeInputDTO param);
        Task<ResultWithError> UpdateTypeAsync(SysOtherListTypeInputDTO param);
        Task<ResultWithError> ChangeStatusTypeAsync(List<int> ids);
        Task<ResultWithError> CreateAsync(SysOtherListInputDTO param);
        Task<ResultWithError> UpdateAsync(SysOtherListInputDTO param);
        Task<ResultWithError> ChangeStatusAsync(List<int> ids);
        Task<ResultWithError> GetOtherListByType(string typeCode);
        Task<ResultWithError> GetSysConfixByType(string typeCode);

    }
}
