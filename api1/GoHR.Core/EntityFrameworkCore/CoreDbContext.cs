using Microsoft.EntityFrameworkCore;
using CoreDAL.Models;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using System.Threading;
using Common;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore.Design;
using System.IO;
using Microsoft.AspNetCore.Identity;
using Common.Extensions;
using CoreDAL.MultiTenancy.TenantUser.Models;

namespace CoreDAL.EntityFrameworkCore
{
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<CoreDbContext>
    {
        public CoreDbContext CreateDbContext(string[] args)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile(@Directory.GetCurrentDirectory() + "/../GoHR.Host/appsettings.json").Build();
            var builder = new DbContextOptionsBuilder<CoreDbContext>();
            //  var connectionString = configuration.GetConnectionString("connectionString");
            //  builder.UseSqlServer(connectionString);
            return new CoreDbContext(configuration, builder.Options, null);
        }
    }

    public class CoreDbContext : TLAContext //IdentityDbContext<ApplicationUser>
    {
        public CoreDbContext(IConfiguration config, DbContextOptions<CoreDbContext> options, IHttpContextAccessor accessor)
            : base(config, options, accessor)
        {
        }

        //List of DB Models - Add your DB models here
        //--------------- System --------------------
        //----------- Security ----------------------
        public DbSet<SysGroupFunction> SysGroupFunctions { get; set; }
        public DbSet<SysFunction> SysFunctions { get; set; }
        public DbSet<SysPermission> SysPermissions { get; set; }
        public DbSet<SysGroupPermission> SysGroupPermissions { get; set; }
        public DbSet<SysGroupUser> SysGroupUsers { get; set; }
        public DbSet<SysUser> SysUsers { get; set; }
        public DbSet<SysUserPermission> AspUserPermissions { get; set; }

        //------------ OtherList ---------------------
        public DbSet<SysOtherListType> SysOtherListTypes { get; set; }
        public DbSet<SysOtherList> SysOtherLists { get; set; }

        public DbSet<SysConfig> SysConfigs { get; set; }

        //------------ Package Seller ---------------------
        public DbSet<SysModule> SysModules { get; set; }
        //Tenant
        public DbSet<Tenant> Tenants { get; set; }
        public DbSet<TenantFunction> TenantFunctions { get; set; }
        public DbSet<TenantUser> TenantUsers { get; set; }
        public DbSet<TenantUserTmp> TenantUserTmps { get; set; }
        public DbSet<TenantGroup> TenantGroups { get; set; }
        public DbSet<TenantGroupPermisstion> TenantGroupPermisstions { get; set; }
        public DbSet<TenantUserPermission> TenantUserPermissions { get; set; }
        public DbSet<AuditLog> AuditLogs { get; set; }
        public DbSet<ApproveProcess> ApproveProcess { get; set; }
        public DbSet<ApproveTemplate> ApproveTemplates { get; set; }
        public DbSet<ApproveTemplateDetail> ApproveTemplateDetails { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Position> Positions { get; set; }
        public DbSet<Organization> Organizations { get; set; }
        public DbSet<OtherListFix> OtherListFixs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<SysUser>().Property(p => p.Id).HasColumnName("ID");
            modelBuilder.Entity<SysUser>().Property(p => p.UserName).HasColumnName("USERNAME");
            modelBuilder.Entity<SysUser>().Property(p => p.TwoFactorEnabled).HasColumnName("TWOFACTORENABLED");
            modelBuilder.Entity<SysUser>().Property(p => p.SecurityStamp).HasColumnName("SECURITYSTAMP");
            modelBuilder.Entity<SysUser>().Property(p => p.PhoneNumberConfirmed).HasColumnName("PHONENUMBERCONFIRMED");
            modelBuilder.Entity<SysUser>().Property(p => p.PhoneNumber).HasColumnName("PHONENUMBER");
            modelBuilder.Entity<SysUser>().Property(P => P.PasswordHash).HasColumnName("PASSWORDHASH");
            modelBuilder.Entity<SysUser>().Property(p => p.LockoutEnabled).HasColumnName("LOCKOUTENABLED");
            modelBuilder.Entity<SysUser>().Property(p => p.EmailConfirmed).HasColumnName("EMAILCONFIRMED");
            modelBuilder.Entity<SysUser>().Property(p => p.Email).HasColumnName("EMAIL");
            modelBuilder.Entity<SysUser>().Property(p => p.AccessFailedCount).HasColumnName("ACCESSFAILEDCOUNT");
            modelBuilder.Entity<SysUser>().Property(p => p.LockoutEnd).HasColumnName("LOCKOUTEND");
            modelBuilder.Entity<SysUser>().Property(p => p.NormalizedUserName).HasColumnName("NORMALIZEDUSERNAME");
            modelBuilder.Entity<SysUser>().Property(p => p.NormalizedEmail).HasColumnName("NORMALIZEDEMAIL");
            modelBuilder.Entity<SysUser>().Property(p => p.ConcurrencyStamp).HasColumnName("CONCURRENCYSTAMP");
            modelBuilder.Entity<IdentityUser>().ToTable("SYS_USER");

            //modelBuilder.Entity<Tenant>().ToTable("Tenant");

            //modelBuilder.Entity<Tenant>()
            //    .HasIndex(u => u.Code).IsUnique();
            //modelBuilder.Entity<AspGroupPermission>()
            //    .HasKey(c => new { c.UserGroupId, c.FunctionId });
            //modelBuilder.Entity<AspPackageModule>()
            //    .HasKey(c => new { c.PackageId, c.ModuleId });
            //modelBuilder.Model.Relational().MaxIdentifierLength = 30;
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken))
        {
            UpdateAuditEntities();
            return base.SaveChangesAsync(cancellationToken);
        }

        public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default(CancellationToken))
        {
            UpdateAuditEntities();
            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //============= Production Oracle ==========================
            optionsBuilder.UseOracle(_config["connectionString"], options =>
            {
                options.MigrationsHistoryTable("CoresMigrationsHistory");
            });
        }
    }
}
