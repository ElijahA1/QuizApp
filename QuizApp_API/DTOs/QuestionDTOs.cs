using System.ComponentModel.DataAnnotations;
using QuizApp_API.Models;

namespace QuizApp_API.DTOs
{
    public sealed record QuestionReadDTO(
        int ID,
        string Difficulty, 
        string Question, 
        string Answer
        );

    public sealed record QuestionCreateDTO(
        [Required] DifficultyLevel Difficulty,
        [Required] string Question,
        [Required] string Answer
        );

    public sealed record QuestionUpdateDTO(
        [Required] DifficultyLevel Difficulty,
        [Required] string Question,
        [Required] string Answer
        );
}
