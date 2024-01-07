using Microsoft.EntityFrameworkCore;
using to_do_backend.Data.Configurations;
using to_do_backend.Entities;

namespace to_do_backend.Data
{
    public class AppDbContext : DbContext
    {
        public const string Schema = "ToDo";
        public AppDbContext(DbContextOptions options) : base(options)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            new TaskToDoConfiguration().Configure(modelBuilder.Entity<TaskToDo>());
        }
    }
}
