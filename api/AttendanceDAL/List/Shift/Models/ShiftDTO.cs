using Common.Paging;
using System;
using System.ComponentModel.DataAnnotations;

namespace AttendanceDAL.ViewModels
{
    public class ShiftDTO : Pagings
    {
        public long Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public DateTime? HoursStart { get; set; }
        public DateTime? HoursStop { get; set; }
        public DateTime? BreaksFrom { get; set; }
        public DateTime? BreaksTo { get; set; }
        public int? TimeLate { get; set; }
        public int? TimeEarly { get; set; }
        public long TimeTypeId { get; set; }
        public string TimeTypeName { get; set; }
        public bool? IsNoon { get; set; }
        public bool? IsBreak { get; set; }
        public int? Orders { get; set; }
        public string Note { get; set; }
        public bool? IsActive { get; set; }
        public decimal? Coefficient { get; set; }

    }
    public class ShiftInputDTO
    {
        public long Id { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public string Code { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public string Name { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public DateTime HoursStart { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public DateTime HoursStop { get; set; }
       // [Required(ErrorMessage = "{0}_Required")]
        public DateTime? BreaksFrom { get; set; }
       // [Required(ErrorMessage = "{0}_Required")]
        public DateTime? BreaksTo { get; set; }
        public int? TimeLate { get; set; }
        public int? TimeEarly { get; set; }

        public DateTime? ShiftIn { get; set; }
        public DateTime? ShiftOut { get; set; }

        [Required(ErrorMessage = "{0}_Required")]
        public long TimeTypeId { get; set; }
        public string TimeTypeName { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public bool? IsNoon { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public bool? IsBreak { get; set; }
        public string Note { get; set; }
        //public bool? IsActive { get; set; }
        public decimal? Coefficient { get; set; }
        public decimal? TimeStandard { get; set; }
        public int? Orders { get; set; }


        public long? MonId { get; set; }
        public long? TueId { get; set; }
        public long? WedId { get; set; }
        public long? ThuId { get; set; }
        public long? FriId { get; set; }
        public long? SatId { get; set; }
        public long? SunId { get; set; }
    }
    public class ShiftCycleInput
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public long? MonId { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public long? TueId { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public long? WedId { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public long? ThuId { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public long? FriId { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public long? SatId { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public long? SunId { get; set; }
    }
}
