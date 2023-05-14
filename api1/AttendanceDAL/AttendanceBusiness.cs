// =============================
// Email: kythuat@tlavietnam.vn
// www.tlavietnam.vn
// =============================
using AttendanceDAL.EntityFrameworkCore;
using AttendanceDAL.Repositories;

namespace AttendanceDAL
{
    public class AttendanceBusiness : IAttendanceBusiness
    {
        readonly AttendanceDbContext _context;
        // List Progile

        // Dùng chung All Tenant

        // Nghiệp vụ
        ITimeTypeRepository _TimeTypeRepository;
        ISymbolRepository _SymbolRepository;
        IShiftRepository _ShiftRepository;
        IHolidayRepository _HolidayRepository;
        ISalaryPeriodRepository _SalaryPeriodRepository;
        ITimeSheetDailyRepository _TimeSheetDailyRepository;
        IWorkSignRepository _WorkSignRepository;
        ITimeLateEarlyRepository _TimeLateEarlyRepository;
        IRegisterOffRepository _RegisterOffRepository;
        ITimeSheetMonthlyRepository _TimeSheetMonthlyRepository;
        IDayOffYearRepository _DayOffYearRepository;
        IOverTimeRepository _OverTimeRepository;
        IEntitlementEditRepository _EntitlementEditRepository;
        IReportRepository _ReportRepository;
        IConfigRepository _ConfigRepository;
        public AttendanceBusiness(AttendanceDbContext context)
        {
            _context = context;
        }
        public IOverTimeRepository OverTimeRepository
        {
            get
            {
                if (_OverTimeRepository == null)
                    _OverTimeRepository = new OverTimeRepository(_context);

                return _OverTimeRepository;

            }
        }
        public IDayOffYearRepository DayOffYearRepository
        {
            get
            {
                if (_DayOffYearRepository == null)
                    _DayOffYearRepository = new DayOffYearRepository(_context);

                return _DayOffYearRepository;

            }
        }
        public ITimeSheetMonthlyRepository TimeSheetMonthlyRepository
        {
            get
            {
                if (_TimeSheetMonthlyRepository == null)
                    _TimeSheetMonthlyRepository = new TimeSheetMonthlyRepository(_context);

                return _TimeSheetMonthlyRepository;

            }
        }
        public IRegisterOffRepository RegisterOffRepository
        {
            get
            {
                if (_RegisterOffRepository == null)
                    _RegisterOffRepository = new RegisterOffRepository(_context);

                return _RegisterOffRepository;

            }
        }
        public IWorkSignRepository WorkSignRepository
        {
            get
            {
                if (_WorkSignRepository == null)
                    _WorkSignRepository = new WorkSignRepository(_context);

                return _WorkSignRepository;

            }
        }
        public ITimeLateEarlyRepository TimeLateEarlyRepository
        {
            get
            {
                if (_TimeLateEarlyRepository == null)
                    _TimeLateEarlyRepository = new TimeLateEarlyRepository(_context);

                return _TimeLateEarlyRepository;

            }
        }
        public ISalaryPeriodRepository SalaryPeriodRepository
        {
            get
            {
                if (_SalaryPeriodRepository == null)
                    _SalaryPeriodRepository = new SalaryPeriodRepository(_context);

                return _SalaryPeriodRepository;

            }
        }
        public ITimeSheetDailyRepository TimeSheetDailyRepository
        {
            get
            {
                if (_TimeSheetDailyRepository == null)
                    _TimeSheetDailyRepository = new TimeSheetDailyRepository(_context);

                return _TimeSheetDailyRepository;

            }
        }
        public IHolidayRepository HolidayRepository
        {
            get
            {
                if (_HolidayRepository == null)
                    _HolidayRepository = new HolidayRepository(_context);

                return _HolidayRepository;

            }
        }
        public IShiftRepository ShiftRepository
        {
            get
            {
                if (_ShiftRepository == null)
                    _ShiftRepository = new ShiftRepository(_context);

                return _ShiftRepository;

            }
        }
        public ITimeTypeRepository TimeTypeRepository
        {
            get
            {
                if (_TimeTypeRepository == null)
                    _TimeTypeRepository = new TimeTypeRepository(_context);

                return _TimeTypeRepository;

            }
        }
        public ISymbolRepository SymbolRepository
        {
            get
            {
                if (_SymbolRepository == null)
                    _SymbolRepository = new SymbolRepository(_context);

                return _SymbolRepository;

            }
        }

        public IEntitlementEditRepository EntitlementEditRepository
        {
            get
            {
                if (_EntitlementEditRepository == null)
                    _EntitlementEditRepository = new EntitlementEditRepository(_context);
                return _EntitlementEditRepository;
            }
        }

        public  IReportRepository ReportRepository
        {
            get
            {
                if (_ReportRepository == null)
                    _ReportRepository = new ReportRepository(_context);
                return _ReportRepository;
            }
        }

        public IConfigRepository ConfigRepository
        {
            get
            {
                if (_ConfigRepository == null)
                    _ConfigRepository = new ConfigRepository(_context);
                return _ConfigRepository;
            }
        }
    }
}
