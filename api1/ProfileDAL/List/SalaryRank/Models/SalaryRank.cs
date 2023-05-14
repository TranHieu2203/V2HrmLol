using Common.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProfileDAL.Models
{
    [Table("HU_SALARY_RANK")] //ngạch lương
    public class SalaryRank : IAuditableEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public  int ID { get; set; }

        [Required]
        [MaxLength(50)]
        public string CODE { get; set; }

        [Required]
        [MaxLength(100)]
        public string NAME { get; set; }

        public int? ORDERS { get; set; }
        public int? LEVEL_START { get; set; }

        [ForeignKey("SCALE")]
        public int? SALARY_SCALE_ID { get; set; }

        public Boolean? IS_ACTIVE { get; set; }
        [MaxLength(1500)]
        public string NOTE { get; set; }

        

        [MaxLength(450)]
        public string CREATE_BY { get; set; }
        [MaxLength(450)]
        public string UPDATED_BY { get; set; }
        public DateTime? CREATE_DATE { get; set; }
        public DateTime? UPDATED_DATE { get; set; }

        public SalaryScale SCALE { get; set; }

    }

}
