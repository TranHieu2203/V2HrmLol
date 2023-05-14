using ProfileDAL.ViewModels;
using ProfileDAL.Models;
using Common.Interfaces;
using Common.Extensions;
using System.Threading.Tasks;


namespace ProfileDAL.Repositories
{
    public interface IFormListSysRepository : IRepository<FormListSys>
    {
        Task<ResultWithError> GetById(int id);
        Task<ResultWithError> GetList();
        Task<ResultWithError> UpdateAsync(FormListSysDTO param);
    }
}
