using Common.Paging;
using System;
using System.ComponentModel.DataAnnotations;

namespace AttendanceDAL.ViewModels
{
    public class HolidayDTO : Pagings
    {
        public long Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public DateTime? StartDayoff { get; set; }
        public DateTime? EndDayoff { get; set; }
        public string Note { get; set; }
        public bool? IsActive { get; set; }
        public string CreateBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
    public class HolidayInputDTO
    {
        public long Id { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public string Code { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public string Name { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public DateTime? StartDayoff { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public DateTime? EndDayoff { get; set; }
        public string Note { get; set; }
        public bool? IsActive { get; set; }
        public string CreateBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
}
