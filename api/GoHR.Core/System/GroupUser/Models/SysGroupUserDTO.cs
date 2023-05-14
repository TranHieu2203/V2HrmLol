using Common.Paging;
using System;
namespace CoreDAL.ViewModels
{
    public class SysGroupUserDTO : Pagings
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public bool? IsActive { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
    public class SysGroupUserInputDTO
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
    }
}
