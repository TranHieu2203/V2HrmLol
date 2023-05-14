using Common.Interfaces;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProfileDAL.Models
{
    [Table("HU_POS_PAPER")]// Chức danh
    public class PostionPapers : IAuditableEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        [ForeignKey("position")]
        public int POS_ID { get; set; }
        [ForeignKey("paper")]
        public int PAPER_ID { get; set; }
        
        [DefaultValue("1")]
        public string CREATE_BY { get; set; }
        [MaxLength(450)]
        public string UPDATED_BY { get; set; }
        public DateTime? CREATE_DATE { get; set; }
        public DateTime? UPDATED_DATE { get; set; }
        public OtherList paper { get; set; }
        public Position position { get; set; }
    }
}
