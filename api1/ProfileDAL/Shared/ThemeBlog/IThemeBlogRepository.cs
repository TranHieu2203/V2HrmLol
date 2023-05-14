using ProfileDAL.ViewModels;
using ProfileDAL.Models;
using Common.Interfaces;
using Common.Paging;
using Common.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace ProfileDAL.Repositories
{
    public interface IThemeBlogRepository : IRepository<ThemeBlog>
    {
        Task<PagedResult<ThemeBlogDTO>> GetAll(ThemeBlogDTO param);
        Task<ResultWithError> GetById(int id);
        Task<ResultWithError> CreateAsync(ThemeBlogInputDTO param);
        Task<ResultWithError> UpdateAsync(ThemeBlogInputDTO param);
        Task<ResultWithError> ChangeStatusAsync(List<int> ids);
        Task<ResultWithError> GetList();
    }
}