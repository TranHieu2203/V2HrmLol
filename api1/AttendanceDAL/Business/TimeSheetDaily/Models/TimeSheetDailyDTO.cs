using Common.Paging;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AttendanceDAL.ViewModels
{
    public class TimeSheetDailyDTO : Pagings
    {
        public int ORG_ID { get; set; }
        public int PERIOD_ID { get; set; }
        public int IS_QUIT { get; set; } // hiển thị nghỉ việc
        public string EMPLOYEE_NAME { get; set; }
        public string EMPLOYEE_CODE { get; set; }
        public string ORG_NAME { get; set; }
        public string POSITION_NAME { get; set; }
        public int? TYPE_ID { get; set; }
    }
    public class TimeSheetDailyInputDTO
    {
        public long Id { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public int YearId { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public long TimeTypeId { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public int PeriodId { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public long EmployeeId { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public DateTime DateStart { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public DateTime DateEnd { get; set; }
    }

    public class SwipeDataTenantDTO
    {
        public int TenantId { get; set; }
        public long EmpId { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public string Model { get; set; }
        public string Mac { get; set; }
        public string OperationSystem { get; set; }
        public string OperationVersion { get; set; }
        public string WifiIp { get; set; }
        public string Bssid { get; set; }
    }
    public class SettingMapDTO
    {
        public string Lat { get; set; }
        public string Long { get; set; }
        public decimal? Radius { get; set; }
        public string Ip { get; set; }
    }

    public class paramSearch
    {
        public int EmpId { get; set; }
        public int PeriodId { get; set; }
        public DateTime? Day { get; set; }
    }
}
