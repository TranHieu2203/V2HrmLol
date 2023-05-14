using CoreDAL.Models;
using CoreDAL.MultiTenancy.TenantUser.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace CoreDAL.Utilities
{
    public class RefreshTokenContext: DbContext
    {
        public DbSet<TenantUser> TenantUsers { get; set; }
        public DbSet<SysRefreshToken> SysRefreshTokens { get; set; }

        private readonly IConfiguration Configuration;

        public RefreshTokenContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            string cnn = Configuration["connectionString"];
            options.UseOracle(cnn);
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            base.OnModelCreating(modelBuilder);
        

            modelBuilder.Entity<TenantUser>().ToTable("TENANT_USER");
            modelBuilder.HasDefaultSchema("TENANTDB1");

            //modelBuilder.Model.Relational().MaxIdentifierLength = 30;
        }
    }
}
