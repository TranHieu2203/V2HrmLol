using Common.Paging;
namespace CoreDAL.ViewModels
{
    public class TenantUserPermissionDTO : Pagings
    {
        public string UserId { get; set; }
        public string UseName { get; set; }
        public int FunctionId { get; set; }
        public string FunctionName { get; set; }
        public int ModuleId { get; set; }
        public string ModuleName { get; set; }
        public string PermissionStr { get; set; }
    }

    public class TenantUserPermissionInputDTO
    {
        public string UserId { get; set; }
        public int FunctionId { get; set; }
        public string PermissionString { get; set; }
    }
}
