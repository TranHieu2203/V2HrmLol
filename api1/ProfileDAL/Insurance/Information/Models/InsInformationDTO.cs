using Common.Paging;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ProfileDAL.ViewModels
{
    public class InsInformationDTO : Pagings
    {
        public long Id { get; set; }
        public int? TenantId { get; set; }
        public int? EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public string EmployeeCode { get; set; }
        public int? OrgId { get; set; }
        public string OrgName { get; set; }
        public string PositionName { get; set; }
        public string BhxhNo { get; set; }
        public DateTime? BhxhDate { get; set; }
        public string BhxhPlace { get; set; }
        public int? BhxhStatusId { get; set; }// Tình trạn giữ
        public string BhxhStatusName { get; set; }// Tình trạn giữ
        public string BhxhNote { get; set; }
        public string BhytNo { get; set; }
        public DateTime? BhytEffectDate { get; set; }
        public DateTime? BhytExpireDate { get; set; }
        public int? PlaceRegisId { get; set; }
        public int? WorkStatusId { get; set; }
        public string PlaceRegisName { get; set; }
        public DateTime? TerEffectDate { get; set; }
    }

    public class InsInformationInputDTO
    {
        public long Id { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public int? EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public string EmployeeCode { get; set; }
        public string OrgName { get; set; }
        public string PositionName { get; set; }
        public string BhxhNo { get; set; }
        public DateTime? BhxhDate { get; set; }
        public string BhxhPlace { get; set; }
        public int? BhxhStatusId { get; set; }// Tình trạn giữ
        public string BhxhNote { get; set; }
        public string BhytNo { get; set; }
        public DateTime? BhytEffectDate { get; set; }
        public DateTime? BhytExpireDate { get; set; }
        public int? PlaceRegisId { get; set; }
        public string CreateBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdatedDate { get; set; }

    }

}
