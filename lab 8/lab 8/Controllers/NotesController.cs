using Microsoft.AspNetCore.Mvc;

namespace MyNotes.Controllers;

[ApiController]
[Route("[controller]")]
public class NotesController : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Create()
    {
        return Ok();
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        return Ok();
    }

}
