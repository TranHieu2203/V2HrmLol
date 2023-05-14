using System.Collections.Generic;

namespace CoreDAL.Models
{
    public class LoginTenantOutput
    {

        public string Id { get; set; }
        public int TenantId { get; set; }
        public string FullName { get; set; }
        public string Token { get; set; }
        public string ConnectionString { get; set; }
        public bool? IsAdmin { get; set; }
        public List<PermissionParam> PermissionParams { get; set; }

    }

 
}
