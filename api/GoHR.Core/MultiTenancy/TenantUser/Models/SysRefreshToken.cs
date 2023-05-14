using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CoreDAL.MultiTenancy.TenantUser.Models
{
    [Table("SYS_REFRESH_TOKEN", Schema = "TENANTDB1")]

    public class SysRefreshToken
    {
        [Key]
        [MaxLength(450)]
        public Int64 ID { get; set; }
        public string USER { get; set; }
        public string TOKEN { get; set; }
        public DateTime EXPIRES { get; set; }
        public DateTime CREATED { get; set; }
        public string CREATED_BY_IP { get; set; }
        public DateTime? REVOKED { get; set; }
        public string REVOKED_BY_IP { get; set; }
        public string REPLACED_BY_TOKEN { get; set; }
        public string REASON_REVOKED { get; set; }
        [NotMapped]
        public bool IS_EXPIRED => DateTime.UtcNow >= EXPIRES;
        [NotMapped]
        public bool IS_REVOKED => REVOKED != null;
        [NotMapped]
        public bool IS_ACTIVE => !IS_REVOKED && !IS_EXPIRED;


    }
}
