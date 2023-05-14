using Common.Paging;
using System;
namespace ProfileDAL.ViewModels
{
    public class BookingDTO : Pagings
    {
        public int Id { get; set; }
        public int EmpId { get; set; }
        public string EmpCode { get; set; }
        public string EmpName { get; set; }
        public int RoomId { get; set; }
        public string RoomName { get; set; }
        public string OrgName { get; set; }
        public DateTime BookingDay { get; set; }
        public DateTime HourFrom { get; set; }
        public DateTime HourTo { get; set; }
        public string Note { get; set; }
        public int? StatusId { get; set; }
        public string StatusName { get; set; }
        public string ApproveName { get; set; }
        public string ApproveNote { get; set; }
        public DateTime? ApproveDate { get; set; }
        public DateTime? CreateDate { get; set; }
    }

    public class BookingInputDTO
    {
        public int? Id { get; set; }
        public int RoomId { get; set; }
        public DateTime BookingDay { get; set; }
        public DateTime HourFrom { get; set; }
        public DateTime HourTo { get; set; }
        public string Note { get; set; }
    }
    
}
