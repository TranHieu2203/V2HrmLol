using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using System.Threading;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore.Design;
using System.IO;
using Common;
using ProfileDAL.Models;
using Microsoft.AspNetCore.Identity;
using Common.Extensions;

namespace ProfileDAL.EntityFrameworkCore
{
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<ProfileDbContext>
    {

        public ProfileDbContext CreateDbContext(string[] args)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile(@Directory.GetCurrentDirectory() + "/../GoHR.Host/appsettings.json").Build();
            var builder = new DbContextOptionsBuilder<ProfileDbContext>();
            return new ProfileDbContext(configuration, builder.Options, null);
        }
    }

    public class ProfileDbContext : TLAContext
    {
        public ProfileDbContext(IConfiguration config, DbContextOptions<ProfileDbContext> options, IHttpContextAccessor accessor)
            : base(config, options, accessor)
        {

        }

        //List of DB Models - Add your DB models here
        //--------------- System --------------------
        //----------- Security ----------------------
        public DbSet<CompanyInfo> CompanyInfos { get; set; }
        public DbSet<Organization> Organizations { get; set; }
        public DbSet<ViewOrganization> ViewOrganizations { get; set; }
        public DbSet<GroupPosition> GroupPositions { get; set; }
        public DbSet<Position> Positions { get; set; }
        public DbSet<PositionDesription> PositionDesriptions { get; set; }
        public DbSet<OtherListFix> OtherListFixs { get; set; }
        public DbSet<OtherList> OtherLists { get; set; }
        public DbSet<OtherListType> OtherListTypes { get; set; }
        public DbSet<ContractType> ContractTypes { get; set; }
        public DbSet<Allowance> Allowances { get; set; }
        public DbSet<Welfare> Welfares { get; set; }
        public DbSet<WelfareContract> WelfareContracts { get; set; }
        public DbSet<AllowanceEmp> AllowanceEmps { get; set; }

        public DbSet<SalaryScale> SalaryScales { get; set; }
        public DbSet<SalaryRank> SalaryRanks { get; set; }
        public DbSet<SalaryLevel> SalaryLevels { get; set; }
        public DbSet<UserOrgani> UserOrganis { get; set; }
        public DbSet<UserGroupOrgani> UserGroupOrganis { get; set; }
        // Danh mục
        public DbSet<SalaryType> SalaryTypes { get; set; }
        public DbSet<HUJobBand> HUJobBands { get; set; }
        public DbSet<HUJob> HUJobs { get; set; }
        public DbSet<HUJobFunction> HUJobFunction { get; set; }
        public DbSet<OtherList> OtOtherLists { get; set; }
        // Dùng chung All Tenant
        public DbSet<Province> Provinces { get; set; }
        public DbSet<District> Districts { get; set; }
        public DbSet<Ward> Wards { get; set; }
        public DbSet<InsuranceType> InsuranceTypes { get; set; }
        public DbSet<ThemeBlog> ThemeBlogs { get; set; }
        public DbSet<GroupPositionSys> GroupPositionSyses { get; set; }
        public DbSet<PositionSys> PositionSyses { get; set; }
        public DbSet<ContractTypeSys> ContractTypeSyses { get; set; }
        public DbSet<ShiftSys> ShiftSyses { get; set; }
        public DbSet<SalaryElementSys> SalaryElementSyses { get; set; }
        public DbSet<SalaryTypeSys> SalaryTypeSyses { get; set; }
        public DbSet<SalaryStructSys> SalaryStructSyses { get; set; }
        public DbSet<FormulaSys> FormulaSyses { get; set; }
        public DbSet<FormListSys> FormListSyses { get; set; }
        public DbSet<KPISys> KPISyss { get; set; }
        public DbSet<KPIGroupSys> KPIGroupSyss { get; set; }


        // Nghiep vu
        public DbSet<Employee> Employees { get; set; }
        public DbSet<EmployeeEdit> EmployeeEdits { get; set; }
        public DbSet<SituationEdit> SituationEdits { get; set; }
        public DbSet<EmployeeTmp> EmployeeTmps { get; set; }
        public DbSet<EmployeePapers> EmployeePaperses { get; set; }
        
        public DbSet<Situation> Situations { get; set; }
        public DbSet<Working> Workings { get; set; }
        public DbSet<Contract> Contracts { get; set; }
        public DbSet<Commend> Commends { get; set; }
        public DbSet<CommendEmp> CommendEmps { get; set; }
        public DbSet<Discipline> Disciplines { get; set; }
        public DbSet<Terminate> Terminates { get; set; }
        public DbSet<InsInformation> InsInformations { get; set; }
        public DbSet<InsChange> InsChanges { get; set; }

        public DbSet<Candidate> CandidateScanCVs { get; set; }

        //Report
        public DbSet<FormList> FormLists { get; set; }
        public DbSet<FormElement> FormElements { get; set; }
        public DbSet<SettingRemind> SettingReminds { get; set; }
        public DbSet<BlogInternal> BlogInternals { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Answer> Answers { get; set; }
        public DbSet<AnswerUser> AnswerUsers { get; set; }
        public DbSet<SettingMap> SettingMaps { get; set; }
        public DbSet<Report> Reports { get; set; }
        public DbSet<AuditLog> AuditLogs { get; set; }
        //share 
        public DbSet<Bank> Banks { get; set; }
        public DbSet<BankBranch> BankBranchs { get; set; }
        // Administration
        public DbSet<Room> Rooms { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<PostionPapers> PostionPaperses { get; set; }
        // temp 
        public DbSet<WorkingTmp> WorkingTmps { get; set; }
        public DbSet<ContractTmp> ContractTmps { get; set; }
        public DbSet<InsChangeTmp> InsChangeTmps { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<OtherListFix>().HasKey(c => new { c.ID, c.TYPE });
            //modelBuilder.Model.Relational().MaxIdentifierLength = 30;
            //config clob
            modelBuilder.Entity<FormList>()
           .Property(a => a.TEXT).HasColumnType("NCLOB");


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
