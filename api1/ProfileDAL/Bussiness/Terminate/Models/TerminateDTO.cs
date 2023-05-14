using Common.Paging;
using System;
using System.ComponentModel.DataAnnotations;

namespace ProfileDAL.ViewModels
{
    public class TerminateDTO : Pagings
    {
        public long Id { get; set; }
        public int? TenantId { get; set; }
        public long? EmployeeId { get; set; }
        public string EmployeeCode { get; set; }
        public string EmployeeName { get; set; }
        public string PositionName { get; set; }
        public string ContractNo { get; set; }
        public int? OrgId { get; set; }
        public string OrgName { get; set; }
        public string TerReason { get; set; }
        public DateTime? DateStart { get; set; }
        public DateTime? DateEnd { get; set; }
        public DateTime? EffectDate { get; set; }
        public DateTime? SendDate { get; set; }
        public DateTime? LastDate { get; set; }
        public long? SignId { get; set; }
        public string SignerName { get; set; }
        public string SignerPosition { get; set; }
        public DateTime? SignDate { get; set; }
        public int? StatusId { get; set; }
        public string DecisionNo { get; set; }
        public string StatusName { get; set; }
        public double? AmountViolations { get; set; }
        public double? TrainingCosts { get; set; }
        public double? OtherCompensation { get; set; }
    }

    public class TerminateView
    {
        public long Id { get; set; }
        public string EmployeeCode { get; set; }
        public string EmployeeName { get; set; }
        public string PositionName { get; set; }
        public string ContractNo { get; set; }
        public int? OrgId { get; set; }
        public string OrgName { get; set; }
        public string TerReason { get; set; }
        public DateTime? DateStart { get; set; }
        public DateTime? DateEnd { get; set; }
        public DateTime? EffectDate { get; set; }
        public string SignerName { get; set; }
        public string SignerPosition { get; set; }
        public DateTime? SignDate { get; set; }
        public int? StatusId { get; set; }
        public string DecisionNo { get; set; }
        public string StatusName { get; set; }
    }
    public class TerminateInputDTO
    {
        public long Id { get; set; }
      
        public int? TenantId { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public long? EmployeeId { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public DateTime? EffectDate { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public DateTime? SendDate { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public DateTime? LastDate { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public string TerReason { get; set; }
        public long? SignId { get; set; }
        public string SignerName { get; set; }
        public string SignerPosition { get; set; }
        public DateTime? SignDate { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public int? StatusId { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public string DecisionNo { get; set; }
        public double? AmountViolations { get; set; }
        public double? TrainingCosts { get; set; }
        public double? OtherCompensation { get; set; }
        public string CreateBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }

}
