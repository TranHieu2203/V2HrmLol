using Common.Paging;
using System;
using System.Collections.Generic;
using System.Text;

namespace ProfileDAL.ViewModels
{
    public class ContractTypeViewDTO : Pagings
    {
        public int? Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public int? Period{ get; set; }
        public int? DayNotice { get; set; }
        public string Note { get; set; }
        public Boolean? IsActive { get; set; }
        public bool? IsLeave { get; set; } // có tính phép
    }
    public class ContractTypeOutputDTO
    {
        public int? Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public int? Period { get; set; }
        public int? DayNotice { get; set; }
        public string Note { get; set; }
        public Boolean? IsActive { get; set; }
        public string CreateBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdatedDate { get; set; }

    }

    public class ContractTypeInputDTO
    {
        public int? Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public int? Period { get; set; }
        public int? DayNotice { get; set; }
        public string Note { get; set; }
        public bool? IsLeave { get; set; } // có tính phép

    }

}
