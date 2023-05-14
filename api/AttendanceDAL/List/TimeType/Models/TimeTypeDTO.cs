using Common.Paging;
using System;
using System.ComponentModel.DataAnnotations;

namespace AttendanceDAL.ViewModels
{
    public class TimeTypeDTO : Pagings
    {
        public long ID { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public long? MorningId { get; set; }
        public string MorningName { get; set; }
        public long? AfternoonId { get; set; }

        public string AfternoonName { get; set; }
        public bool? IsOff { get; set; }
        public Boolean? IsActive { get; set; }
        public string Note { get; set; }
        public string CreateBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
    public class TimeTypeInputDTO
    {
        public long ID { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public string Code { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public string Name { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public bool? IsOff { get; set; }
        public bool? IsFullday { get; set; }
        public string Note { get; set; }
        public long MorningId { get; set; }
        public long AfternoonId { get; set; }
    }

    public class TimeTypeView
    {
        public decimal Id { get; set; }
        public string Name { get; set; }
        public string Morning { get; set; }
        public string Afternoon { get; set; }
    }
}
