using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using CoreDAL.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace CoreDAL.EntityFrameworkCore
{
    public interface IDatabaseInitializer
    {
        Task SeedAsync();
    }
    public class DatabaseInitializer : IDatabaseInitializer
    {
        private readonly CoreDbContext _context;
        private readonly UserManager<SysUser> _userManager;
        public DatabaseInitializer(CoreDbContext context, UserManager<SysUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public async Task SeedAsync()
        {
            await _context.Database.MigrateAsync().ConfigureAwait(false);

            try
            {
                if (!await _context.SysUsers.AnyAsync())
                {
                    //_logger.LogInformation("Generating inbuilt accounts");
                    var _dateTime = DateTime.Now;
                    var groupUser = new SysGroupUser()
                    {
                        CODE = "admin",
                        NAME = "Administrator",
                        IS_ADMIN = true,
                        IS_ACTIVE = true,
                        CREATE_BY = "SYSTEM",
                        CREATE_DATE = _dateTime
                    };
                    _context.SysGroupUsers.Add(groupUser);
                    var user = new SysUser()
                    {
                        Email = "admin@admin.com",
                        FULLNAME = "ADMIN",
                        UserName = "admin",
                        CREATE_DATE = DateTime.Now,
                        LockoutEnabled = false,
                        GROUP_ID = groupUser.ID
                    };
                    var result = await _userManager.CreateAsync(user, "Admin123$%^");

                    var Otherlist = new SysConfig()
                    {
                        CODE = "GOHR",
                        NAME = "Quản trị nhân sự Cloud",
                        TYPE = "APPLICATION",
                        IS_ACTIVE = true
                    };
                    _context.SysConfigs.Add(Otherlist);

                    _context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
