using BACK.Data;
using BACK.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BACK.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly DataContext _context;

        public CategoriesController(DataContext context)
        {
            this._context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Categories>>> GetAllCategories()
        {
            return Ok(await _context.categories.ToListAsync());
        }

        [HttpPost]
        public async Task<ActionResult<List<Categories>>> AddCategory(Categories category)
        {
            _context.categories.Add(category);
            await _context.SaveChangesAsync();

            return Ok(await _context.categories.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<Categories>>> UpdateCategory(Categories request)
        {
            try
            {
                Categories category = await _context.categories.FirstOrDefaultAsync(c => c.id == request.id);
                category.id = request.id;
                category.name = request.name;
                category.active = request.active;

                await _context.SaveChangesAsync();

                return Ok(category);
            }
            catch (Exception ex) { return BadRequest(ex.Message); }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Categories>>> DeleteCategory(int id)
        {
            try
            {
                Categories category = _context.categories.FirstOrDefault(c => c.id == id);
                _context.categories.Remove(category);
                await _context.SaveChangesAsync();
                return Ok(category);
            }
            catch (Exception ex) { return BadRequest(ex.Message); }
        }
    }
}
