using Common.Interfaces;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProfileDAL.Models
{
    [Table("INS_TYPE")]
    public class InsuranceType : IAuditableEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        public int TYPE_ID { get; set; } // Loại biến động; 1: Tăng; 2: Giảm: 3: 
        [Required]
        [MaxLength(150)]
        public string NAME { get; set; }
        [MaxLength(550)]
        public string NOTE { get; set; }
        public bool IS_ACTIVE { get; set; }
        [MaxLength(450)]
        public string CREATE_BY { get; set; }
        [MaxLength(450)]
        public string UPDATED_BY { get; set; }
        public DateTime? CREATE_DATE { get; set; }
        public DateTime? UPDATED_DATE { get; set; }
    }
}
