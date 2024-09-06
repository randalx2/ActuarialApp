using Core.Domain.Models;
using Core.Infrastructure.AzureStorage.Abstractions;
using Core.Infrastructure.AzureStorage.Options;
using Microsoft.Extensions.Options;

namespace Pipeline.Application.Controllers.V1;

[Route("api/pipeline/v{version:apiVersion}/[controller]")]
public class PipelineController : BaseApiController
{
    private readonly IAzureStorageQueue _azureStorageQueue;
    private readonly IOptions<AzureStorageOptions> _azureStorageOptions;

    public PipelineController(IAzureStorageQueue azureStorageQueue, IOptions<AzureStorageOptions> azureStorageOptions)
    {
        _azureStorageQueue = azureStorageQueue;
        _azureStorageOptions = azureStorageOptions;
    }

    [HttpPost()]
    public async Task<IActionResult> PostMessageAsync([FromBody] SchemaModel schemaModel)
    {
        var response = await _azureStorageQueue.InsertMessage(schemaModel);
        return Ok();
    }
}
