using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookManagerAPI.Models
{
    public class Book
    {
        public Book(int id, string title, string author, short year, BookStatus status)
        {
            Id = id;
            Title = title;
            Author = author;
            Year = year;
            Status = status;
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Author { get; set; }
        [Required]
        public short Year { get; set; }
        [Required]
        public BookStatus Status { get; set; }

    }

    public enum BookStatus
    {
        Available, OnHand, Reserved
    }

}
