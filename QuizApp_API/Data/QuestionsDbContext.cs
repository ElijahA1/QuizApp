using QuizApp_API.Models;
using Microsoft.EntityFrameworkCore;

namespace QuizApp_API.Data
{
    public class QuestionsDbContext : DbContext
    {
        public QuestionsDbContext(DbContextOptions<QuestionsDbContext> options) : base(options)
        {
        }
        public DbSet<QuestionEntry> Questions { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //base.OnModelCreating(modelBuilder); Original auto-generated code
            modelBuilder.Entity<QuestionEntry>(entity =>
            {
                entity.Property(q => q.Difficulty).IsRequired().HasConversion<string>(); // Stores enum as string rather than int
                entity.Property(q => q.Question).IsRequired();
                entity.Property(q => q.Answer).IsRequired();

                // Add database index that should speed up lookups
                entity.HasIndex(q => q.Difficulty);
            });
        }
    }
}
