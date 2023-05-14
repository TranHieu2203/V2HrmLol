using Common.Paging;
using ProfileDAL.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ProfileDAL.ViewModels
{
    public class HUJobDTO
    {
        public List<HUJobFunctionDTO> Child { get; set; }
        public int Id { get; set; }
        public int? typeId { get; set; }
        public string NameVN { get; set; }
        public string NameEN { get; set; }
        public string Code { get; set; }
        public string Actflg { get; set; }
        public string Note { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedLog { get; set; }
        public DateTime? ModifedDate { get; set; }
        public string ModifiedBy { get; set; }
        public string ModifiedLog { get; set; }
        public string Request { get; set; }
        public string Purpose { get; set; }
        public string PhanLoaiID { get; set; }
        public string JobBandID { get; set; }
        public string JobFamilyID { get; set; }
    }

    public class HUJobInputDTO : Pagings
    {
        public decimal Id { get; set; }
        public int? typeId { get; set; }
        
        public string NameVN { get; set; }
        public string NameEN { get; set; }
        public string Code { get; set; }
        public string Actflg { get; set; }
        public string ActflgStr { get; set; }
        public string Note { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedLog { get; set; }
        public DateTime? ModifedDate { get; set; }
        public string ModifiedBy { get; set; }
        public string ModifiedLog { get; set; }
        public string Request { get; set; }
        public string Purpose { get; set; }
        public string PhanLoaiID { get; set; }
        public string JobBandID { get; set; }
        public string JobFamilyID { get; set; }
    }

    public class HUJobFunctionDTO
    {
        public int Id { get; set; }
        public int JobID { get; set; }
        public string Name { get; set; }
        public string NameEN { get; set; }
        public int? ParentID { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedLog { get; set; }
        public DateTime? ModifedDate { get; set; }
        public string ModifiedBy { get; set; }
        public string ModifiedLog { get; set; }
        public int? FunctionID { get; set; }
    }

}
