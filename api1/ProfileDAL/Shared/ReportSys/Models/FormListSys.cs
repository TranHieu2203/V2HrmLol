using Common.Interfaces;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection.Metadata;

namespace ProfileDAL.Models
{
    [Table("SYS_FORM_LIST")]
    public class FormListSys : IAuditableEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long ID { get; set; }
        public string NAME { get; set; }
        public int? ID_MAP { get; set; }
        public int? PARENT_ID { get; set; }
        public int? TYPE_ID { get; set; }
        public int? ID_ORIGIN { get; set; }
        public  string TEXT { get; set; }
        [MaxLength(450)]
        public string CREATE_BY { get; set; }
        [MaxLength(450)]
        public string UPDATED_BY { get; set; }
        public DateTime? CREATE_DATE { get; set; }
        public DateTime? UPDATED_DATE { get; set; }

    };
}
