using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizApp_API.Data;
using QuizApp_API.Models;
using QuizApp_API.DTOs;
using QuizApp_API.Services;

namespace QuizApp_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionsController : ControllerBase
    {
        private readonly QuestionsDbContext _context;
        private readonly CsvImporterService _importer;

        public QuestionsController(QuestionsDbContext context, CsvImporterService importer)
        {
            _context = context;
            _importer = importer;
        }

        // GET: api/Questions               Get All Questions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<QuestionReadDTO>>> GetAllQuestions()
        {
            var items = await _context.Questions
                .AsNoTracking() // Do not track returned rows (faster for read-only queries)
                .OrderBy(q => q.ID) // Order by ID
                .Select(q => new QuestionReadDTO( // Create a new QuestionReadDTO for each question
                    q.ID,
                    q.Difficulty.ToString(), // Should keep Difficulty as a string for frontend (otherwise would return an int)
                    q.Question,
                    q.Answer)) 
                .ToListAsync(); // Put everything into a list

            // Return HTTP response and the list of questions in JSON format
            return Ok(items); 
        }

        // GET: api/Questions/difficulty/{level}               Get All Questions With Specified Difficulty
        [HttpGet("difficulty/{difficulty}")]
        public async Task<ActionResult<IEnumerable<QuestionReadDTO>>> GetQuestionsByDifficulty(DifficultyLevel difficulty)
        {
            var items = await _context.Questions
                .AsNoTracking() // Do not track returned rows (faster for read-only queries)
                .Where(q => q.Difficulty == difficulty) // Only take questions with specified difficulty
                .OrderBy(q => q.ID) // Order by ID
                .Select(q => new QuestionReadDTO( // Create a new QuestionReadDTO for each question
                    q.ID,
                    q.Difficulty.ToString(), // Should keep Difficulty as a string for frontend (otherwise would return an int)
                    q.Question,
                    q.Answer))
                .ToListAsync(); // Put everything into a list

            // If there are no questions with specified difficulty
            if (!items.Any())
            {
                return NotFound();
            }

            // Return HTTP response and the list of questions in JSON format
            return Ok(items);
        }

        // GET: api/Questions/5             Get Question {id}
        [HttpGet("{id:int}")] // Adding `:int` ensures the `id` is an integer
        public async Task<ActionResult<QuestionReadDTO>> GetQuestionByID(int id) // Changed ActionResult<QuestionEntry> to <QuestionReadDTO> to use DTOs for clear separation
        {
            // Find question by ID
            var entity = await _context.Questions.FindAsync(id);

            // If question doesn't exist
            if (entity == null)
            {
                return NotFound();
            }

            // If found, copy the question as a QuestionReadDTO
            var read = new QuestionReadDTO(
                entity.ID,
                entity.Difficulty.ToString(),
                entity.Question,
                entity.Answer);

            // Return HTTP response and the question in JSON format
            return Ok(read);
        }

        // PUT: api/Questions/5             Update Question {id}
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        /* Original auto-generated code
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateQuestionByID(int id, QuestionEntry questionEntry)
        {
            if (id != questionEntry.ID)
            {
                return BadRequest();
            }

            _context.Entry(questionEntry).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuestionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        */

        [HttpPut("{id:int}")] // Adding `:int` ensures the `id` is an integer
        public async Task<IActionResult> UpdateQuestionByID(int id, [FromBody] QuestionUpdateDTO dto)
        {
            // Find question by ID
            var entity = await _context.Questions.FindAsync(id);

            // If question doesn't exist
            if (entity == null)
            {
                return NotFound();
            }

            // Update question to match DTO that was sent
            entity.Difficulty = dto.Difficulty;
            entity.Question = dto.Question;
            entity.Answer = dto.Answer;

            // Save to database
            await _context.SaveChangesAsync();

            // Return success (no JSON body)
            return NoContent(); // We can adjust this to return the updated question, but research says this is a more typical REST approach
        }

        // POST: api/Questions              Create Question
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        /* Original auto-generated code
        [HttpPost]
        public async Task<ActionResult<QuestionEntry>> CreateQuestion(QuestionEntry questionEntry)
        {
            _context.Questions.Add(questionEntry);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetQuestionEntry", new { id = questionEntry.ID }, questionEntry);
        }
        */
        [HttpPost]
        public async Task<ActionResult<QuestionReadDTO>> CreateQuestion([FromBody] QuestionCreateDTO dto)
        {


            // Create a new QuestionEntry from the incoming DTO
            var entity = new QuestionEntry
            {
                Difficulty = dto.Difficulty,
                Question = dto.Question,
                Answer = dto.Answer
            };

            // Add question to database
            _context.Questions.Add(entity); 
            await _context.SaveChangesAsync();

            // Copy the newly added question as a QuestionReadDTO
            var read = new QuestionReadDTO(
                entity.ID, 
                entity.Difficulty.ToString(), 
                entity.Question, 
                entity.Answer);

            // Return the HTTP response, the URL of the new question, and the added question in JSON format
            return CreatedAtAction(nameof(GetQuestionByID), new { id = entity.ID }, read);
        }

        // DELETE: api/Questions/5          Delete Question {id}
        [HttpDelete("{id:int}")] // Adding `:int` ensures the `id` is an integer
        public async Task<IActionResult> DeleteQuestionByID(int id)
        {
            // Find question by ID
            var entity = await _context.Questions.FindAsync(id);

            // If question doesn't exist
            if (entity == null)
            {
                return NotFound();
            }

            // If question exists, remove from database
            _context.Questions.Remove(entity);
            await _context.SaveChangesAsync();

            // Return success (no JSON body)
            return NoContent(); 
        }

        /* Helper function was only used in the original PUT, no longer needed
        private bool QuestionExists(int id)
        {
            return _context.Questions.Any(e => e.ID == id);
        }
        */

        [HttpPost("import")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> ImportCsv([FromForm] FileUploadDTO dto)
        {
            if (dto.File == null || dto.File.Length == 0)
                return BadRequest("No file uploaded.");

            try
            {
                using var stream = dto.File.OpenReadStream();
                int count = await _importer.ImportQuestionsAsync(stream);
                return Ok(new { message = $"{count} questions imported successfully." });
            }
            catch (Exception ex)
            {
                // log ex
                return StatusCode(500, $"Error importing file: {ex.Message}");
            }
        }
    }
}