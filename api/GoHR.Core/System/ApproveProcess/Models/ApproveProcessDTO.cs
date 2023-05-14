using Common.Paging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreDAL.ViewModels
{
    public class ApproveProcessDTO : Pagings
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Actflg { get; set; }
        public string ProcessCode { get; set; }
        public int? NumRequest { get; set; }
        public string Email { get; set; }
        public Boolean? IsSendEmail { get; set; }
    }
}
