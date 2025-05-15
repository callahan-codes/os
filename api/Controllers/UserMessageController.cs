using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using api.DB;
using api.Models;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserMessageController : ControllerBase
    {
        private readonly Database database = new Database();

        // GET: api/<UserMessageController>
        [HttpGet]
        public Task<List<UserMessage>> Get()
        {
            return database.GetAllUserMessages();
        }
 
        // POST
        [HttpPost]
        public void Post([FromBody] UserMessage userMessage)
        {
            database.AddNewUserMessage(userMessage);
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
