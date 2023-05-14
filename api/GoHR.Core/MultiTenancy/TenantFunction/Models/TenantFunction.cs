using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CoreDAL.Models
{
    [Table("TENANT_FUNCTION")]
    public class TenantFunction
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        
        [ForeignKey("SysFunction")]
        public int FUNCTION_ID { get; set; }

        public Tenant Tenant { get; set; }
        public SysFunction SysFunction { get; set; }
    }
}
