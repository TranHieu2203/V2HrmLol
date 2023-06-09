﻿using Common.Paging;
using System;

namespace CoreDAL.Models
{
    public class TenantDTO: Pagings
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string TenancyName { get; set; }
        public string FullName { get; set; }
        public string Address { get; set; }
        public string AreaName { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Logo { get; set; }
        public string ConnectionString { get; set; }
        public string UserRef { get; set; }
        public string UserRefName { get; set; }
        public string UserName { get; set; } 
        public Boolean? IsActive { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }

}
