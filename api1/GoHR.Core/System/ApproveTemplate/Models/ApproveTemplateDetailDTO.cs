using Common.Paging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreDAL.ViewModels
{
    public class ApproveTemplateDetailDTO : Pagings
    {
        public int Id { get; set; }
        public int? TemplateId { get; set; }
        public int? AppLevel { get; set; }
        public int? AppType { get; set; }
        public int? AppId { get; set; }
        public int? InformDate { get; set; }
        public string InformEmail { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedLog { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
        public string ModifiedLog { get; set; }
        public int? TitleId { get; set; }
        public string NodeView { get; set; }

        //
        public string AppTypeName { get; set; }
        public string EmployeeCode { get; set; }
        public string EmployeeName { get; set; }
        public string TitleName { get; set; }
    }
}
