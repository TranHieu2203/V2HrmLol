using Common.Interfaces;
using Common.Paging;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AttendanceDAL.ViewModels
{
    public class TimeSheetMonthlyDTO : Pagings
    {
        [Required(ErrorMessage = "{0}_Required")]
        public int ORG_ID { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public int PERIOD_ID { get; set; }
        public int IS_QUIT { get; set; }
        public string EMPLOYEE_NAME { get; set; }
        public string EMPLOYEE_CODE { get; set; }
        public string ORG_NAME { get; set; }
        public string POSITION_NAME { get; set; }

    }
    public class TimeSheetInputDTO
    {
        [Required(ErrorMessage = "{0}_Required")]
        public long PeriodId { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public long OrgId { get; set; }
    }


    public class TimeSheetPortal
    {
        public decimal WorkingX { get; set; }
        public decimal WorkingLpay { get; set; }
        public decimal WorkingPay { get; set; }
        public decimal WorkingN { get; set; }
        public double WorkingStand { get; set; }
        public List<TimeSheetPortalDtl> Detail { get; set; }

    }

    public class TimeSheetPortalDtl
    {
        public DateTime WorkingDay { get; set; }
        public string TimeTypeName { get; set; }
        public string TimePoint1 { get; set; }
        public string TimePoint4 { get; set; }
        public int? LateInEarlyOut { get; set; }
        public int? LateIn { get; set; }
        public int? EarlyOut { get; set; }
        public decimal? OT { get; set; }
    }

    public class SwipeImportnput
    {
        public List<SwipeDataInput> Data { get; set; }
        public int OrgId { get; set; }
        public int PeriodId { get; set; }
    }
    public class SwipeDataInput
    {
        public string CODE { get; set; }
        public string TIME { get; set; }
    }
    public class MaChineInput
        
    {
        public int? ID { get; set; }
        public string TIME_EDIT { get; set; }
        public string TYPE_EDIT { get; set; }
        public string NOTE { get; set; }
    }

    public class EntitlementDTO : Pagings
    {
        public int OrgId { get; set; }
        public int Year { get; set; }
        public string FullName { get; set; }
        public string Code { get; set; }
    }

    public class RptAT001
    {
        public int Stt { get; set; }
        public string FullName { get; set; }
        public string Code { get; set; }
        public string OName { get; set; }
        public string PName { get; set; }
        public string WorkingDay { get; set; }
        public string TCode { get; set; }
        public string HoursStart { get; set; }
        public string HoursStop { get; set; }
        public string TimePoint1 { get; set; }
        public string TimePoint4 { get; set; }
        public int? LateIn { get; set; }
        public int? EarlyOut { get; set; }
        public string OtStart { get; set; }
        public string OtEnd { get; set; }
        public int? OtTime { get; set; }
        public int? OtTimeNight { get; set; }
    }


}
