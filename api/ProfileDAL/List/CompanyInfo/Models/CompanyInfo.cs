using Common.Interfaces;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProfileDAL.Models
{
    [Table("HU_COMPANY")] // Công ty
    public class CompanyInfo : IAuditableEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public  int ID { get; set; }

        [Required]
        [MaxLength(250)]
        public string NAME_VN { get; set; }

        [MaxLength(250)]
        public string NAME_EN { get; set; }

        [Required]
        public int ORG_ID { get; set; }

        [MaxLength(500)]
        public string GPKD_ADDRESS { get; set; }
        public int REGION_ID { get; set; }
        [MaxLength(20)]
        public string PHONE_NUMBER { get; set; }

        [MaxLength(500)]
        public string WORK_ADDRESS { get; set; }
        public int? INS_UNIT { get; set; }
        public int? PROVINCE_ID { get; set; }
        public int? DISTRICT_ID { get; set; }
        public int? WARD_ID { get; set; }

        [MaxLength(200)]
        public string FILE_LOGO { get; set; }

        [MaxLength(200)]
        public string BANK_ACCOUNT { get; set; }
        public int? BANK_ID { get; set; }
        public int? BANK_BRANCH_ID { get; set; }

        [MaxLength(200)]
        public string FILE_HEADER { get; set; }

        [MaxLength(200)]
        public string PIT_CODE { get; set; }

        [MaxLength(200)]
        public string PIT_CODE_CHANGE { get; set; }
        public DateTime? PIT_CODE_DATE { get; set; }

        [MaxLength(200)]
        public string FILE_FOOTER { get; set; }
        public int? REPRESENTATIVE_ID { get; set; }
        public int? SIGN_ID { get; set; }

        [MaxLength(500)]
        public string PIT_CODE_PLACE { get; set; }

        [MaxLength(100)]
        public string GPKD_NO { get; set; }
        public DateTime? GPKD_DATE { get; set; }

        [MaxLength(200)]
        public string WEBSITE { get; set; }

        [MaxLength(20)]
        public string FAX { get; set; }

        [MaxLength(500)]
        public string NOTE { get; set; }
        public Boolean? IS_ACTIVE { get; set; }

        [MaxLength(500)]
        public string BANK_BRANCH { get; set; }



        [MaxLength(450)]
        public string CREATE_BY { get; set; }

        [MaxLength(450)]
        public string UPDATED_BY { get; set; }

        public DateTime? CREATE_DATE { get; set; }
        public DateTime? UPDATED_DATE { get; set; }

    }
}
