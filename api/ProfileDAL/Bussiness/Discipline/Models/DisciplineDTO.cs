using Common.Paging;
using System;
using System.ComponentModel.DataAnnotations;

namespace ProfileDAL.ViewModels
{
    public class DisciplineDTO : Pagings
    {
        public long? Id { get; set; }
        public string DisciplineObjName { get; set; } // Đối tượng kỷ luật
        public string EmployeeCode { get; set; }
        public string EmployeeName { get; set; }
        public string Reason { get; set; }
        public int? WorkStatusId { get; set; }
        public int? OrgId { get; set; }
        public string OrgName { get; set; }
        public string PositionName { get; set; }
        public string No { get; set; }
        public DateTime? EffectDate { get; set; }
        public string DisciplineType { get; set; } // Hình thức kỷ luật
        public double? Money { get; set; } // Mức phạt
        public int? StatusId { get; set; } // Trạng thái
        public string StatusName { get; set; } // Trạng thái
        public string CreateBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }

    public class DisciplineInputDTO
    {
        public long? Id { get; set; }
        public long? Tenant_Id { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public int DisciplineObjId { get; set; } // Đối tượng kỷ luật
        [Required(ErrorMessage = "{0}_Required")]
        public DateTime EffectDate { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public string No { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public int? StatusId { get; set; } // Trạng thái
        [Required(ErrorMessage = "{0}_Required")]
        public long? SignId { get; set; } // Trạng thái
        [Required(ErrorMessage = "{0}_Required")]
        public DateTime SignDate { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public string SignerName { get; set; } // Tên người ký
        [Required(ErrorMessage = "{0}_Required")]
        public string SignerPosition { get; set; } // Chức danh người ký
        [Required(ErrorMessage = "{0}_Required")]
        public string DisciplineType { get; set; } // Hình thức kỷ luật
        public string Reason { get; set; } // Tên người ký
        [Required(ErrorMessage = "{0}_Required")]
        public double Money { get; set; } // Mức phạt
        [Required(ErrorMessage = "{0}_Required")]
        public Boolean IsSalary { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public int Year { get; set; }
        public int? PeriodId { get; set; } // kỳ lương
        public int? OrgId { get; set; }
        public long? EmployeeId { get; set; }
    }
}
