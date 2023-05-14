using Common.Interfaces;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProfileDAL.Models
{
    [Table("SYS_PA_FORMULA")] // công thức lương
    public class FormulaSys : IAuditableEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long ID { get; set; }
        public int AREA_ID { get; set; }
        [Required]
        [MaxLength(50)]
        public string COL_NAME { get; set; }
        [ForeignKey("SalaryTypeSys")]
        public int SALARY_TYPE_ID { get; set; }
        [Required]
        [MaxLength(1000)]
        public string FORMULA { get; set; }
        [MaxLength(1000)]
        public string FORMULA_NAME { get; set; }
        public int? ORDERS { get; set; }
        [MaxLength(450)]
        public string CREATE_BY { get; set; }
        [MaxLength(450)]
        public string UPDATED_BY { get; set; }
        public DateTime? CREATE_DATE { get; set; }
        public DateTime? UPDATED_DATE { get; set; }
        public SalaryTypeSys SalaryTypeSys { get; set; }
    }
}
