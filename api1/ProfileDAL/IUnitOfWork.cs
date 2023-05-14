using System.Threading.Tasks;

namespace ProfileDAL.Repositories
{
    public interface IProfileBusiness: System.IDisposable
    {
        Task<int> SaveChangesAsync();
        IOtherListRepository SysOtherLists { get; }
        IGroupPositionRepository GroupPositionRepository { get; }
        IPositionRepository PositionRepository { get; }
        IOrganizationRepository OrganizationRepository { get; }
        IContractTypeRepository ContractTypeRepository { get; }
        IAllowanceRepository AllowanceRepository { get; }
        IWelfareRepository BenerfitRepository { get; }
        ICompanyInfoRepository CompanyInfoRepository { get; }
        IAllowanceEmpRepository AllowanceEmpRepository { get; }
        ISalaryRepository SalaryRepository { get; }
        ISalaryScaleRepository SalaryScaleRepository { get; }
        ISalaryRankRepository SalaryRankRepository { get; }
        ISalaryLevelRepository SalaryLevelRepository { get; }
        IProvinceRepository ProvinceRepository { get; }
        IThemeBlogRepository ThemeBlogRepository { get; }
        IEmployeeRepository EmployeeRepository { get; }
        IWorkingRepository WorkingRepository { get; }
        IContractRepository ContractRepository { get; }

        ICommendRepository CommendRepository { get; }
        IDisciplineRepository DisciplineRepository { get; }
        ITerminateRepository TerminateRepository { get; }
        IInsInformationRepository InsInformationRepository { get; }
        IInsChangeRepository InsChangeRepository { get; }
        IInsuranceTypeRepository InsuranceTypeRepository { get; }
        IGroupPositionSysRepository GroupPositionSysRepository { get; }
        IPositionSysRepository PositionSysRepository { get; }
        IShiftSysRepository ShiftSysRepository { get; }
        IContractTypeSysRepository ContractTypeSysRepository { get; }
        IFormListRepository FormListRepository { get; }
        IBlogInternalRepository BlogInternalRepository { get; }
        IVoteRepository VoteRepository { get; }
        IUserOrganiRepository UserOrganiRepository { get; }
        ISettingMapRepository SettingMapRepository { get; }
        IReportRepository ReportRepository { get; }
        ISalarySysRepository SalarySysRepository { get; }
        ISalaryStructureSysRepository SalaryStructureSysRepository { get; }
        ISalaryElementSysRepository SalaryElementSysRepository { get; }
        IFormulaSysRepository FormulaSysRepository { get; }
        IFormListSysRepository FormListSysRepository { get; }
        IRoomRepository RoomRepository { get; }
        IBookingRepository BookingRepository { get; }
        IBankRepository BankRepository { get; }
        IBankBranchRepository BankBranchRepository { get; }

        IPositionPaperRepository PositionPaperRepository { get; }
        IHuJobBandRepository HuJobBandRepository { get; }
        IHuJobRepository HuJobRepository { get; }
        ICandidateRepository CandidateRepository { get; }
    }
}
