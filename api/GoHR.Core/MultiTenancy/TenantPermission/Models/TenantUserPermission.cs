using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CoreDAL.Models
{
    [Table("TENANT_USER_PERMISSION")]
    public class TenantUserPermission
    {
        [Key]
        public Int64 ID { get; set; }
        
        [ForeignKey("TenantUser")]
        public string USER_ID { get; set; }
        [ForeignKey("TenantFunction")]
        public int FUNCTION_ID { get; set; }
        [ForeignKey("SysConfig")]
        public int APPLICATION_ID { get; set; }
        [MaxLength(250)]
        public string PERMISSION_STRING { get; set; }

 
        public TenantFunction TenantFunction { get; set; }
        public TenantUser TenantUser { get; set; }
        public SysConfig SysConfig { get; set; }
    }
}
