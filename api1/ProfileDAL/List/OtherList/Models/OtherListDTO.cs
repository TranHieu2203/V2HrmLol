using Common.Paging;
using System;

namespace ProfileDAL.ViewModels
{
    public class OtherListDTO : Pagings
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public int? TypeId { get; set; }
        public int? Orders { get; set; }
        public string Note { get; set; }
        public Boolean? IsActive { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public string ACTFLG { get; set; }
    }

    public class SysOtherListInputDTO 
    {
        public int? Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public int? TypeId { get; set; }
        public int? Orders { get; set; }
        public string Note { get; set; }
        public string ACTFLG { get; set; }

    }
}
