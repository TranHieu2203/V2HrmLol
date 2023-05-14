using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace PayrollDAL.Models
{
    [Table("SYS_OTHER_LIST_FIX")]
    public class OtherListFix
    {
        public int ID { get; set; }

        [Required]
        [MaxLength(50)]
        public string CODE { get; set; }

        [Required]
        [MaxLength(100)]
        public string NAME { get; set; }
        [MaxLength(100)]
        public string TYPE { get; set; }
        public int ORDERS { get; set; }
    }
}
