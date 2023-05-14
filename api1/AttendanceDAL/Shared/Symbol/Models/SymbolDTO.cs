using Common.Paging;
using System;
using System.ComponentModel.DataAnnotations;

namespace AttendanceDAL.ViewModels
{
    public class SymbolDTO : Pagings
    {
        public long ID { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }      
        public Boolean? IsActive { get; set; }
        public Boolean? IsOff { get; set; }
        public string Note { get; set; }
        public string CreateBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
    public class SymbolInputDTO
    {
        public long ID { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public string Code { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public string Name { get; set; }
        public string Note { get; set; }
        public Boolean? IsOff { get; set; }
    }
}
