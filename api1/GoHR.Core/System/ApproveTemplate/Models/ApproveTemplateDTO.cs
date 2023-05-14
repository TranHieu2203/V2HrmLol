using Common.Paging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreDAL.ViewModels
{
    public class ApproveTemplateDTO : Pagings
    {
        public int Id { get; set; }
        public string TemplateName { get; set; }
        public int? TemplateType { get; set; }
        public int? TemplateOrder { get; set; }
        public string Actflg { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedLog { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
        public string ModifiedLog { get; set; }
        public string TemplateCode { get; set; }

        //
        public string TemplateTypeName { get; set; }
    }
}
