using Common.Extensions;
using Common.Paging;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ProfileDAL.ViewModels
{
    public class FormListSysDTO
    {


        public string Name { get; set; }
        public int? IdMap { get; set; }
        public int? ParentId { get; set; }
        public int? TypeId { get; set; }
        public int? IdOrigin { get; set; }
        public int? HasChild { get; set; }
        public string Text { get; set; }

    }
 
}
