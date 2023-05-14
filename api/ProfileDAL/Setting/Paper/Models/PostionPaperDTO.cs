using Common.Paging;
using System;
using System.Collections.Generic;

namespace ProfileDAL.ViewModels
{
    public class PostionPaperDTO : Pagings
    {
        public int Id { get; set; }
        public string PaperName { get; set; }
        public int PaperId { get; set; }
        public int PosId { get; set; }
        public string CreateBy { get; set; }
        public DateTime? CreateDate { get; set; }
    }


    public class PosPaperInputDTO
    {
        public int PosId { get; set; }
        public List<int> PaperId { get; set; }
    }

}
