using Common.Paging;
using System;
using System.Collections.Generic;
using System.Text;

namespace ProfileDAL.ViewModels
{
    public class PositionSysViewDTO : Pagings
    {
        public int Id { get; set; }
        public int? GroupId { get; set; }
        public int? AreaId { get; set; }
        public string GroupName { get; set; }
        public string AreaName { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public Boolean? IsActive { get; set; }
        public string JobDesc { get; set; }
        public string Note { get; set; }
        public string CreateBy { get; set; }
        public string UpdateBy { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }
    }
    public class PositionSysOutputDTO
    {
        public int Id { get; set; }
        public int GroupId { get; set; }
        public int AreaId { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public Boolean? IsActive { get; set; }
        public string Note { get; set; }
        public string CreateBy { get; set; }
        public string UpdateBy { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }

    }

    public class PositionSysInputDTO
    {
        public int? Id { get; set; }
        public int? GroupId { get; set; }
        public int? AreaId { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string Note { get; set; }
        public string JobDesc { get; set; }
    }

}
