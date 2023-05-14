using Common.Paging;
using System;

namespace CoreDAL.ViewModels
{
    public class TenantGroupPermisstionDTO : Pagings
    {
        public int UserGroupId { get; set; }
        public string UseGroupName { get; set; }
        public int FunctionId { get; set; }
        public string FunctionName { get; set; }
        public int ModuleId { get; set; }
        public string ModuleName { get; set; }
        public string PermissionStr { get; set; }
    }

    public class TenantGroupPermisstionInputDTO
    {
        public int GroupId { get; set; }
        public int FunctionId { get; set; }
        public string PermissionString { get; set; }
    }
}
