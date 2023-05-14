using Common.Interfaces;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProfileDAL.Models
{
    [Table("PT_BLOG_INTERNAL")]//Tin tức nội bộ
    public class BlogInternal : IAuditableEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        [MaxLength(450)]
        public string TITLE { get; set; }
        [MaxLength(250)]
        public string IMG_URL { get; set; }

        [MaxLength(450)]
        public string DESCRIPTION { get; set; }
        public string CONTENT { get; set; }

        public int? THEME_ID { get; set; }

        

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
