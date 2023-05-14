using Common.Paging;
using System;

namespace ProfileDAL.ViewModels
{
    public class SalaryLevelDTO : Pagings
    {
        public int? Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public int? Orders { get; set; }
        public int? SalaryRankId { get; set; }
        public string SalaryRankName { get; set; }
        public int? SalaryScaleId { get; set; }
        public string SalaryScaleName { get; set; }
        public decimal? Monney { get; set; }
        public Boolean? IsActive { get; set; }
        public string Note { get; set; }
    }
  
    public class SalaryLevelInputDTO
    {
        public int? Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public int? Orders { get; set; }
        public int SalaryRankId { get; set; }
        public int SalaryScaleId { get; set; }
        public decimal? Monney { get; set; }
        public decimal? Coefficient { get; set; }
        public Boolean? IsActive { get; set; }
        public string Note { get; set; }
        
    }
}
