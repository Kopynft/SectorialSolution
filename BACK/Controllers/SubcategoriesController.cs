using BACK.Data;
using BACK.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BACK.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubcategoriesController : ControllerBase
    {
        private readonly DataContext _context;

        public SubcategoriesController(DataContext context)
        {
            this._context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Subcategories>>> GetAllSubcategories()
        {
            try
            {
                return Ok(await _context.subcategories.ToListAsync());
            }
            catch (Exception ex) { return BadRequest(ex.Message); }
        }

        [HttpPost]
        public async Task<ActionResult<List<Subcategories>>> AddSubcategory(Subcategories subcategory)
        {
            try
            {
                _context.subcategories.Add(subcategory);
                await _context.SaveChangesAsync();
                return Ok(await _context.categories.ToListAsync());
            }
            catch (Exception ex) { return BadRequest(ex.Message); }
        }

        [HttpPut]
        public async Task<ActionResult<List<Subcategories>>> UpdateSubcategory(Subcategories request)
        {
            try
            {
                Subcategories subcategory = await _context.subcategories.FirstOrDefaultAsync(c => c.id == request.id);
                subcategory.id = request.id;
                subcategory.name = request.name;
                subcategory.active = request.active;

                await _context.SaveChangesAsync();

                return Ok(subcategory);
            }
            catch (Exception ex) { return BadRequest(ex.Message); }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Subcategories>>> DeleteSubcategory(int id)
        {
            try
            {
                Subcategories subcategory = _context.subcategories.FirstOrDefault(c => c.id == id);
                _context.subcategories.Remove(subcategory);
                await _context.SaveChangesAsync();
                return Ok(subcategory);
            }
            catch (Exception ex) { return BadRequest(ex.Message); }
        }
    }
}
