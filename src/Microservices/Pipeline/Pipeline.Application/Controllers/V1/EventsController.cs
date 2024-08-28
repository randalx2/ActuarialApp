namespace Pipeline.Application.Controllers.V1;

[Route("webhook/pipeline/v{version:apiVersion}/[controller]")]
public class EventsController : BaseApiController
{
    private readonly IEventService _eventService;

    public EventsController(IEventService eventService)
    {
        _eventService = eventService;
    }

    [HttpPost]
    public async Task<IActionResult> Post()
    {
        var response = await _eventService.ProcessEventRequestAsync(HttpContext.Request);
        return Ok();
    }
}
