﻿using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PayrollDAL.Models
{
    [Table("HU_EMPLOYEE")]
    public class Employee
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long ID { get; set; }
        
        [Required]
        [MaxLength(10)]
        public string CODE { get; set; }
        [MaxLength(1000)]
        public string AVATAR { get; set; }
        [Required]
        [MaxLength(100)]
        public string FULLNAME { get; set; }
        public int ORG_ID { get; set; }
        public int POSITION_ID { get; set; }
        [MaxLength(50)]
        public string ITIME_CODE { get; set; } // mã chấm công
    };

    [Table("AT_SALARY_PERIOD")]// ky luong
    public class SalaryPeriod 
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long ID { get; set; }
        
        [Required]
        [MaxLength(100)]
        public string NAME { get; set; }
        public int YEAR { get; set; }
        public DateTime DATE_START { get; set; }
        public DateTime DATE_END { get; set; }
        public int STANDARD_WORKING { get; set; }
        public string NOTE { get; set; }
        [MaxLength(1000)]
        public bool IS_ACTIVE { get; set; }
        [MaxLength(450)]
        public string CREATE_BY { get; set; }
        [MaxLength(450)]
        public string UPDATED_BY { get; set; }
        public DateTime? CREATE_DATE { get; set; }
        public DateTime? UPDATED_DATE { get; set; }

    }
}
