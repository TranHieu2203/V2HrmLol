using ClientDAL.Repositories;
using System.Threading.Tasks;

namespace ClientDAL.Repositories
{
    public interface IClientBusiness : System.IDisposable
    {
        Task<int> SaveChangesAsync();
        IEmployeeRepository Employees { get; }
    }
    
}
