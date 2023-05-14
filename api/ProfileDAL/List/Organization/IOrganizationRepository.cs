using ProfileDAL.ViewModels;
using ProfileDAL.Models;
using Common.Interfaces;
using Common.Paging;
using Common.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace ProfileDAL.Repositories
{
    public interface IOrganizationRepository : IRepository<Organization>
    {
        Task<PagedResult<OrganizationInputDTO>> GetAll(OrganizationInputDTO param);
        Task<ResultWithError> GetTreeView();
        Task<ResultWithError> GetById(int id);
        Task<ResultWithError> CreateAsync(OrganizationInputDTO param);
        Task<ResultWithError> UpdateAsync(OrganizationInputDTO param);
        Task<ResultWithError> GetList();
        Task<ResultWithError> Delete(int id);
        Task<ResultWithError> SortAsync(OrganizationInputDTO param);
        Task<ResultWithError> GetAllOrgChartPosition(OrgChartRptInputDTO param);
        Task<ResultWithError> GetJobPosTree(JobPositionTreeInputDTO param);
        Task<ResultWithError> UpdateCreateRptJobPosHisAsync(JobPositionTreeInputDTO param);
        Task<ResultWithError> GetJobChildTree(JobChildTreeInputDTO param);
    }
}
