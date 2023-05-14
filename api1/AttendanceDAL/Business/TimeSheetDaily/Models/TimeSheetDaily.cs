using Common.Interfaces;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AttendanceDAL.Models
{
    [Table("AT_TIMESHEET_DAILY")]
    public class TimeSheetDaily : IAuditableEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long ID { get; set; }
        
        [ForeignKey("Employee")]
        public long EMPLOYEE_ID { get; set; }
        [ForeignKey("SalaryPeriod")]
        public long PERIOD_ID { get; set; }
        public DateTime WORKINGDAY { get; set; }
        [ForeignKey("TimeType")]
        public long TIMETYPE_ID { get; set; }
        public int? OT_TIME { get; set; }
        public int? OT_TIME_NIGHT { get; set; }
        public bool? IS_REGISTER_OFF { get; set; }
        public bool? IS_REGISTER_LATE_EARLY { get; set; }
        public bool? IS_HOLIDAY { get; set; }
        [MaxLength(450)]
        public string CREATE_BY { get; set; }
        [MaxLength(450)]
        public string UPDATED_BY { get; set; }
        public DateTime? CREATE_DATE { get; set; }
        public DateTime? UPDATED_DATE { get; set; }
        public TimeType TimeType { get; set; }
        public SalaryPeriod SalaryPeriod { get; set; }
        public Employee Employee { get; set; }
    }
}
