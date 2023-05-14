using Common.Interfaces;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CoreDAL.Models
{
    [Table("SYS_GROUP_PERMISSION")]
    public class SysGroupPermission : IAuditableEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        [ForeignKey("SysGroupUser")]
        public int GROUP_ID { get; set; }
        [ForeignKey("SysFunction")]
        public int FUNCTION_ID { get; set; }
        [MaxLength(500)]
        public string PERMISSION_STRING { get; set; }
        [MaxLength(450)]
        public string CREATE_BY { get; set; }
        [MaxLength(450)]
        public string UPDATED_BY { get; set; }
        public DateTime? CREATE_DATE { get; set; }
        public DateTime? UPDATED_DATE { get; set; }
        public SysGroupUser SysGroupUser { get; set; }
        public SysFunction SysFunction { get; set; }
    }
}
