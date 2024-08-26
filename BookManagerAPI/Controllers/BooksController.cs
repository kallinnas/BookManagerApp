using BookManagerAPI.Models;
using BookManagerAPI.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace BookManagerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly IBookRepository repository;

        public BooksController(IBookRepository repository) { this.repository = repository; }

        [HttpGet]
        public async Task<ActionResult<Book>> GetAll()
        {
            try
            {
                return Ok(await repository.GetAllAsync());
            }

            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Book>> GetById(int id)
        {
            try
            {
                var book = await repository.GetByIdAsync(id);

                if (book == null) return NotFound();

                return Ok(book);
            }

            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("Status")]
        public async Task<ActionResult<Book>> GetByStatus(int status)
        {
            try
            {
                return Ok(await repository.GetByStatusAsync(status));
            }

            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<Book>> Add(Book book)
        {
            try
            {
                if (book == null) return BadRequest();

                var existingBook = await repository.GetByTitleAsync(book.Title);

                if (existingBook != null)
                {
                    ModelState.AddModelError("Title", "Book with such title already exists.");
                    return BadRequest(ModelState);
                }

                var result = repository.AddAsync(book);
                return CreatedAtAction(nameof(GetAll), new { book.Id }, result);
            }

            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult<Book>> Delete(int id)
        {
            try
            {
                var deletedBook = await repository.DeleteByIdAsync(id);

                if (deletedBook == null) return NotFound($"Book with id{id} was not found.");

                return Ok(deletedBook);
            }

            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult<Book>> Update(int id, Book book)
        {
            try
            {
                if (book.Id != id) return BadRequest("Book ID mismatch");

                var updateBook = await repository.UpdateAsync(book);

                if (updateBook == null) return NotFound($"Book with id{id} was not found.");

                return Ok(updateBook);
            }

            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
