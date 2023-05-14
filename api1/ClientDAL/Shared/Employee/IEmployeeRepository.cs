using Common.Extensions;
using Common.Interfaces;
using Common.Paging;
using ClientDAL.Models;
using System.Threading.Tasks;
using ClientDAL.ViewModels;

namespace ClientDAL.Repositories
{
    public interface IEmployeeRepository: IRepository<Employee>
    {
        Task<PagedResult<EmployeeDTO>> GetAll(EmployeeDTO param);
    
    }
}
