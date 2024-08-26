using BookManagerAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace BookManagerAPI.Repositories
{
    public class BookRepository : IBookRepository
    {
        private readonly AppDbContext _context;

        public BookRepository(AppDbContext context) { _context = context; }

        public async Task<Book> AddAsync(Book book)
        {
            var result = await _context.Books.AddAsync(book);
            await _context.SaveChangesAsync();
            return result.Entity;
        }

        public async Task<Book?> DeleteByIdAsync(int id)
        {
            var book = await GetByIdAsync(id);

            if (book != null)
            {
                _context.Remove(book);
                await _context.SaveChangesAsync();
                return book;
            }

            return null;
        }

        public async Task<IEnumerable<Book>> GetAllAsync() { return await _context.Books.ToListAsync(); }

        public async Task<Book?> GetByIdAsync(int id) { return await _context.Books.Where(book => book.Id == id).FirstOrDefaultAsync(); }

        public async Task<IEnumerable<Book>> GetByStatusAsync(int status)
        {
            return await _context.Books.Where(book => book.Status == (BookStatus)status).ToListAsync();
        }

        public async Task<Book?> GetByTitleAsync(string title) { return await _context.Books.Where(book => book.Title == title).FirstOrDefaultAsync(); }

        public async Task<Book?> UpdateAsync(Book book)
        {
            var existingBook = await GetByIdAsync(book.Id);

            if (existingBook != null)
            {
                existingBook.Title = book.Title;
                existingBook.Author = book.Author;
                existingBook.Year = book.Year;
                existingBook.Status = book.Status;
                await _context.SaveChangesAsync();
                return existingBook;
            }

            return null;
        }
    }
}
