using Microsoft.AspNetCore.Mvc;
using CatLowersAPI.Models;
using CatLowersMVC.SQL;

namespace CatLowersMVC.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TopicController: Controller
    {
        [HttpGet]
        [Route("all")]
        public IActionResult GetAllTopics()
        {
            var sql = new SQLTopic();
            var topics = sql.GetAllTopics();

            return Ok(topics);
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult GetTopicById(int id)
        {
            var sql = new SQLTopic();
            var article = sql.GetTopicById(id);

            return Ok(article);
        }
    }
}
