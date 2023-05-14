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
    public interface IApproveProcessRepository : IRepository<ApproveProcess>
    {
        Task<PagedResult<ApproveProcessDTO>> GetAll(ApproveProcessDTO param, int application);
        Task<ResultWithError> GetById(int id, int application);
        Task<ResultWithError> UpdateAsync(ApproveProcessDTO param, int application);
    }
}
