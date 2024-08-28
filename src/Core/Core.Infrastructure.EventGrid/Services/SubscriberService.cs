namespace Core.Infrastructure.EventGrid.Services;

public class SubscriberService : ISubscriber
{
    public async Task<JsonResult> AuthoriseAsync(string jsonContent, CancellationToken cancellationToken = default)
    {
        var gridEvent = JsonConvert.DeserializeObject<GridEvent<Dictionary<string, string>>>(jsonContent);

        var validationCode = gridEvent?.Data?["validationCode"];

        return await Task.FromResult(new JsonResult(new
        {
            validationResponse = validationCode
        }));
    }
}
