using CatLowersMVC.Models;
using CatLowersMVC.SQL;
using Microsoft.AspNetCore.Mvc;
using System;

namespace CatLowersMVC.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class QuestionController : Controller
    {
        [HttpPost]
        [Route("create")]
        public IActionResult CreateQuestion([FromForm] Question question, IFormFile? img)
        {
            if (question == null)
            {
                return BadRequest("Invalid question data.");
            }

            try
            {
                // Если файл не пустой, конвертируем его в байты
                if (img != null && img.Length > 0)
                {
                    using (var memoryStream = new MemoryStream())
                    {
                        img.CopyTo(memoryStream);
                        question.Img = memoryStream.ToArray();
                    }
                }
                else
                {
                    question.Img = null; // Если файла нет, записываем null
                }

                var sqlQuestion = new SQLQuestion();
                int insertedId = sqlQuestion.AddQuestion(question);

                return Ok(new { Id = insertedId });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }



        [HttpGet]
        [Route("getAll")]
        public IActionResult GetAllQuestions()
        {
            try
            {
                var sqlQuestion = new SQLQuestion();
                var questions = sqlQuestion.GetAllQuestions();

                if (questions == null || questions.Count == 0)
                {
                    return NotFound("No questions found.");
                }

                return Ok(questions);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet]
        [Route("getById/{id}")]
        public IActionResult GetQuestionById(int id)
        {
            try
            {
                var sqlQuestion = new SQLQuestion();
                var question = sqlQuestion.GetQuestionById(id);

                if (question == null)
                {
                    return NotFound($"Question with ID {id} not found.");
                }

                return Ok(question);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet]
        [Route("search")]
        public IActionResult SearchQuestions([FromQuery] string? keyword, [FromQuery] int? idTopic)
        {
            try
            {
                var sqlQuestion = new SQLQuestion();
                var questions = sqlQuestion.SearchQuestions(keyword, idTopic);

                if (questions == null || questions.Count == 0)
                {
                    return NotFound("No matching questions found.");
                }

                return Ok(questions);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
