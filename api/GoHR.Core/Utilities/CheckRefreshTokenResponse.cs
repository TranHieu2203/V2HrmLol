using CoreDAL.MultiTenancy.TenantUser.Models;

namespace CoreDAL.Utilities
{
    public class CheckRefreshTokenResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public SysRefreshToken NewRefreshToken { get; set; }
    }
}
