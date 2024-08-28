namespace Schema.Application.Controllers.V1;

[Route("api/schema/v{version:apiVersion}/[controller]")]
public class SchemaController : BaseApiController
{
    private readonly ISchemaService _schemaService;

    public SchemaController(ISchemaService schemaService)
    {
        _schemaService = schemaService;
    }

    [HttpPost(nameof(AddAsync))]
    public async Task<IActionResult> AddAsync([FromBody] UiSchemaDto schemaDto)
    {
        await _schemaService.AddAsync(schemaDto);
        return Ok();
    }

    [HttpGet(nameof(GetAllAsync))]
    public async Task<IActionResult> GetAllAsync()
    {
        var results = await _schemaService.GetAllAsync();
        return Ok(results);
    }

    // TODO: Add Delete/Update Controllers.
}
