namespace Schema.Application.Controllers.V1;

[Route("api/schema/v{version:apiVersion}/[controller]")]
public class SchemaDesignController : BaseApiController
{
    [HttpGet(nameof(GetAllAsync))]
    public async Task<IActionResult> GetAllAsync()
    {
        var results = await Mediator.Send(new GetAllQuery<UiSchemaDesign>());
        return Ok(results);
    }
}
