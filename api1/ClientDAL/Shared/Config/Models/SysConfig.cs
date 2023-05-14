using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace ClientDAL.Models
{
    [Table("SYS_CONFIG")]
    public class SysConfig
    {
        public int ID { get; set; }

        [Required]
        [MaxLength(50)]
        public string CODE { get; set; }

        [Required]
        [MaxLength(100)]
        public string NAME { get; set; }
        [Required]
        [MaxLength(100)]
        public string TYPE { get; set; }
        [DefaultValue("1")]
        public Boolean? IS_ACTIVE { get; set; }
    }
}
