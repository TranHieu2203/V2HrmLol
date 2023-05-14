using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using System.Threading;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore.Design;
using System.IO;
using Common;
using HRProcessDAL.Models;
using Microsoft.AspNetCore.Identity;
using Common.Extensions;

namespace HRProcessDAL.EntityFrameworkCore
{
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<HRProcessDbContext>
    {

        public HRProcessDbContext CreateDbContext(string[] args)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile(@Directory.GetCurrentDirectory() + "/../GoHR.Host/appsettings.json").Build();
            var builder = new DbContextOptionsBuilder<HRProcessDbContext>();
            return new HRProcessDbContext(configuration, builder.Options, null);
        }
    }

    public class HRProcessDbContext : TLAContext
    {
        public HRProcessDbContext(IConfiguration config, DbContextOptions<HRProcessDbContext> options, IHttpContextAccessor accessor)
            : base(config, options, accessor)
        {

        }

        //List of DB Models - Add your DB models here
        //--------------- System --------------------
        //----------- Security ----------------------

        // Nghiep vu
        public DbSet<SE_HR_PROCESS_TYPE> SeHrProcessType { get; set; }
        public DbSet<SE_HR_PROCESS> SeHrProcess { get; set; }
        public DbSet<SE_HR_PROCESS_DATA_MODEL> SeHrProcessDataModel { get; set; }
        public DbSet<SE_HR_PROCESS_INSTANCE> SeHrProcessInstance { get; set; }
        public DbSet<SE_HR_PROCESS_NODE> SeHrProcessNode { get; set; }
 

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            base.OnModelCreating(modelBuilder);
           // modelBuilder.Entity<OtherListFix>().HasKey(c => new { c.ID, c.TYPE });
            //modelBuilder.Model.Relational().MaxIdentifierLength = 30;
            //config clob
           // modelBuilder.Entity<FormList>()
           //.Property(a => a.TEXT).HasColumnType("NCLOB");


            modelBuilder.Ignore<IdentityRole>();
            modelBuilder.Ignore<IdentityUser>();
            modelBuilder.Ignore<IdentityUserToken<string>>();
            modelBuilder.Ignore<IdentityUserRole<string>>();
            modelBuilder.Ignore<IdentityUserLogin<string>>();
            modelBuilder.Ignore<IdentityUserClaim<string>>();
            modelBuilder.Ignore<IdentityRoleClaim<string>>();
          //  modelBuilder.Ignore<Notification>();
            
           // modelBuilder.Ignore<SettingMap>();
        }


        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken))
        {
            UpdateAuditEntities();
            return base.SaveChangesAsync(cancellationToken);
        }
        
    }
}
