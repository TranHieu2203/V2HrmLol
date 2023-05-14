using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreDAL.Models
{
    [Table("HU_POSITION")]
    public class Position
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        public string CODE { get; set; }
        public string NAME { get; set; }
        public int? ORG_ID { get; set; }
        public int? MASTER { get; set; }
        public Boolean? IS_ACTIVE { get; set; }
        public DateTime? CREATE_DATE { get; set; }
    }
}
