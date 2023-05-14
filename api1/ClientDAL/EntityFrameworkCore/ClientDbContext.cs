using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using System.Threading;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore.Design;
using System.IO;
using Common;
using ClientDAL.Models;
using Microsoft.AspNetCore.Identity;
using Common.Extensions;

namespace ClientDAL.EntityFrameworkCore
{
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<ClientDbContext>
    {

        public ClientDbContext CreateDbContext(string[] args)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile(@Directory.GetCurrentDirectory() + "/../GoHR.Host/appsettings.json").Build();
            var builder = new DbContextOptionsBuilder<ClientDbContext>();
            return new ClientDbContext(configuration, builder.Options, null);
        }
    }

    public class ClientDbContext : TLAContext
    {
        public ClientDbContext(IConfiguration config, DbContextOptions<ClientDbContext> options, IHttpContextAccessor accessor)
            : base(config, options, accessor)
        {

        }

      
        public DbSet<Employee> Employees { get; set; }


     

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            base.OnModelCreating(modelBuilder);
            modelBuilder.Model.Relational().MaxIdentifierLength = 30;

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
