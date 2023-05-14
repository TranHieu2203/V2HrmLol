using Common.Interfaces;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AttendanceDAL.Models
{
    [Table("AT_ENTITLEMENT_EDIT")]
    public class EntitlementEdit : IAuditableEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        
        [ForeignKey("employee")]
        public long? EMPLOYEE_ID { get; set; }
        public int YEAR { get; set; }
        public int MONTH { get; set; }
        public decimal NUMBER_CHANGE { get; set; }
        public string NOTE { get; set; } // Ghi chú 
        [MaxLength(50)]
        public string CODE { get; set; }
        [MaxLength(150)]
        public string CODE_REF { get; set; }
        [MaxLength(450)]
        public string CREATE_BY { get; set; }
        [MaxLength(450)]
        public string UPDATED_BY { get; set; }
        public DateTime? CREATE_DATE { get; set; }
        public DateTime? UPDATED_DATE { get; set; }
    }
}
