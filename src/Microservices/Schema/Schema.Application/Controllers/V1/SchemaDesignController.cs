namespace Schema.Application.Controllers.V1;

[Route("api/schema/v{version:apiVersion}/[controller]")]
public class SchemaDesignController : BaseApiController
{
    [HttpPost(nameof(AddAsync))]
    public async Task<IActionResult> AddAsync([FromBody] UiSchemaDesign schemaDesign)
    {
        await Mediator.Send(new AddCommand<UiSchemaDesign>(schemaDesign));
        return Ok();
    }

    [HttpGet(nameof(GetAllAsync))]
    public async Task<IActionResult> GetAllAsync()
    {
        var results = await Mediator.Send(new GetAllQuery<UiSchemaDesign>());
        return Ok(results);
    }
}
