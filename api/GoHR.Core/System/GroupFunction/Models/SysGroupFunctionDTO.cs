using Common.Paging;
using System;
namespace CoreDAL.ViewModels
{
    public class SysGroupFunctionDTO: Pagings
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public int ApplicationId { get; set; }
        public string AppName { get; set; }
        public Boolean? IsActive { get; set; }
        public string CreateBy { get; set; }
        public string UpdateBy { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }
    }

    public class SysGroupFunctionInputDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public int ApplicationId { get; set; }
    }
}
