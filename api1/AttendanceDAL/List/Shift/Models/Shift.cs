using Common.Interfaces;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AttendanceDAL.Models
{
    [Table("AT_SHIFT")]// ca lam viec
    public class Shift : IAuditableEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long ID { get; set; }
        
        [Required]
        [MaxLength(50)]
        public string CODE { get; set; }
        [Required]
        [MaxLength(100)]
        public string NAME { get; set; }

        public DateTime HOURS_START { get; set; }
        public DateTime HOURS_STOP { get; set; }
        public DateTime BREAKS_FROM { get; set; }// thoi gian nghi tu
        public DateTime BREAKS_TO { get; set; }// thoi gian nghi den
        public int? TIME_LATE { get; set; }// thời gian đi muộn 
        public int? TIME_EARLY { get; set; }// thời gian về sớm
        public DateTime? SHIFT_IN { get; set; }// Giờ bắt đầu tính ca
        public DateTime? SHIFT_OUT { get; set; }// Giờ kết thúc tính ca

        [ForeignKey("TimeType")]
        public long TIME_TYPE_ID { get; set; }
        public bool? IS_NOON { get; set; }// ca đêm 
        public bool? IS_BREAK { get; set; }// có nghỉ
        [MaxLength(1000)]
        public string NOTE { get; set; }
        [MaxLength(1000)]
        public bool IS_ACTIVE { get; set; }
        public decimal? COEFFICIENT { get; set; } // hệ số
        public decimal? TIME_STANDARD { get; set; }
        [MaxLength(20)]
        public string TIME_START { get; set; }
        [MaxLength(20)]
        public string TIME_STOP { get; set; }
        [MaxLength(20)]
        public string TIME_BREAKS_FROM { get; set; }
        [MaxLength(20)]
        public string TIME_BREAKS_TO { get; set; }

        //lich trinh lam viec
        public long? MON_ID { get; set; }
        public long? TUE_ID { get; set; }
        public long? WED_ID { get; set; }
        public long? THU_ID { get; set; }
        public long? FRI_ID { get; set; }
        public long? SAT_ID { get; set; }
        public long? SUN_ID { get; set; }
        public int? ORDERS { get; set; }
        [MaxLength(450)]
        public string CREATE_BY { get; set; }
        [MaxLength(450)]
        public string UPDATED_BY { get; set; }
        public DateTime? CREATE_DATE { get; set; }
        public DateTime? UPDATED_DATE { get; set; }
        public TimeType TimeType { get; set; }
    }
}
