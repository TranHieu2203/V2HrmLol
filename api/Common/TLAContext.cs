using Common.Extensions;
using Common.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.IdentityModel.JsonWebTokens;
using System.Linq;
using System.Reflection;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Common.Middleware;
namespace Common
{
    public class TLAContext : IdentityDbContext
    {
        public int EmpId { get; set; }
        public bool IsAdmin { get; set; }
        public string UserName { get; set; }
        public string CurrentUserId { get; set; }
        public static bool isMigration;

        public readonly IConfiguration _config;
        public TLAContext(IConfiguration config, DbContextOptions options, IHttpContextAccessor accessor) : base(options)
        {
            _config = config ?? throw new ArgumentNullException(nameof(config));
            isMigration = false;
            try
            {
                if (accessor.HttpContext!=null)
                {
                    var authorization = accessor.HttpContext.Request.Headers.ContainsKey("Authorization");
                    if (authorization)
                    {
                        var token = accessor.HttpContext.Request.Headers["Authorization"][0].Substring("Bearer ".Length);

                        var tokenInfo = JWTHelper.GetTokenInfo(token);
                        CurrentUserId = tokenInfo.sid;
                        UserName = tokenInfo.typ;
                        IsAdmin = bool.Parse(tokenInfo.IsAdmin);
                        bool res = int.TryParse(tokenInfo.iat, out int a);
                        if (res)
                        {
                            EmpId = a;
                        }

                    }

                }

                //CurrentUserId = accessor.HttpContext?.User.FindFirst(JwtRegisteredClaimNames.Sid)?.Value?.Trim();
                //UserName = accessor.HttpContext?.User.FindFirst(JwtRegisteredClaimNames.Typ)?.Value?.Trim();
                //bool res = int.TryParse(accessor.HttpContext?.User.FindFirst(JwtRegisteredClaimNames.Iat)?.Value?.Trim(), out int a);
                //if (res)
                //{
                //    EmpId = a;
                //}
                // var i = accessor.HttpContext?.User.FindFirst("IsAdmin")?.Value;
                //if (!String.IsNullOrWhiteSpace(i))
                //{
                //    IsAdmin = bool.Parse(i);
                //}
            }
            catch
            {

            }
        }
        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{

        //    optionsBuilder.UseSqlServer(_config["connectionString"], options =>
        //    {
        //        options.MigrationsHistoryTable("CoresMigrationsHistory");//connTenant1 connectionString
        //    });
        //}

        public void UpdateAuditEntities()
        {
            var modifiedEntries = ChangeTracker.Entries()
                .Where(x => x.Entity is IAuditableEntity && (x.State == EntityState.Added || x.State == EntityState.Modified));


            foreach (var entry in modifiedEntries)
            {
                var entity = (IAuditableEntity)entry.Entity;
                DateTime now = DateTime.UtcNow;

                if (entry.State == EntityState.Added)
                {
                    entity.CREATE_DATE = now;
                    entity.CREATE_BY = CurrentUserId;
                }
                else
                {
                    entity.UPDATED_DATE = now;
                    entity.UPDATED_BY = CurrentUserId;
                }
            }
        }

       

        public List<AuditLog> GetAuditForChange()
        {
            List<AuditLog> result = new List<AuditLog>();
            foreach (var ent in this.ChangeTracker.Entries().Where(p => p.State == EntityState.Added || p.State == EntityState.Deleted || p.State == EntityState.Modified))
            {
                DateTime changeTime = DateTime.UtcNow;

                // Lấy thuộc tính Bảng
                TableAttribute tableAttr = ent.Entity.GetType().GetCustomAttributes(typeof(TableAttribute), false).SingleOrDefault() as TableAttribute;

                // Lấy tên bảng
                string tableName = tableAttr != null ? tableAttr.Name : ent.Entity.GetType().Name;
                if (tableName == "SY_AUDITLOG")
                {
                    return result;
                }
                //giá trị khóa chính
                string keyName = ent.Entity.GetType().GetProperties().Single(p => p.GetCustomAttributes(typeof(KeyAttribute), false).Count() > 0).Name;

                if (ent.State == EntityState.Added)
                {
                    // thêm mới dữ liệu
                    result.Add(new AuditLog()
                    {
                        USER_ID = UserName,
                        EVENT_DATE = changeTime,
                        EVENT_TYPE = "A", // sự kiện thêm mới
                        TABLE_NAME = tableName,
                        RECORD_ID = ent.OriginalValues.Properties[0].ToString(),  // Again, adjust this if you have a multi-column key
                        COLUMN_NAME = "*ALL",    // tên cột dữ liệu thay đổi
                        NEW_VALUE = (ent.CurrentValues.ToObject() is IDescribableEntity) ? (ent.CurrentValues.ToObject() as IDescribableEntity).Describe() : ent.CurrentValues.ToObject().ToString()
                    }
                        );
                }
                else if (ent.State == EntityState.Deleted)
                {
                    result.Add(new AuditLog()
                    {
                        USER_ID = UserName,
                        EVENT_DATE = changeTime,
                        EVENT_TYPE = "D", // xóa
                        TABLE_NAME = tableName,
                        RECORD_ID = ent.OriginalValues.Properties[0].ToString(),
                        COLUMN_NAME = "*ALL",
                        NEW_VALUE = (ent.OriginalValues.ToObject() is IDescribableEntity) ? (ent.OriginalValues.ToObject() as IDescribableEntity).Describe() : ent.OriginalValues.ToObject().ToString()
                    }
                        );
                }
                else if (ent.State == EntityState.Modified)
                {
                    // foreach (var propertyName in ent.OriginalValues.Properties)
                    foreach (var property in ent.Entity.GetType().GetTypeInfo().DeclaredProperties)
                    {
                        var proName = property.Name;
                        if (proName == "CREATE_DATE" && proName == "CREATE_BY" && proName == "UPDATED_DATE" && proName == "UPDATED_BY")
                        {
                            var originalValue = ent.Property(proName).OriginalValue;
                            var currentValue = ent.Property(proName).CurrentValue;
                            // Lưu các cột thay đổi giá trị
                            if (!object.Equals(originalValue, currentValue))
                            {
                                result.Add(new AuditLog()
                                {
                                    USER_ID = UserName,
                                    EVENT_DATE = changeTime,
                                    EVENT_TYPE = "M",
                                    TABLE_NAME = tableName,
                                    RECORD_ID = ent.Property(keyName).OriginalValue.ToString(),
                                    COLUMN_NAME = proName, //tên cột dữ liệu thay đổi
                                    ORIGINAL_VALUE = originalValue == null ? null : originalValue.ToString(),
                                    NEW_VALUE = currentValue.ToString()//ent.CurrentValues.GetValue<object>(name) == null ? null : ent.CurrentValues.GetValue<object>(name).ToString()
                                });

                            }
                        }
                    }
                }
            }
            return result;
        }
    }
}
