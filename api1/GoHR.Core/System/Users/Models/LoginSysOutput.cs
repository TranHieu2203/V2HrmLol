using CoreDAL.MultiTenancy.TenantUser.Models;
using System.Collections.Generic;

namespace CoreDAL.Models
{
    public class AuthResponse: LoginOutput
    {
        public SysRefreshToken RefreshToken { get; set; }
        public bool? IsFirstLogin { get; set; }
        public int? EmpId { get; set; }
        public decimal TenantId { get; set; }
    }
    public class LoginParam
    {
        public SysRefreshToken RefreshToken { get; set; }

        public string Id { get; set; }
        public decimal TenantId { get; set; }
        public string UserName { get; set; }
        public string FullName { get; set; }
        public string Avatar { get; set; }
        public int EmpId { get; set; }
        public bool IsFirstLogin { get; set; }

        public string Token { get; set; }
        public bool? IsAdmin { get; set; }       
        public List<PermissionParam> PermissionParams { get; set; }

    }

    public class LoginOutput
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string FullName { get; set; }
        public string Avatar { get; set; }
        public string Token { get; set; }
        public bool? IsAdmin { get; set; }
        public dynamic OrgIds { get; set; }
        public List<PermissionParam> PermissionParams { get; set; }
    }

    public class PermissionParam
    {
        public string ModuleCode { get; set; }
        public string GroupFuncCode { get; set; }
        public string FunctionCode { get; set; }
        public string PermissionString { get; set; }
        public string Url { get; set; }
    }
    public class OrgTreeView
    {
        public int? Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public int? pid { get; set; }
        public string pName { get; set; }
        public string orgManager { get; set; }
        public bool hasChild { get; set; }
    }
}
