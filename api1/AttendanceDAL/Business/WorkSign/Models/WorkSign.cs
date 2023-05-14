using Common.Interfaces;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AttendanceDAL.Models
{
    [Table("AT_WORKSIGN")]// xep ca lam viec
    public class WorkSign : IAuditableEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long ID { get; set; }
        
        [ForeignKey("employee")]
        public long EMPLOYEE_ID { get; set; }
        [ForeignKey("salaryPeriod")]
        public long PERIOD_ID { get; set; }
        public DateTime WORKINGDAY { get; set; }
        [ForeignKey("Shift")]
        public long? SHIFT_ID { get; set; }
        [MaxLength(450)]
        public string CREATE_BY { get; set; }
        [MaxLength(450)]
        public string UPDATED_BY { get; set; }
        public DateTime? CREATE_DATE { get; set; }
        public DateTime? UPDATED_DATE { get; set; }
        public Shift Shift { get; set; }
        public SalaryPeriod salaryPeriod { get; set; }
    }
    [Table("AT_WORKSIGN_TMP")]// xep ca lam viec tạm ( import)
    public class WorkSignTmp : IAuditableEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long ID { get; set; }
        [MaxLength(50)]
        public string CODE { get; set; }
        [MaxLength(150)]
        public string REF_CODE { get; set; }
        
        [ForeignKey("employee")]
        public long EMPLOYEE_ID { get; set; }
        public long PERIOD_ID { get; set; }
        public string DAY_1 { get; set; }
        public string DAY_2 { get; set; }
        public string DAY_3 { get; set; }
        public string DAY_4 { get; set; }
        public string DAY_5 { get; set; }
        public string DAY_6 { get; set; }
        public string DAY_7 { get; set; }
        public string DAY_8 { get; set; }
        public string DAY_9 { get; set; }
        public string DAY_10 { get; set; }
        public string DAY_11 { get; set; }
        public string DAY_12 { get; set; }
        public string DAY_13 { get; set; }
        public string DAY_14 { get; set; }
        public string DAY_15 { get; set; }
        public string DAY_16 { get; set; }
        public string DAY_17 { get; set; }
        public string DAY_18 { get; set; }
        public string DAY_19 { get; set; }
        public string DAY_20 { get; set; }
        public string DAY_21 { get; set; }
        public string DAY_22 { get; set; }
        public string DAY_23 { get; set; }
        public string DAY_24 { get; set; }
        public string DAY_25 { get; set; }
        public string DAY_26 { get; set; }
        public string DAY_27 { get; set; }
        public string DAY_28 { get; set; }
        public string DAY_29 { get; set; }
        public string DAY_30 { get; set; }
        public string DAY_31 { get; set; }
        [MaxLength(450)]
        public string CREATE_BY { get; set; }
        [MaxLength(450)]
        public string UPDATED_BY { get; set; }
        public DateTime? CREATE_DATE { get; set; }
        public DateTime? UPDATED_DATE { get; set; }
    }
   
    
    [Table("AT_WORKSIGN_DUTY")]// xep ca lam viec
    public class WorkSignDuty : IAuditableEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long ID { get; set; }
        
        [ForeignKey("employee")]
        public long EMPLOYEE_ID { get; set; }
        public long PERIOD_ID { get; set; }
        public DateTime WORKINGDAY { get; set; }
        [ForeignKey("Shift")]
        public long? SHIFT_ID { get; set; }
        [MaxLength(450)]
        public string CREATE_BY { get; set; }
        [MaxLength(450)]
        public string UPDATED_BY { get; set; }
        public DateTime? CREATE_DATE { get; set; }
        public DateTime? UPDATED_DATE { get; set; }
        public Shift Shift { get; set; }
    }

}
