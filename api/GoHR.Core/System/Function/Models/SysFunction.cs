using Common.Interfaces;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CoreDAL.Models
{
    [Table("SYS_FUNCTION")]
    public class SysFunction : IAuditableEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        [ForeignKey("SysGroupFunction")]
        public int? GROUP_ID { get; set; }
        [Required]
        [ForeignKey("SysModule")]
        public int MODULE_ID { get; set; }

        [Required]
        [MaxLength(100)]
        public string NAME { get; set; }
        [Required]
        [MaxLength(50)]
        public string CODE { get; set; }
        [MaxLength(50)]
        public string STATES { get; set; }
        [DefaultValue("1")]
        public Boolean? IS_ACTIVE { get; set; }
        [MaxLength(450)]
        public string CREATE_BY { get; set; }
        [MaxLength(450)]
        public string UPDATED_BY { get; set; }
        public DateTime? CREATE_DATE { get; set; }
        public DateTime? UPDATED_DATE { get; set; }

        public SysGroupFunction SysGroupFunction { get; set; }
        public SysModule SysModule { get; set; }

    }
}
