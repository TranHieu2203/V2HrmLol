using Common.Paging;
using System;

namespace CoreDAL.ViewModels
{
    public class SysFunctionDTO : Pagings
    {
        public int Id { get; set; }
        public int? GroupId { get; set; }
        public int ModuleId { get; set; }

        public string GroupName { get; set; }
        public string ModuleName { get; set; }

        public int AppId { get; set; }
        public string AppName { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string States { get; set; }
        public Boolean? IsActive { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }

    public class SysFunctionInputDTO
    {
        public int Id { get; set; }
        public int GroupId { get; set; }
        public int ModuleId { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string States { get; set; }
    }
}
