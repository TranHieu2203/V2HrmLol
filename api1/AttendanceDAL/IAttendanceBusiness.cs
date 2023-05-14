namespace AttendanceDAL.Repositories
{
    public interface IAttendanceBusiness
    {
        // IOtherListRepository SysOtherLists { get; }  
        IShiftRepository ShiftRepository { get; }
        ITimeTypeRepository TimeTypeRepository { get; }
        ISymbolRepository SymbolRepository { get; }
        IHolidayRepository HolidayRepository { get; }
        ISalaryPeriodRepository SalaryPeriodRepository { get; }
        ITimeSheetDailyRepository TimeSheetDailyRepository { get; }
        IWorkSignRepository WorkSignRepository { get; }
        ITimeLateEarlyRepository TimeLateEarlyRepository { get; }
        IRegisterOffRepository RegisterOffRepository { get; }
        ITimeSheetMonthlyRepository TimeSheetMonthlyRepository { get; }
        IDayOffYearRepository DayOffYearRepository { get; }
        IOverTimeRepository OverTimeRepository { get; }
        IEntitlementEditRepository EntitlementEditRepository { get; }
        IReportRepository ReportRepository { get; }
        IConfigRepository ConfigRepository { get; }
    }
}
