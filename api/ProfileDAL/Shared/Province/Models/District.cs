﻿using Common.Interfaces;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProfileDAL.Models
{
    [Table("HU_DISTRICT")]
    public class District : IAuditableEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        [Required]
        [MaxLength(50)]
        public string CODE { get; set; }

        [Required]
        [MaxLength(100)]
        public string NAME { get; set; }
        public Boolean? IS_ACTIVE { get; set; }
        [MaxLength(1500)]
        public string NOTE { get; set; }

        [ForeignKey("province")]
        public int PROVINCE_ID { get; set; }

        [MaxLength(450)]
        public string CREATE_BY { get; set; }
        [MaxLength(450)]
        public string UPDATED_BY { get; set; }
        public DateTime? CREATE_DATE { get; set; }
        public DateTime? UPDATED_DATE { get; set; }

        public Province province { get; set; }
    }
}
