using Common.Extensions;
using Common.Paging;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProfileDAL.ViewModels
{
    public class CompanyInfoDTO : Pagings
    {
        public int Id { get; set; }
        public string NameVN { get; set; }
        public string NameEN { get; set; }
        public int OrgId { get; set; }
        public string OrgCode { get; set; }
        public string OrgName { get; set; }
        public string GPKDAddress { get; set; }
        public int RegionId { get; set; }
        public string RegionName { get; set; }
        public string PhoneNumber { get; set; }
        public string WorkAddress { get; set; }
        public int? InsUnit { get; set; }
        public string InsUnitName { get; set; }
        public int? ProvinceId { get; set; }
        public string ProvinceName { get; set; }
        public int? DistrictId { get; set; }
        public string DistrictName { get; set; }
        public int? WardId { get; set; }
        public string WardName { get; set; }
        public string FileLogo { get; set; }
        public string BankAccount { get; set; }
        public int? BankId { get; set; }
        public string BankName { get; set; }
        public int? BankBranchId { get; set; }
        public string BankBranch { get; set; }
        public string BankBranchName { get; set; }
        public string FileHeader { get; set; }
        public string PitCode { get; set; }
        public string PitCodeChange { get; set; }
        public string PitCodeDate { get; set; }
        public string FileFooter { get; set; }
        public int? RepresentativeId { get; set; }
        public string RepresentativeName { get; set; }
        public string RepresentativePosition { get; set; }
        public string RepresentativeNation { get; set; }
        public int? SignId { get; set; }
        public string SignName { get; set; }
        public string SignPosition { get; set; }
        public string SignNation { get; set; }
        public string PitCodePlace { get; set; }
        public string GPKDNo { get; set; }
        public string GPKDDate { get; set; }
        public string Website { get; set; }
        public string Fax { get; set; }

        public Boolean? IsActive { get; set; }
        public string IsActiveName { get; set; }
        public string Note { get; set; }
        public string CreateBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }

    public class CompanyInfoInputDTO
    {
        public int? Id { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public string NameVN { get; set; }
        public string NameEN { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public int OrgId { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public string GPKDAddress { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public int RegionId { get; set; }
        public string PhoneNumber { get; set; }
        public string WorkAddress { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public int? InsUnit { get; set; }
        public int? ProvinceId { get; set; }
        public int? DistrictId { get; set; }
        public int? WardId { get; set; }
        public string FileLogo { get; set; }
        public string BankAccount { get; set; }
        public int? BankId { get; set; }
        public string BankName { get; set; }
        public int? BankBranchId { get; set; }
        public string BankBranch { get; set; }
        public string BankBranchName { get; set; }
        public string FileHeader { get; set; }
        public string PitCode { get; set; }
        public string PitCodeChange { get; set; }
        public DateTime? PitCodeDate { get; set; }
        public string FileFooter { get; set; }
        public int? RepresentativeId { get; set; }
        public int? SignId { get; set; }
        public string PitCodePlace { get; set; }
        public string GPKDNo { get; set; }
        public DateTime? GPKDDate { get; set; }
        public string Website { get; set; }
        public string Fax { get; set; }

        public Boolean? IsActive { get; set; }
        public string Note { get; set; }
    }

}
