﻿using Common.Interfaces;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection.Metadata;

namespace ProfileDAL.Models
{
    [Table("HU_FORM_LIST")]
    public class FormList : IAuditableEntity
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

    [Table("HU_FORM_ELEMENT")]
    public class FormElement
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long ID { get; set; }
        public string NAME { get; set; }
        public string CODE { get; set; }
        public int? TYPE_ID { get; set; }

    };
    /// <summary>
    /// Thiết lập lời nhắc
    /// </summary>
    [Table("HU_SETTING_REMIND")]
    public class SettingRemind : IAuditableEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        
        public string NAME { get; set; }
        public string CODE { get; set; }
        public int? DAY { get; set; }
        public bool? IS_ACTIVE { get; set; }

        [MaxLength(450)]
        public string CREATE_BY { get; set; }
        [MaxLength(450)]
        public string UPDATED_BY { get; set; }
        public DateTime? CREATE_DATE { get; set; }
        public DateTime? UPDATED_DATE { get; set; }

    };
}
