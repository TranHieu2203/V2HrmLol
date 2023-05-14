using Common.Interfaces;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace ProfileDAL.Models
{
    [Table("OT_OTHER_LIST")]
    public class OtOtherList : IAuditableEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        [Required]
        [MaxLength(50)]
        public string CODE { get; set; }

        [Required]
        [MaxLength(100)]
        public string NAME_VN { get; set; }

        [MaxLength(1000)]
        public string NAME_EN { get; set; }

        public int? TYPE_ID { get; set; }

        public int? ORDERS { get; set; }

        public string ACTFLG { get; set; }

        public DateTime? CREATED_DATE { get; set; }

        public string CREATED_BY { get; set; }

        public string CREATED_LOG { get; set; }

        public string MODIFIED_BY { get; set; }

        public DateTime? MODIFIED_DATE { get; set; }

        public string MODIFIED_LOG { get; set; }

        [MaxLength(450)]
        public string CREATE_BY { get; set; }
        [MaxLength(450)]
        public string UPDATED_BY { get; set; }
        public DateTime? CREATE_DATE { get; set; }
        public DateTime? UPDATED_DATE { get; set; }

        public OtherListType SysOtherListType { get; set; }
    }
}
