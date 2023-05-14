using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProfileDAL.Models
{
    [Table("HU_COMMEND_EMP")]
    public class CommendEmp
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long ID { get; set; }
        public long TENANT_ID { get; set; }
        [ForeignKey("Employee")]
        public long EMPLOYEE_ID { get; set; }
        [ForeignKey("Commend")]
        public long COMMEND_ID { get; set; }
        [ForeignKey("Position")]
        public int? POS_ID { get; set; }
        [ForeignKey("Organization")]
        public int? ORG_ID { get; set; }
        public Employee Employee { get; set; }
        public Commend Commend { get; set; }
        public Organization Organization { get; set; }
        public Position Position { get; set; }
    }
}
