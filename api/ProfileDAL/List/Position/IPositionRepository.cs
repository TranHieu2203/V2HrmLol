using ProfileDAL.ViewModels;
using ProfileDAL.Models;
using Common.Interfaces;
using Common.Paging;
using Common.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace ProfileDAL.Repositories
{
    public interface IPositionRepository : IRepository<Position>
    {
        Task<PagedResult<PositionViewDTO>> GetAll(PositionViewDTO param);
        Task<ResultWithError> GetById(int id);
        Task<ResultWithError> CreateAsync(PositionInputDTO param);
        Task<ResultWithError> UpdateAsync(PositionInputDTO param);
        Task<ResultWithError> ChangeStatusAsync(List<int> ids);
        Task<ResultWithError> GetList(int groupId);
        Task<ResultWithError> GetListJob();
        Task<ResultWithError> Delete(List<int> Ids);
        Task<ResultWithError> GetByOrg(int orgId, int empId);
        Task<ResultWithError> GetLM(int positionId);
        string AutoGenCodeHuTile(string tableName, string colName);
        Task<ResultWithError> ModifyPositionById(PositionInputDTO obj, int OrgRight, int Address, int OrgIDDefault = 1, int IsDissolveDefault = 0);
        Task<ResultWithError> InsertPositionNB(PositionInputDTO obj, int OrgRight, int Address, int OrgIDDefault = 1, int IsDissolveDefault = 0);
        Task<ResultWithError> GetOrgTreeApp(string sLang);
        Task<PagedResult<PositionViewDTO>> GetPositionOrgID(PositionViewDTO _filter);

    }
}
