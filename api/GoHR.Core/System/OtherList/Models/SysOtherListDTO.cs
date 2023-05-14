using Common.Paging;
using System;

namespace CoreDAL.ViewModels
{
    public class SysOtherListDTO : Pagings
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public int? Type_Id { get; set; }
        public int? Orders { get; set; }
        public Boolean? IsActive { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }

    public class SysOtherListInputDTO 
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public int? TypeId { get; set; }
        public int? Orders { get; set; }
    }
}
