// =============================
// Email: kythuat@tlavietnam.vn
// www.tlavietnam.vn
// =============================
using HRProcessDAL.EntityFrameworkCore;
using HRProcessDAL.Repositories;
using System;
using System.Threading.Tasks;

namespace HRProcessDAL
{
    public class HRProcessBusiness : System.IDisposable, IHRProcessBusiness
    {
        readonly HRProcessDbContext _context;
        // List Progile
       
        // Nghiệp vụ
        IHRProcessRepository _HRProcessRepository;
     
        public HRProcessBusiness(HRProcessDbContext context)
        {
            _context = context;
        }

      
        public IHRProcessRepository HRProcessRepository
        {
            get
            {
                if (_HRProcessRepository == null)
                    _HRProcessRepository = new HRProcessRepository(_context);

                return _HRProcessRepository;
            }
        }
      
        private bool disposed = false;
        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        public async Task<int> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync();
        }

    }
}
