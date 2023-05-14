using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Middleware
{
    public class JWTTokenModel
    {
        public string sid { get; set; }
        public string typ { get; set; }
        public string iat { get; set; }
        public string IsAdmin { get; set; }
        public DateTime exp { get; set; }

    }
}
