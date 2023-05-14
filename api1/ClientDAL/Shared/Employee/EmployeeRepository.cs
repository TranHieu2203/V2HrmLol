using Common.Paging;
using Common.Repositories;
using ClientDAL.EntityFrameworkCore;
using ClientDAL.Models;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Common.Extensions;
using Microsoft.EntityFrameworkCore;
using ClientDAL.ViewModels;

namespace ClientDAL.Repositories
{
    public class EmployeeRepository : TLARepository<Employee>, IEmployeeRepository
    {
        private ClientDbContext _appContext => (ClientDbContext)_context;
        public EmployeeRepository(ClientDbContext context) : base(context)
        {
        }
       
        public async Task<PagedResult<EmployeeDTO>> GetAll(EmployeeDTO param)
        {
            try
            {
                var queryable = (from p in _appContext.HuEmployees
                                 where p.Id == _appContext.EmpId.ToString()
                                 select new EmployeeDTO
                                 {
                                     Id = p.ID,
                                     Fullname = p.FULLNAME,
                                     Code = p.CODE
                                 });

                return await PagingList(queryable, param);
            }
            catch (System.Exception)
            {

                throw;
            }
          
        }
    }
}

