using Common.Interfaces;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CoreDAL.Models
{
    [Table("TENANT_GROUP_PERMISSION")]
    public class TenantGroupPermisstion : IAuditableEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        [ForeignKey("TenantGroup")]
        public int GROUP_ID { get; set; }
        [ForeignKey("TenantFunctions")]
        public int FUNCTION_ID { get; set; }
        [MaxLength(500)]
        public string PERMISSION_STRING { get; set; }
        
        [ForeignKey("SysConfig")]
        public int APPLICATION_ID { get; set; }
        [MaxLength(450)]
        public string CREATE_BY { get; set; }
        [MaxLength(450)]
        public string UPDATED_BY { get; set; }
        public DateTime? CREATE_DATE { get; set; }
        public DateTime? UPDATED_DATE { get; set; }
        public TenantGroup TenantGroup { get; set; }
        public TenantFunction TenantFunctions { get; set; }

        public SysConfig SysConfig { get; set; }
        public Tenant Tenant { get; set; }
    }
}
