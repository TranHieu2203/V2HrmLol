using System;

namespace Common.Interfaces
{
    public interface IAuditableEntity
    {
        string CREATE_BY { get; set; }
        string UPDATED_BY { get; set; }
        DateTime? CREATE_DATE { get; set; }
        DateTime? UPDATED_DATE { get; set; }
    }

    public interface IAuditedEntity
    {
        string CreatedBy { get; set; }
        DateTime CreatedAt { get; set; }
        string LastModifiedBy { get; set; }
        DateTime LastModifiedAt { get; set; }
    }
}
