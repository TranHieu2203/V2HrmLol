﻿using Common.Interfaces;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProfileDAL.Models
{
    [Table("SYS_SETTING_MAP")]// Chức danh
    public class SettingMap : IAuditableEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        [MaxLength(250)]
        public string NAME { get; set; }
        [MaxLength(1500)]
        public string ADDRESS { get; set; }
        public decimal? RADIUS { get; set; }
        public string LAT { get; set; }
        public string LNG { get; set; }
        public int? ZOOM { get; set; }
        public string CENTER { get; set; }
        public int? ORG_ID { get; set; }
        [MaxLength(150)]
        public string IP { get; set; }
        [MaxLength(150)]
        public string BSSID { get; set; }
        [MaxLength(450)]
        public string QRCODE { get; set; }
        
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
