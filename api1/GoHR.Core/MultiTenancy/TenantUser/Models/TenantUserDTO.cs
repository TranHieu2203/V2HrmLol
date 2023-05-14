using Common.Paging;
using System.Collections.Generic;

namespace CoreDAL.Models
{
    public class TenantUserDTO : Pagings
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string FullName { get; set; }
        public bool? Lock { get; set; }
        public int? GroupId { get; set; }
    }
    public class TenantUserInputDTO
    {
        public string Id { get; set; }
        public int GroupId { get; set; }
        public int EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public string EmployeeCode { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string FullName { get; set; }
        public bool Lock { get; set; }
        public bool? IsPortal { get; set; }
        public bool? IsWebapp { get; set; }
    }
    public class TenantUserResponDTO
    {
        public string Id { get; set; }
        public string Password { get; set; }
        public string UserName { get; set; }
        public string Code { get; set; }
        public string GroupName { get; set; }
        public string Email { get; set; }
        public string FullName { get; set; }
        public bool Lock { get; set; }
        public int? GroupId { get; set; }
        public bool? IsPortal { get; set; }
        public bool? IsWebApp { get; set; }
    }

    public class TenantUserImport
    {
        public string EmpCode { get; set; }
        public string FullName { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string GroupName { get; set; }
        public string IsWebapp { get; set; }
        public string IsPortal { get; set; }
    }

    public class EquitmentParam
    {
        public string Code { get; set; }
        public string UserName { get; set; }
    }

    public class ImportUserParam
    {
        public List<TenantUserImport> Data { get; set; }
    }
}
