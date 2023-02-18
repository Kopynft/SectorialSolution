using BACK.Models;
using Microsoft.EntityFrameworkCore;

namespace BACK.Data
{
    public class DataContext: DbContext
    {
        public DataContext(DbContextOptions<DataContext> options): base(options) { }

        public DbSet<Categories> categories => Set<Categories>();

        public DbSet<Subcategories> subcategories => Set<Subcategories>();

        public DbSet<Topics> topics => Set<Topics>();
    }
}
