using System;
using Common.Interfaces;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace CoreDAL.Models
{
    public class SysUser : IdentityUser, IAuditableEntity
    {
        [ForeignKey("SysGroupUser")]
        public int GROUP_ID { get; set; }
        [MaxLength(100)]
        public string FULLNAME { get; set; }
       
        [Required]
        public bool IS_ADMIN { get; set; }
        
        [MaxLength(150)]
        public string AVATAR { get; set; }
        [MaxLength(450)]
        public string CREATE_BY { get; set; }
        [MaxLength(450)]
        public string UPDATED_BY { get; set; }
        public DateTime? CREATE_DATE { get; set; }
        public DateTime? UPDATED_DATE { get; set; }
        public SysGroupUser SysGroupUser { get; set; }
    }
}
