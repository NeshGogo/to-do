using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using to_do_backend.Entities;

namespace to_do_backend.Data.Configurations
{
    public class TaskToDoConfiguration : IEntityTypeConfiguration<TaskToDo>
    {
        public void Configure(EntityTypeBuilder<TaskToDo> builder)
        {
            builder.ToTable("TasksToDo", AppDbContext.Schema);
            builder.HasKey(t => t.Id);
            builder.Property(p => p.Title).IsRequired().HasMaxLength(300);
            builder.Property(p => p.CreatedBy).IsRequired().HasMaxLength(128);
            builder.Property(p => p.UpdatedBy).IsRequired().HasMaxLength(128);
            builder.Property(p => p.UpdatedDate).IsRequired();
            builder.Property(p => p.CreatedDate).IsRequired();
            builder.Property(p => p.Done).IsRequired();
        }
    }
}
