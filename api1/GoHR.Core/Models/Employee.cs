using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreDAL.Models
{
    [Table("HU_EMPLOYEE")]
    public class Employee
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        public string CODE { get; set; }
        public string FULLNAME { get; set; }
        public int? WORK_STATUS_ID { get; set; }
        public DateTime? TER_EFFECT_DATE { get; set; }
    }
}
