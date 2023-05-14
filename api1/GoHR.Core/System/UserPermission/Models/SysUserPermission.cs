using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CoreDAL.Models
{
    [Table("SYS_USER_PERMISSION")]
    public class SysUserPermission
    {
        [Key]
        public int ID { get; set; }
        [ForeignKey("SysUser")]
        public string USER_ID { get; set; }
        [ForeignKey("SysFunction")]
        public int FUNCTION_ID { get; set; }
        [MaxLength(250)]
        public string PERMISSION_STRING { get; set; }

        public SysUser SysUser { get; set; }
        public SysFunction SysFunction { get; set; }

    }
}
