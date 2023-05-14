using Common.Paging;
using System;
using System.Collections.Generic;
using System.Text;

namespace ProfileDAL.ViewModels
{
    public class BankBranchDTO : Pagings
    {
        public int Id { get; set; }
        public int? BankId { get; set; }
        public string BankName { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public Boolean? IsActive { get; set; }
        public string Note { get; set; }
        public string CreateBy { get; set; }
        public string UpdateBy { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }
    }
    public class BankBranchInputDTO
    {
        public int Id { get; set; }
        public int BankId { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string Note { get; set; }

    }
}
