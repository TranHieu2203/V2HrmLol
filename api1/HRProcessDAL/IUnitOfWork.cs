using System.Threading.Tasks;

namespace HRProcessDAL.Repositories
{
    public interface IHRProcessBusiness: System.IDisposable
    {
        Task<int> SaveChangesAsync();
        IHRProcessRepository HRProcessRepository { get; }
    }
}
