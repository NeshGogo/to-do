using Microsoft.EntityFrameworkCore;
using to_do_backend.Entities;

namespace to_do_backend.Data
{
    public class AppDbContext : DbContext
    {
        public const string Schema = "ToDo";
        public AppDbContext(DbContextOptions options) : base(options)
        {
            
        }
    }
}
