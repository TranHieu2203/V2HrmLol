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
    [Table("SE_APP_TEMPLATE_DTL")]
    public class ApproveTemplateDetail
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        public int? TEMPLATE_ID { get; set; }
        public int? APP_LEVEL { get; set; }
        public int? APP_TYPE { get; set; }
        public int? APP_ID { get; set; }
        public int? INFORM_DATE { get; set; }
        public string INFORM_EMAIL { get; set; }
        public DateTime? CREATED_DATE { get; set; }
        public string CREATED_BY { get; set; }
        public string CREATED_LOG { get; set; }
        public DateTime? MODIFIED_DATE { get; set; }
        public string MODIFIED_BY { get; set; }
        public string MODIFIED_LOG { get; set; }
        public int? TITLE_ID { get; set; }
        public string NODE_VIEW { get; set; }
    }
}
