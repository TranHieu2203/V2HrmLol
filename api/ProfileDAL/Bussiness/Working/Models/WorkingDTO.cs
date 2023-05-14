using Common.Paging;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProfileDAL.ViewModels
{
    public class WorkingDTO : Pagings
    {
        public Int64? Id { get; set; }
        public Int64? EmployeeId { get; set; }
        public string EmployeeCode { get; set; }
        public string EmployeeName { get; set; }
        public int? WorkStatusId { get; set; }
        public string PositionName { get; set; }
        public int? OrgId { get; set; }
        public string OrgName { get; set; }
        public DateTime? EffectDate { get; set; }
        public string DecisionNo { get; set; } // Số Quyết định
        public int? TypeId { get; set; } // Loại Quyết định
        public string TypeName { get; set; } // Loại Quyết định        
        public int? StatusId { get; set; } // Trạng thái
        public string StatusName { get; set; }
        public string SignerName { get; set; } // Tên người ký
        public string SignerCode { get; set; } // Tên người ký
        public string SignerPosition { get; set; } // Chức danh người ký
        public string Note { get; set; }
        public string SalaryType { get; set; }
        public DateTime? SignDate { get; set; } // Ngày ký
        public decimal? SalBasic { get; set; } // Lương cơ bản
        public decimal? SalTotal { get; set; } // Tổng lương
        public decimal? SalPercent { get; set; } // Tỷ lệ hưởng lương
    }

    public class WorkingInputDTO
    {
        public Int64? Id { get; set; }
        public int? Tenant_Id { get; set; }
        //[Required(ErrorMessage = "{0}_Required")]
        public Int64 EmployeeId { get; set; }
        //[Required(ErrorMessage = "{0}_Required")]
        public int PositionId { get; set; }
        //[Required(ErrorMessage = "{0}_Required")]
        public int OrgId { get; set; }
        //[Required(ErrorMessage = "{0}_Required")]
        public int TypeId { get; set; } // Loại Quyết định
        //[Required(ErrorMessage = "{0}_Required")]
        public string DecisionNo { get; set; }
        //[Required(ErrorMessage = "{0}_Required")]
        public DateTime? EffectDate { get; set; }
        //[Required(ErrorMessage = "{0}_Required")]
        public int StatusId { get; set; } // Trạng thái
        public int? SalaryTypeId { get; set; } // Bảng lương
        public int? SalaryScaleId { get; set; } // Thang lương
        public int? SalaryRankId { get; set; } // Ngạch lương
        public int? SalaryLevelId { get; set; } // Bậc lương
        public decimal? Coefficient { get; set; }
        public decimal? SalBasic { get; set; } // Lương cơ bản
        public decimal? SalTotal { get; set; } // Tổng lương
        public decimal? SalPercent { get; set; } // Tỷ lệ hưởng lương
        public Int64? SignId { get; set; } // Người ký
        public string SignerName { get; set; } // Tên người ký
        public string SignerPosition { get; set; } // Chức danh người ký
        public DateTime? SignDate { get; set; } // Ngày ký
        public string Note { get; set; }
    }

    public class ImportDtlParam
    {
        public string Code { get; set; }
        public string FullName { get; set; }
        public string TypeName { get; set; }
        public string DecisionNo { get; set; }
        public string EffectDate { get; set; }
        public string OrgId { get; set; }
        public string PosName { get; set; }
        public string SalaryTypeName { get; set; }
        public string SalaryLevelId { get; set; }
       // public string Coefficient { get; set; }
        public string SalaryBasic { get; set; }
        public string SalaryTotal { get; set; }
        public string SalaryPercent { get; set; }
        public string StatusName { get; set; }
        public string SignDate { get; set; }
        public string SignName { get; set; }
        public string SignPosition { get; set; }
    }

    public class ImportParam
    {
        public List<ImportDtlParam> Data { get; set; }
    }
}
