using Common.Interfaces;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CoreDAL.Models
{
    [Table("SYS_MODULE")]
    public class SysModule : IAuditableEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        [ForeignKey("SysConfig")]
        public int? APPLICATION_ID { get; set; }
        [Required]
        [MaxLength(100)]
        public string NAME { get; set; }
        [MaxLength(50)]
        public string CODE { get; set; }
        [MaxLength(550)]
        public string NOTE { get; set; }
        
        public int? ORDERS { get; set; }
        [Required]
        [DefaultValue("0")]
        public decimal PRICE { get; set; }
        [DefaultValue("1")]
        public Boolean? IS_ACTIVE { get; set; }
        [MaxLength(450)]
        public string CREATE_BY { get; set; }
        [MaxLength(450)]
        public string UPDATED_BY { get; set; }
        public DateTime? CREATE_DATE { get; set; }
        public DateTime? UPDATED_DATE { get; set; }
        public SysConfig SysConfig { get; set; }
    }
}
