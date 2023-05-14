using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using System.Threading;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore.Design;
using System.IO;
using Common;
using AttendanceDAL.Models;
using Microsoft.AspNetCore.Identity;
//using GoHR.Core;

namespace AttendanceDAL.EntityFrameworkCore
{
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<AttendanceDbContext>
    {

        public AttendanceDbContext CreateDbContext(string[] args)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile(@Directory.GetCurrentDirectory() + "/../GoHR.Host/appsettings.json").Build();
            var builder = new DbContextOptionsBuilder<AttendanceDbContext>();
            return new AttendanceDbContext(configuration, builder.Options, null);
        }
    }

    public class AttendanceDbContext : TLAContext//IdentityDbContext<ApplicationUser>
    {
        public AttendanceDbContext(IConfiguration config, DbContextOptions<AttendanceDbContext> options, IHttpContextAccessor accessor)
            : base(config, options, accessor)
        {

        }
        public DbSet<Symbol> Symbols { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<TimeType> TimeTypes { get; set; }
        public DbSet<Shift> Shifts { get; set; }
        public DbSet<Holiday> Holidays { get; set; }
        public DbSet<SalaryPeriod> SalaryPeriods { get; set; }
        public DbSet<SalaryPeriodDtl> SalaryPeriodDtls { get; set; }
        public DbSet<TimeSheetDaily> TimeSheetDailys { get; set; }
        public DbSet<WorkSign> WorkSigns { get; set; }
        public DbSet<TimeSheetMonthly> TimeSheetMonthlies { get; set; }
        public DbSet<TimeSheetMonthlyDtl> TimeSheetMonthlyDtls { get; set; }
        public DbSet<TimeLateEarly> TimeLateEarlys { get; set; }
        public DbSet<RegisterOff> RegisterOffs { get; set; }
        public DbSet<Approved> Approveds { get; set; }
        public DbSet<SwipeData> SwipeDatas { get; set; }
        public DbSet<SwipeDataTmp> SwipeDataTmps { get; set; }
        public DbSet<SwipeDataWrong> SwipeDataWrongs { get; set; }

        public DbSet<TimeSheetLock> TimeSheetLocks { get; set; }
        public DbSet<TimeSheetFomula> TimeSheetFomulas { get; set; }
        public DbSet<WorkSignTmp> WorkSignTmps { get; set; }
        /// model ignore
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Organization> Organizations { get; set; }
        public DbSet<Position> Positions { get; set; }
        public DbSet<TimesheetMachine> TimesheetMachines { get; set; }
        public DbSet<TimesheetMachineEdit> TimesheetMachineEdits { get; set; }
       // public DbSet<UserOrgTemp> UserOrgTemps { get; set; }
        public DbSet<DayOffYear> DayOffYears { get; set; }
        public DbSet<DayOffYearConfig> DayOffYearConfigs { get; set; }
        public DbSet<Config> AttendanceConfigs { get; set; }
        public DbSet<OverTime> OverTimes { get; set; }
        public DbSet<OverTimeConfig> OverTimeConfigs { get; set; }
        public DbSet<SettingMap> SettingMaps { get; set; }
        public DbSet<WorkSignDuty> WorkSignDutys { get; set; }
        public DbSet<EntitlementEdit> EntitlementEdits { get; set; }
        
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

            //modelBuilder.Ignore<Employee>();
            //modelBuilder.Ignore<Organization>();
            //modelBuilder.Ignore<Position>();
            //modelBuilder.Ignore<GroupPosition>();
            //modelBuilder.Ignore<Province>();
            //modelBuilder.Ignore<District>();
            //modelBuilder.Ignore<Ward>();
            //modelBuilder.Ignore<OtherList>();
            //modelBuilder.Ignore<OtherListFix>();
            //modelBuilder.Ignore<OtherListType>();
            //modelBuilder.Ignore<UserOrgTemp>();
            //

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
