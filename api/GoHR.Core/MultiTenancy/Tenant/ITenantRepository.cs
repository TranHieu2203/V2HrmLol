using Common.Interfaces;
using CoreDAL.Models;
using System.Threading.Tasks;
using Common.Paging;
using Common.Extensions;
using System.Collections.Generic;
using CoreDAL.ViewModels;
using CoreDAL.MultiTenancy.TenantUser.Models;

namespace CoreDAL.Repositories
{
    public interface ITenantRepository : IRepository<Tenant>
    {
        Task<PagedResult<TenantDTO>> GetAll(TenantDTO param);
        Task<PagedResult<SysFunctionDTO>> GetAllFunction(SysFunctionDTO param, int application);
        Task<ResultWithError> UpdateAsync(TenantDTO param);
        Task<ResultWithError> ChangeStatusAsync(List<int> ids);
        Task<PagedResult<TenantUserDTO>> GetAllUser(TenantUserDTO param);
        Task<ResultWithError> CheckCode(string code);
        Task<ResultWithError> TenantLogin(string UserName, string password);
        Task<ResultWithError> ClientsLogin(string UserName, string password, string ipAddress, bool alreadtHased = false, SysRefreshToken newRefreshToken = null);
        Task<ResultWithError> SignInPortalHR(string UserName, string password, string application, string fcmToken, string deviceId);
        Task<ResultWithError> ChangePasswordAsync(ChangePasswordTenantParam param);

        Task<ResultWithError> GetById(int id);
        Task<ResultWithError> GetUser(string id);
        /// <summary>
        /// GetQRCode
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<ResultWithError> GetQRCode();
        /// <summary>
        /// Check QRCode Tenant (User scan QRCode of Tenant)
        /// </summary>
        /// <param name="qrCode"></param>
        /// <returns></returns>
        Task<ResultWithError> ScanQRCode(string qrCode);
        /// <summary>
        /// Create table when tenant first login 
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
     
        Task<ResultWithError> GetListTenent();
        Task<ResultWithError> ClearEquitment(string userId);

    }
}
