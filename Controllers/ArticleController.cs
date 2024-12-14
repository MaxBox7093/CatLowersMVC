using CatLowersAPI.Models;
using CatLowersMVC.Models;
using CatLowersMVC.SQL;
using Microsoft.AspNetCore.Mvc;

namespace CatLowersMVC.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ArticleController : Controller
    {
        [HttpPost]
        [Route("create")]
        public IActionResult CreateArticle(Article article)
        {
            var sqlArticle = new SQLArticle();
            sqlArticle.AddArticle(article);

            return Ok();
        }

        [HttpPost]
        [Route("all")]
        public IActionResult GetAllArticles()
        {
            var sqlArticle = new SQLArticle();
            var articles = sqlArticle.GetAllArticles();  

            return Ok(articles);  
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult GetArticleById(int id)
        {
            var sqlArticle = new SQLArticle();
            var article = sqlArticle.GetArticleById(id);  

            if (article == null)
            {
                return NotFound($"Статья с ID {id} не найдена");
            }

            return Ok(article);  
        }

        [HttpPost]
        [Route("createComment")]
        public IActionResult CreateComment(ArticleComment comment)
        {
            var sqlArticle = new SQLArticle();
             sqlArticle.AddComment(comment);

            return Ok();
        }

        [HttpGet]
        [Route("articleComments/{articleId}")]
        public IActionResult GetComments(int articleId)
        {
            var sqlArticle = new SQLArticle();
            var comments = sqlArticle.GetArticleComments(articleId);

            return Ok(comments);
        }

        [HttpDelete]
        [Route("deleteComment/{commentId}")]
        public IActionResult DeleteComment(int commentId)
        {
            try
            {
                var sqlArticle = new SQLArticle();
                sqlArticle.DeleteComment(commentId);

                return Ok(new { success = true, message = "Комментарий успешно удален." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Произошла ошибка на сервере.", error = ex.Message });
            }
        }
    }
}
