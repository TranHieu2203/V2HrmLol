using Common.Extensions;
using Common.Interfaces;
using Common.Paging;
using CoreDAL.Models;
using CoreDAL.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreDAL.Repositories
{
    public interface IApproveTemplateRepository : IRepository<ApproveTemplate>
    {
        Task<PagedResult<ApproveTemplateDTO>> GetApproveTemplate(ApproveTemplateDTO param);
        Task<ResultWithError> GetApproveTemplateById(int id);
        Task<ResultWithError> CreateApproveTemplate(ApproveTemplateDTO param);
        Task<ResultWithError> UpdateApproveTemplate(ApproveTemplateDTO param);
        Task<ResultWithError> DeleteApproveTemplate(List<int> ids);
        Task<PagedResult<ApproveTemplateDetailDTO>> GetApproveTemplateDetail(int templateId);
        Task<ResultWithError> GetApproveTemplateDetailById(int id);
        Task<ResultWithError> CreateApproveTemplateDetail(ApproveTemplateDetailDTO param);
        Task<ResultWithError> UpdateApproveTemplateDetail(ApproveTemplateDetailDTO param);
        Task<ResultWithError> DeleteApproveTemplateDetail(List<int> ids);
        Task<ResultWithError> GetListPosition();
    }
}
