// =============================
// Email: kythuat@tlavietnam.vn
// www.tlavietnam.vn
// =============================
using ClientDAL.Repositories;
using ClientDAL.EntityFrameworkCore;
using ClientDAL.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Threading.Tasks;

namespace ClientDAL
{
    public class ClientBusiness : System.IDisposable, IClientBusiness
    {
        readonly ClientDbContext _context;
        IEmployeeRepository _Employees;

        public ClientBusiness(ClientDbContext context)
        {
            _context = context;
        }

       

        public IEmployeeRepository Employees
        {
            get
            {
                if (_Employees == null)
                    _Employees = new EmployeeRepository(_context);

                return _Employees;
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
