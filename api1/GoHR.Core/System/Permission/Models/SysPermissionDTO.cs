using Common.Paging;

namespace CoreDAL.ViewModels
{
    public class SysPermissionDTO : Pagings
    {
        public int? Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public int Orders { get; set; }
        public bool? IsActive { get; set; }
    }
    public class SysPermissionInputDTO
    {
        public int? Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public int Orders { get; set; }
    }
}
