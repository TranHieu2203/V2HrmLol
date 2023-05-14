using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using System.Threading;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore.Design;
using System.IO;
using Common;
using PayrollDAL.Models;
using Microsoft.AspNetCore.Identity;


namespace PayrollDAL.EntityFrameworkCore
{
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<PayrollDbContext>
    {

        public PayrollDbContext CreateDbContext(string[] args)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile(@Directory.GetCurrentDirectory() + "/../GoHR.Host/appsettings.json").Build();
            var builder = new DbContextOptionsBuilder<PayrollDbContext>();
            return new PayrollDbContext(configuration, builder.Options, null);
        }
    }

    public class PayrollDbContext : TLAContext
    {
        public PayrollDbContext(IConfiguration config, DbContextOptions<PayrollDbContext> options, IHttpContextAccessor accessor)
            : base(config, options, accessor)
        {


        }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<SalaryPeriod> SalaryPeriods { get; set; }
        public DbSet<ElementGroup> ElementGroups { get; set; }
        public DbSet<SalaryElement> SalaryElements { get; set; }
        public DbSet<SalaryType> SalaryTypes { get; set; }
        public DbSet<SalaryStructure> SalaryStructures { get; set; }
        public DbSet<Paycheck> Paychecks { get; set; }
        public DbSet<SysTempSort> SysTempSorts { get; set; }
        
        public DbSet<Formula> Formulas { get; set; }
        public DbSet<KpiGroup> KpiGroups { get; set; }
        public DbSet<KpiTarget> KpiTargets { get; set; }
        public DbSet<KpiFormula> KpiFormulas { get; set; }
        public DbSet<KpiPosition> KpiPositions { get; set; }
        public DbSet<KpiEmployeeTmp> KpiEmployeeTmps { get; set; }
        
        public DbSet<Position> Positions { get; set; }
        public DbSet<KpiEmployee> KpiEmployees { get; set; }
        public DbSet<Organization> Organizations { get; set; }
        public DbSet<Working> Workings { get; set; }
        public DbSet<Advance> Advances { get; set; }
        public DbSet<AdvanceTmp> AdvanceTmps { get; set; }
        public DbSet<CalculateLock> CalculateLocks { get; set; }
        public DbSet<KpiLock> KpiLocks { get; set; }
        public DbSet<SalaryImport> SalaryImports { get; set; }
        public DbSet<SalaryImportTmp> SalaryImportTmps { get; set; }
        // 3p

        
        // model Ignore
        public DbSet<OtherList> OtherLists { get; set; }
        public DbSet<OtherListFix> OtherListFixs { get; set; }

        // HPG object
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            //modelBuilder.Model.Relational().MaxIdentifierLength = 30;
            //
            modelBuilder.Ignore<IdentityRole>();
            modelBuilder.Ignore<IdentityUser>();
            modelBuilder.Ignore<IdentityUserToken<string>>();
            modelBuilder.Ignore<IdentityUserRole<string>>();
            modelBuilder.Ignore<IdentityUserLogin<string>>();
            modelBuilder.Ignore<IdentityUserClaim<string>>();
            modelBuilder.Ignore<IdentityRoleClaim<string>>();
            //
            //modelBuilder.Ignore<SalaryType>();

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
    }
}
