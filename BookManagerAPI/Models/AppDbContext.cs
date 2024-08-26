using Microsoft.EntityFrameworkCore;

namespace BookManagerAPI.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Book> Books { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Book>().HasData(
                new Book(1, "To Kill a Mockingbird", "Harper Lee", 1960, BookStatus.Available),
                new Book(2, "1984", "George Orwell", 1949, BookStatus.OnHand),
                new Book(3, "Pride and Prejudice", "Jane Austen", 1813, BookStatus.Available),
                new Book(4, "The Great Gatsby", "F. Scott Fitzgerald", 1925, BookStatus.Reserved),
                new Book(5, "One Hundred Years of Solitude", "Gabriel García Márquez", 1967, BookStatus.Available)
            );
        }
    }

}
