using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using api.DB;
using api.Models;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeaderboardController : ControllerBase
    {
        private readonly Database database = new Database();

        // GET: api/<LeaderboardController>
        [HttpGet]
        public Task<List<Leaderboard>> Get()
        {
            return database.GetLeaderboard();
        }
 
        // POST
        [HttpPost]
        public void Post([FromBody] Leaderboard leaderboard)
        {
            database.AddNewLeaderboardScore(leaderboard);
        }
 
        // PUT api/<UserMessageController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }
 
        // DELETE api/<UserMessageController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
