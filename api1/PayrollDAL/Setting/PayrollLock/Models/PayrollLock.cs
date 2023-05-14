using Common.Interfaces;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PayrollDAL.Models
{
    [Table("PA_CALCULATE_LOCK")]
    public class CalculateLock : IAuditableEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long ID { get; set; }
        
        [ForeignKey("SalaryPeriod")]
        public long PERIOD_ID { get; set; }
        [ForeignKey("Organization")]
        public int ORG_ID { get; set; }
        [MaxLength(450)]
        public string CREATE_BY { get; set; }
        [MaxLength(450)]
        public string UPDATED_BY { get; set; }
        public DateTime? CREATE_DATE { get; set; }
        public DateTime? UPDATED_DATE { get; set; }
        public Organization Organization { get; set; }
        public SalaryPeriod SalaryPeriod { get; set; }
    }
    [Table("PA_KPI_LOCK")]
    public class KpiLock : IAuditableEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long ID { get; set; }
        
        [ForeignKey("SalaryPeriod")]
        public long PERIOD_ID { get; set; }
        [ForeignKey("Organization")]
        public int ORG_ID { get; set; }
        [MaxLength(450)]
        public string CREATE_BY { get; set; }
        [MaxLength(450)]
        public string UPDATED_BY { get; set; }
        public DateTime? CREATE_DATE { get; set; }
        public DateTime? UPDATED_DATE { get; set; }
        public Organization Organization { get; set; }
        public SalaryPeriod SalaryPeriod { get; set; }
    }
}
