using System.Linq.Expressions;
using lab_8.Contracts;
using lab_8.DataAccess;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyNotes.Models;

namespace MyNotes.Controllers;

[ApiController]
[Route("[controller]")]
public class NotesController : ControllerBase
{
    private readonly NotesDbContext _dbContext;

    public NotesController(NotesDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateNoteRequest request, CancellationToken ct)
    {
        try
        {
            var note = new Note(request.Title, request.Description);

            await _dbContext.Notes.AddAsync(note, ct);
            await _dbContext.SaveChangesAsync(ct);

            return Ok(note); 
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Ошибка при создании заметки: {ex.Message}");
        }
    }

    [HttpGet]
    public async Task<IActionResult> GetNotes(
        [FromQuery] string search = null,
        [FromQuery] string sort = "date",
        [FromQuery] string order = "desc")
    {
        try
        {
            var query = _dbContext.Notes.AsQueryable();

            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(n =>
                    EF.Functions.Like(n.Title, $"%{search}%") || 
                    EF.Functions.Like(n.Description, $"%{search}%"));
            }

            query = (sort.ToLower(), order.ToLower()) switch
            {
                ("date", "asc") => query.OrderBy(n => n.CreatedAt),
                ("date", _) => query.OrderByDescending(n => n.CreatedAt), 
                ("title", "asc") => query.OrderBy(n => n.Title),
                ("title", _) => query.OrderByDescending(n => n.Title),
                _ => query.OrderByDescending(n => n.CreatedAt) 
            };

            var notes = await query.ToListAsync();
            return Ok(new { notes }); 
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Ошибка при получении заметок: {ex.Message}");
        }
    }
}