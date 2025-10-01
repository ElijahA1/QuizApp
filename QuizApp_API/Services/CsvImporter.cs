using QuizApp_API.Data;
using QuizApp_API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic.FileIO;

namespace QuizApp_API.Services
{
    //When testing with Swagger, file upload will NOT work if you are in debug mode. I don't know why, can't figure out a workaround. 
    public class CsvImporterService
    {
        private readonly QuestionsDbContext _db;

        public CsvImporterService(QuestionsDbContext db)
        {
            _db = db;
        }

        public async Task<int> ImportQuestionsAsync(Stream csvStream)
        {
            var importedQuestions = new List<QuestionEntry>();

            using (var reader = new StreamReader(csvStream))
            using (var parser = new TextFieldParser(reader))
            {
                //Settings for parsing data from CSV file

                parser.TextFieldType = FieldType.Delimited;
                parser.SetDelimiters(",");
                parser.HasFieldsEnclosedInQuotes = true;
                DifficultyLevel difficulty = DifficultyLevel.Basic;

                while (!parser.EndOfData)
                {
                    string[] fields = parser.ReadFields();
                    QuestionEntry question = new QuestionEntry();
                    if (fields[0] != null && fields[0]!= "")
                    {
                        switch (fields[0])
                        {
                            //Assign difficult to all questions under difficulty header
                            case "Basic":
                                difficulty = DifficultyLevel.Basic;
                                break;
                            case "Intermediate":
                                difficulty = DifficultyLevel.Intermediate;
                                break;
                            case "Advanced":
                                difficulty = DifficultyLevel.Advanced;
                                break;
                            default:
                                //New Question Entry
                                question = new QuestionEntry
                                {
                                    Difficulty = difficulty,
                                    Question = fields[0],
                                    Answer = fields[1]

                                };
                                importedQuestions.Add(question);
                                break;
                        }
                        
                    }
                }
            }
            //Add List of questions to DB
            _db.Questions.AddRange(importedQuestions);
            return await _db.SaveChangesAsync();
        }
    }
}
