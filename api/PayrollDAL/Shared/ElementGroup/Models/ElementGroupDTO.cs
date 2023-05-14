﻿using Common.Paging;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace PayrollDAL.ViewModels
{
    public class ElementGroupDTO : Pagings
    {
        public long Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public int? Orders { get; set; }
        public bool? IsActive { get; set; }
        public string CreateBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }

    public class ElementGroupInputDTO
    {
        public int? Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public int? Orders { get; set; }
    }
}
