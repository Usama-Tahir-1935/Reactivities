using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext // DbContext is the central part of the EF that acts as a bridge b/w ur application and the database.
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Activity> Activities { get; set; } // These represent the tables in our database.
    }
}