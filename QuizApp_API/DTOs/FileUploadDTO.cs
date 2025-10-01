using System.ComponentModel.DataAnnotations;
using QuizApp_API.Models;
namespace QuizApp_API.DTOs
{
    //Couldn't get Swagger to work correctly passing the file directly
    public class FileUploadDTO
    {
        [Required]
        public IFormFile File { get; set; }
    }
}
