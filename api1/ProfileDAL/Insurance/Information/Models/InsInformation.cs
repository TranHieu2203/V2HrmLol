using Common.Interfaces;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProfileDAL.Models
{
    [Table("INS_INFORMATION")]
    public class InsInformation : IAuditableEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long ID { get; set; }
        
        public int EMPLOYEE_ID { get; set; }
        [MaxLength(50)]
        public string BHXH_NO { get; set; } // Số sổ BH
        public DateTime? BHXH_DATE { get; set; }// ngày CẤP
        [MaxLength(150)]
        public string BHXH_PLACE { get; set; }
        public int? BHXH_STATUS_ID { get; set; }
        [MaxLength(550)]
        public string BHXH_NOTE { get; set; } // Ghi chú
        [MaxLength(50)]
        public string BHYT_NO { get; set; } // Số Thẻ BHYT
        public DateTime? BHYT_EFFECT_DATE { get; set; }// ngày bắt đầu
        public DateTime? BHYT_EXPIRE_DATE { get; set; }// ngày kết thúc
        public int? PLACE_REGIS_ID { get; set; }// Nơi đăng ký khám CB ban đầu
        [MaxLength(450)]
        public string CREATE_BY { get; set; }
        [MaxLength(450)]
        public string UPDATED_BY { get; set; }
        public DateTime? CREATE_DATE { get; set; }
        public DateTime? UPDATED_DATE { get; set; }
    }
}
