using Common.Paging;
using System;
using System.Collections.Generic;

namespace CoreDAL.ViewModels
{
    public class TenantGroupDTO : Pagings
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }      
        public Boolean? IsActive { get; set; }
        public string CreateBy { get; set; }
        public string UpdateBy { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }
    }

    public class TenantGroupInputDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public List<string> Users { get; set; }
    }
}
