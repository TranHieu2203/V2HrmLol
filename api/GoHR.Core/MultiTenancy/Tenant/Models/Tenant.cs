using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Common.Interfaces;

namespace CoreDAL.Models
{
    [Table("TENANT")]
    public class Tenant: IAuditableEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        [Required]
        [MaxLength(50)]
        public string CODE { get; set; }
        [Required]
        [MaxLength(300)]
        public string TENANCY_NAME { get; set; }
        [Required]
        [MaxLength(150)]
        public string OWNER_NAME { get; set; }
        [MaxLength(250)]
        public string ADDRESS { get; set; }

        [MaxLength(50)]
        public string PHONE { get; set; }

        [MaxLength(150)]
        public string EMAIL { get; set; }
       

        [MaxLength(150)]
        public string LOGO { get; set; }

        [MaxLength(150)]
        public string CONNECTION_STRING { get; set; }

        public DateTime DATE_EXPIRE { get; set; }

        [MaxLength(450)]
        public string QRCODE { get; set; }       

        [MaxLength(150)]
        public string USER_REF { get; set; }
        [MaxLength(150)]
        public string CODE_EMP { get; set; }

        public int? AREA_ID { get; set; }

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
