using Common.Paging;
using ProfileDAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ProfileDAL.ViewModels
{
    public class SalaryRankDTO : Pagings
    {
        public int? Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public int? SalaryScaleId { get; set; }
        public string SalaryScaleName { get; set; }
        public int? Orders { get; set; }
        public Boolean? IsActive { get; set; }
        public string Note { get; set; }
        public string CreateBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }

    public class SalaryRankInputDTO
    {
        public int? Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public int? SalaryScaleId { get; set; }
        public int? Orders { get; set; }
        public int? LevelStart { get; set; }
        public string Note { get; set; }
    }


    public class SalaryRankCountDTO
    {
        public int STT { get; set; }
        public int? Id { get; set; }
        public string Name { get; set; }
        public string ScaleName { get; set; }
        public int ScaleId { get; set; }
        public int Count { get; set; }
        public List<SalaryLevel> lstSalaryLevel { get; set; }
    }
    public class SalaryResultDTO
    {
        public int STT { get; set; }
        public int Id { get; set; }
        public string Name { get; set; }
        public List<SalaryRankR> SalaryRanks { get; set; }
    }
    public class SalaryRankR {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<SalaryLevelDTO> SalaryLevels {  get; set;  }
    }
    public class SalaryRankStart
    {
        public string Code { get; set; }
        public int LevelStart { get; set; }
    }
}
