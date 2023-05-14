using System.Threading.Tasks;

namespace CoreDAL.Repositories
{
    public interface IUnitOfWork
    {
        Task<int> SaveChangesAsync();
        ISysGroupUserRepository SysGroupUsers { get; }
        ISysGroupFunctionRepository SysGroupFunctions { get; }
        ISysFunctionRepository SysFunctions { get; }
        ISysPermissionRepository SysPermissions { get; }
        ISysGroupPermissionRepository SysGroupPermissions { get; }
        ISysUserRepository SysUsers { get; }
        ISysUserPermissionRepository SysUserPermissions { get; }
        ISysOtherListRepository SysOtherLists { get; }
        // Package Seller
        ISysModuleRepository SysModules { get; }
        // Tenant
        ITenantRepository Tenants { get; }
        ITenantGroupRepository TenantGroups { get; }
        ITenantGroupPermissionRepository TenantGroupPermissions { get; }
  
        ITenantUserPermissionRepository TenantUserPermission { get; }
        ITenantUserRepository TenantUserRepository { get; }
        IApproveProcessRepository ApproveProcess { get; }
        IApproveTemplateRepository ApproveTemplates { get; }
    }
}
