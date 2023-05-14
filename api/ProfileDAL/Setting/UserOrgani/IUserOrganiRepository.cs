using ProfileDAL.ViewModels;
using ProfileDAL.Models;
using Common.Interfaces;
using Common.Paging;
using Common.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace ProfileDAL.Repositories
{
    public interface IUserOrganiRepository : IRepository<UserOrgani>
    {
        Task<ResultWithError> UpdateAsync(UserOrganiDTO param);
        Task<ResultWithError> UpdateGroupAsync(UserOrganiDTO param);
        Task<ResultWithError> GetUserOrg(string OrgSelectedId);
        /// <summary>
        /// Get list orgId cua current user theo phong ban duoc phan quyen dung cho treeview va screen phan duyen
        /// </summary>
        /// <returns></returns>
        Task<ResultWithError> GetOrgPermission();
        Task<ResultWithError> GetOrgPermission(string UserId, int tenantId, bool isAdmin);
        /// <summary>
        /// get list<int> permission cua user
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        Task<ResultWithError> ListUserPermission(string Id);
        Task<ResultWithError> ListGroupPermission(int Id);
        Task GrantGroupOrgPermissionTouser(int GroupId, string UserId);
    }
}
