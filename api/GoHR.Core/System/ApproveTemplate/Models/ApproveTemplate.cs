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
    [Table("SE_APP_TEMPLATE")]
    public class ApproveTemplate
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        public string TEMPLATE_NAME { get; set; }
        public int? TEMPLATE_TYPE { get; set; }
        public int? TEMPLATE_ORDER { get; set; }
        public string ACTFLG { get; set; }
        public DateTime? CREATED_DATE { get; set; }
        public string CREATED_BY { get; set; }
        public string CREATED_LOG { get; set; }
        public DateTime? MODIFIED_DATE { get; set; }
        public string MODIFIED_BY { get; set; }
        public string MODIFIED_LOG { get; set; }
        public string TEMPLATE_CODE { get; set; }
    }
}
