using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreDAL.Models
{
    [Table("SYS_OTHER_LIST_FIX")]
    public class OtherListFix
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        public string TYPE { get; set; }
        public string CODE { get; set; }
        public string NAME { get; set; }
        public int? ORDERS { get; set; }
    }
}
