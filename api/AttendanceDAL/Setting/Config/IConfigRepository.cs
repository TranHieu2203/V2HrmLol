using AttendanceDAL.Models;
using AttendanceDAL.ViewModels;
using Common.Interfaces;
using Common.Extensions;
using System.Threading.Tasks;


namespace AttendanceDAL.Repositories
{
    public interface IConfigRepository : IRepository<Config>
    {
        Task<ResultWithError> GetConfig();
        Task<ResultWithError> UpdateAsync(ConfigDTO param);
    }
}
