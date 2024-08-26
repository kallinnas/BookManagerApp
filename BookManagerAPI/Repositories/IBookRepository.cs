using BookManagerAPI.Models;

namespace BookManagerAPI.Repositories
{
    public interface IBookRepository
    {
        Task<IEnumerable<Book>> GetAllAsync();
        Task<Book?> GetByIdAsync(int id);
        Task<Book> AddAsync(Book book);
        Task<Book?> UpdateAsync(Book book);
        Task<Book?> DeleteByIdAsync(int id);
        Task<IEnumerable<Book>> GetByStatusAsync(int status);
        Task<Book?> GetByTitleAsync(string title);
    }
}
