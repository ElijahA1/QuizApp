using System.Text.Json.Serialization;

namespace QuizApp_API.Models
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum DifficultyLevel
    {
        Basic,
        Intermediate,
        Advanced
    }
    public class QuestionEntry
    {
        public int ID { get; set; }
        public DifficultyLevel Difficulty { get; set; }
        public string Question { get; set; }
        public string Answer { get; set; }
    }
}
