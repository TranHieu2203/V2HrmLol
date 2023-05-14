using ProfileDAL.ViewModels;
using ProfileDAL.Models;
using Common.Interfaces;
using Common.Paging;
using Common.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace ProfileDAL.Repositories
{
    public interface IVoteRepository : IRepository<Answer>
    {
        Task<ResultWithError> AddAnswer(QuestionOutputDTO param);
        Task<ResultWithError> GetQuestion(int? id);
        Task<ResultWithError> CreateQuestion(QuestionDTO param);
        Task<PagedResult<QuestionPagingDTO>> GetAll(QuestionPagingDTO param);
        Task<ResultWithError> GetById(int id);
        Task<ResultWithError> ChangeStatusAsync(List<int> ids);
        Task<ResultWithError> PortalList();
    }
}
