namespace Core.Infrastructure.EventGrid.Services;

public class PublisherService : IPublisher
{
    private readonly ILogger<PublisherService> _logger;

    public PublisherService(ILogger<PublisherService> logger)
    {
        _logger = logger;
    }

    public async Task<IEnumerable<PublisherResponseDto<dynamic>>> HandleGridEventAsync(string jsonContent, CancellationToken cancellationToken = default)
    {
        var topics = new List<PublisherResponseDto<dynamic>>();
        var events = JArray.Parse(jsonContent);

        foreach (var e in events)
        {
            var details = JsonConvert.DeserializeObject<GridEvent<dynamic>>(e.ToString());

            topics.Add(new PublisherResponseDto<dynamic>()
            {
                EventType = details
            });
        }

        return await Task.FromResult(topics.AsEnumerable());
    }
}
