using Common.Paging;
using System;
namespace ProfileDAL.ViewModels
{
    public class GroupPositionDTO : Pagings
    {
        public  int Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public Boolean? IsActive { get; set; }
        public string Note { get; set; }
        public string CreateBy { get; set; }
        public string UpdateBy { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }
    }

    public class GroupPositionInputDTO
    {
        public  int? Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string Note { get; set; }
    }
}
