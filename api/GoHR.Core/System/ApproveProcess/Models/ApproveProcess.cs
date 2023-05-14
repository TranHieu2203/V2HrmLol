using Common.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreDAL.Models
{
    [Table("SE_APP_PROCESS")]
    public class ApproveProcess
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        public string NAME { get; set; }
        public string ACTFLG { get; set; }
        public string PROCESS_CODE { get; set; }
        public int? NUMREQUEST { get; set; }
        public string EMAIL { get; set; }
        public Boolean? IS_SEND_EMAIL { get; set; }
    }
}
