using Common.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace ProfileDAL.Models
{
    [Table("HU_JOB_FUNCTION")]
    public class HUJobFunction
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        
        [Required]
        [MaxLength(255)]
        public string NAME { get; set; }

        [MaxLength(255)]
        public string NAME_EN { get; set; }

        public DateTime? CREATED_DATE { get; set; }

        public string CREATED_BY { get; set; }

        public string CREATED_LOG { get; set; }

        public string MODIFIED_BY { get; set; }

        public DateTime? MODIFIED_DATE { get; set; }

        public string MODIFIED_LOG { get; set; }

        public int? PARENT_ID { get; set; }
        public int JOB_ID { get; set; }

        public int? FUNCTION_ID { get; set; }
    }
}
