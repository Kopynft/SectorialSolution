using BACK.Data;
using BACK.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BACK.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TopicsController : ControllerBase
    {
        private readonly DataContext _context;

        public TopicsController(DataContext context)
        {
            this._context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Topics>>> GetAllTopics()
        {
            return Ok(await _context.topics.ToListAsync());
        }

        [HttpPost]
        public async Task<ActionResult<List<Topics>>> AddTopic(Topics topic)
        {
            _context.topics.Add(topic);
            await _context.SaveChangesAsync();

            return Ok(await _context.topics.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<Topics>>> UpdateTopics(Topics request)
        {
            try
            {
                Topics topic = await _context.topics.FirstOrDefaultAsync(c => c.id == request.id);
                topic.id = request.id;
                topic.name = request.name;
                topic.active = request.active;

                await _context.SaveChangesAsync();

                return Ok(topic);
            }
            catch (Exception ex) { return BadRequest(ex.Message); }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Topics>>> DeleteTopic(int id)
        {
            try
            {
                Topics topic = _context.topics.FirstOrDefault(c => c.id == id);
                _context.topics.Remove(topic);
                await _context.SaveChangesAsync();
                return Ok(topic);
            }
            catch (Exception ex) { return BadRequest(ex.Message); }
        }
    }
}
