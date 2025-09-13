using Microsoft.EntityFrameworkCore;
using LeadManager.Api.Models;

namespace LeadManager.Api.Data
{
    public class LeadContext : DbContext
    {
        public LeadContext(DbContextOptions<LeadContext> options) : base(options) { }

        public DbSet<Lead> Leads { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Lead>().Property(p => p.Price).HasColumnType("decimal(18,2)");
        }
    }
}
