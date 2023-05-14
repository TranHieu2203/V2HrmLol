using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace GoHR.Host.demo
{
    public partial class ModelContext : DbContext
    {
        public ModelContext()
        {
        }

        public ModelContext(DbContextOptions<ModelContext> options)
            : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseOracle("Persist Security Info=True; Data Source=(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=113.190.45.133)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=orcl)));User ID=TENANTDB3;Password=hrm;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.4-servicing-10062")
                .HasAnnotation("Relational:DefaultSchema", "TENANTDB3");

            modelBuilder.HasSequence("ISEQ$$_105629");

            modelBuilder.HasSequence("ISEQ$$_105632");

            modelBuilder.HasSequence("ISEQ$$_105635");

            modelBuilder.HasSequence("ISEQ$$_105638");

            modelBuilder.HasSequence("ISEQ$$_105641");

            modelBuilder.HasSequence("ISEQ$$_105644");

            modelBuilder.HasSequence("ISEQ$$_105647");

            modelBuilder.HasSequence("ISEQ$$_105650");

            modelBuilder.HasSequence("ISEQ$$_105653");

            modelBuilder.HasSequence("ISEQ$$_105656");

            modelBuilder.HasSequence("ISEQ$$_105661");

            modelBuilder.HasSequence("ISEQ$$_105664");

            modelBuilder.HasSequence("ISEQ$$_105667");

            modelBuilder.HasSequence("ISEQ$$_105670");

            modelBuilder.HasSequence("ISEQ$$_105673");

            modelBuilder.HasSequence("ISEQ$$_105676");

            modelBuilder.HasSequence("ISEQ$$_105679");

            modelBuilder.HasSequence("ISEQ$$_105682");

            modelBuilder.HasSequence("ISEQ$$_105685");

            modelBuilder.HasSequence("ISEQ$$_105688");

            modelBuilder.HasSequence("ISEQ$$_105691");

            modelBuilder.HasSequence("ISEQ$$_105694");

            modelBuilder.HasSequence("ISEQ$$_105697");

            modelBuilder.HasSequence("ISEQ$$_105700");

            modelBuilder.HasSequence("ISEQ$$_105703");

            modelBuilder.HasSequence("ISEQ$$_105706");

            modelBuilder.HasSequence("ISEQ$$_105709");

            modelBuilder.HasSequence("ISEQ$$_114804");

            modelBuilder.HasSequence("ISEQ$$_114807");

            modelBuilder.HasSequence("ISEQ$$_114810");

            modelBuilder.HasSequence("ISEQ$$_114813");

            modelBuilder.HasSequence("ISEQ$$_114816");

            modelBuilder.HasSequence("ISEQ$$_114819");

            modelBuilder.HasSequence("ISEQ$$_114822");

            modelBuilder.HasSequence("ISEQ$$_114825");

            modelBuilder.HasSequence("ISEQ$$_114828");

            modelBuilder.HasSequence("ISEQ$$_114831");

            modelBuilder.HasSequence("ISEQ$$_114834");

            modelBuilder.HasSequence("ISEQ$$_114865");

            modelBuilder.HasSequence("ISEQ$$_114868");

            modelBuilder.HasSequence("ISEQ$$_114871");

            modelBuilder.HasSequence("ISEQ$$_114874");

            modelBuilder.HasSequence("ISEQ$$_114877");

            modelBuilder.HasSequence("ISEQ$$_114880");

            modelBuilder.HasSequence("ISEQ$$_114883");

            modelBuilder.HasSequence("ISEQ$$_114886");

            modelBuilder.HasSequence("ISEQ$$_114889");

            modelBuilder.HasSequence("ISEQ$$_114892");

            modelBuilder.HasSequence("ISEQ$$_114895");

            modelBuilder.HasSequence("ISEQ$$_114898");

            modelBuilder.HasSequence("ISEQ$$_114901");

            modelBuilder.HasSequence("ISEQ$$_114904");

            modelBuilder.HasSequence("ISEQ$$_114907");

            modelBuilder.HasSequence("ISEQ$$_114910");

            modelBuilder.HasSequence("ISEQ$$_114913");

            modelBuilder.HasSequence("ISEQ$$_114916");

            modelBuilder.HasSequence("ISEQ$$_114919");

            modelBuilder.HasSequence("ISEQ$$_114922");

            modelBuilder.HasSequence("ISEQ$$_114925");

            modelBuilder.HasSequence("ISEQ$$_114928");

            modelBuilder.HasSequence("ISEQ$$_114931");

            modelBuilder.HasSequence("ISEQ$$_114934");

            modelBuilder.HasSequence("ISEQ$$_114937");

            modelBuilder.HasSequence("ISEQ$$_114940");

            modelBuilder.HasSequence("ISEQ$$_114943");

            modelBuilder.HasSequence("ISEQ$$_114946");
        }
    }
}
