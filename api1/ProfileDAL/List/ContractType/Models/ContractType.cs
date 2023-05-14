using Common.Interfaces;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProfileDAL.Models
{
    [Table("HU_CONTRACT_TYPE")]
    public class ContractType : IAuditableEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        [Required]
        [MaxLength(50)]
        public string CODE { get; set; }

        [Required]
        [MaxLength(100)]
        public string NAME { get; set; }

        public int? PERIOD { get; set; } // thời hạn hợp đồng
        public int? DAY_NOTICE { get; set; } // số ngày báo trước

        [MaxLength(1500)]
        public string NOTE { get; set; }
        [DefaultValue("1")]
        public bool? IS_LEAVE { get; set; } // có tính phép

        public int? TYPE_ID { get; set; } // 1: Thử việc; 2: chính thức; 3: khác

        
        [DefaultValue("1")]
        public Boolean? IS_ACTIVE { get; set; }
        [MaxLength(450)]
        public string CREATE_BY { get; set; }
        [MaxLength(450)]
        public string UPDATED_BY { get; set; }
        public DateTime? CREATE_DATE { get; set; }
        public DateTime? UPDATED_DATE { get; set; }
    }
}
