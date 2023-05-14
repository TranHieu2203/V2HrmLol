using Common.Interfaces;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProfileDAL.Models
{
    [Table("HU_REPORT")]
    public class Report
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        [Required]
        [MaxLength(100)]
        public string NAME { get; set; }
        public string CODE { get; set; }
        [ForeignKey("Parent")]
        public int? PARENT_ID { get; set; }
        [MaxLength(1500)]
        public string NOTE { get; set; }
        public Report Parent { get; set; }
        public List<Report> Childs { get; set; }
    }
}
