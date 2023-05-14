using System;
using System.ComponentModel.DataAnnotations;

namespace CoreDAL.Models
{
    public class TenantInputDTO
    {
        public int? Id { get; set; }
        [Required(ErrorMessage ="{0}_Required")]
        public string Code { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public string TenancyName { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public string OwnerName { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public string Address { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public string Phone { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public string Email { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public string ConnectionString { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public int? PackageId { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public string UserName { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public string Password { get; set; }
        public string RePassword { get; set;}
        public int AreaId { get; set; }
        public string CodeEmp { get; set; }

    }
    public class ChangePasswordTenantParam
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string CurrentPassword { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string NewPassword { get; set; }
    }
}
