using Common.Extensions;
using Common.Paging;
using System;
using System.Collections.Generic;
namespace ProfileDAL.ViewModels
{
    public class WelfareDTO : Pagings
    {
        public int? Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public decimal? Monney { get; set; }
        public int? Seniority { get; set; }
        public DateTime? DateStart { get; set; }
        public DateTime? DateEnd { get; set; }
        public string ContractTypeName { get; set; }
        public string ContractTypeIds { get; set; }
        
        public Boolean? IsActive { get; set; }
        public string Note { get; set; }
        public string CreateBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }

    public class WelfareInputDTO
    {
        public int? Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public decimal? Monney { get; set; }
        public int? Seniority { get; set; }
        public DateTime? DateStart { get; set; }
        public DateTime? DateEnd { get; set; }
        public List<int> ContractTypes { get; set; }
        public string Note { get; set; }
    }

}
