using Common.Paging;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ProfileDAL.ViewModels
{
    public class UserOrganiViewDTO 
    {
        public long Id { get; set; }
        public string UserId { get; set; }
        public int OrgId { get; set; }

    }

    public class UserOrganiInputDTO
    {
        public long Id { get; set; }
        public string UserId { get; set; }
        public int OrgId { get; set; }
    }
    public class UserOrganiDTO
    {
        public int GroupId { get; set; }
        public string UserId { get; set; }
        public List<int> OrgIds { get; set; }
    }
}
