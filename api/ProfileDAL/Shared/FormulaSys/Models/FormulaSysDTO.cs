using Common.Paging;
using System.ComponentModel.DataAnnotations;

namespace ProfileDAL.ViewModels
{
    public class FormulaSysDTO : Pagings
    {
        public long Id { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public int SalaryTypeId { get; set; }
        public string ColName { get; set; }
        public string Name { get; set; }
        public string Formula { get; set; }
        public string FormulaName { get; set; }
        public int? Orders { get; set; }
        public int? AreaId { get; set; }
    }

    public class FormulaSysInputDTO
    {

        [Required(ErrorMessage = "{0}_Required")]
        public string FormulaName { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public string ColName { get; set; }

        [Required(ErrorMessage = "{0}_Required")]
        public int SalaryTypeId { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public int AreaId { get; set; }

    }
    public class PayrollSysSumDTO : Pagings
    {
        public int IS_QUIT { get; set; }
        public string EMPLOYEE_NAME { get; set; }
        public string EMPLOYEE_CODE { get; set; }
        public string POSITION_NAME { get; set; }
        public string ORG_NAME { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public decimal OrgId { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public decimal? PeriodId { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public decimal? SalaryTypeId { get; set; }

    }
    public class PayrollSysInputDTO
    {
        [Required(ErrorMessage = "{0}_Required")]
        public decimal OrgId { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public decimal PeriodId { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public decimal SalaryTypeId { get; set; }

    }

    public class PayrollSysInputMobile
    {
       
        [Required(ErrorMessage = "{0}_Required")]
        public decimal PeriodId { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public decimal SalaryTypeId { get; set; }

    }
}
