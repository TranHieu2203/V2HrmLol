using Common.Interfaces;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProfileDAL.Models
{
    [Table("SYS_PA_ELEMENT")] // PHẦN TỬ LƯƠNG Mẫu
    public class SalaryElementSys : IAuditableEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long ID { get; set; }
        [Required]
        [MaxLength(50)]
        public string CODE { get; set; }
        [Required]
        [MaxLength(100)]
        public string NAME { get; set; }
        public long GROUP_ID { get; set; }
        public int AREA_ID { get; set; }
        public bool IS_SYSTEM { get; set; }
        public bool IS_ACTIVE { get; set; }
        public int ORDERS { get; set; }
        public int DATA_TYPE { get; set; } // 0: Kiểu số; 1 kiểu TEXT
        [MaxLength(550)]
        public string NOTE { get; set; }
        [MaxLength(450)]
        public string CREATE_BY { get; set; }
        [MaxLength(450)]
        public string UPDATED_BY { get; set; }
        public DateTime? CREATE_DATE { get; set; }
        public DateTime? UPDATED_DATE { get; set; }
    }
}
