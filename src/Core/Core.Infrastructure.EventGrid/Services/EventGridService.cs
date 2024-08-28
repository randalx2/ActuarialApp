namespace Core.Infrastructure.EventGrid.Services;

public class EventGridService : IEventGridService
{
    private readonly ILogger _logger;
    private readonly IPublisher _publisher;
    private readonly ISubscriber _subscriber;

    public EventGridService(IPublisher publisher, ISubscriber subscriber, ILogger<EventGridService> logger)
    {
        _publisher = publisher;
        _subscriber = subscriber;
        _logger = logger;
    }

    public async Task<JsonResult> AuthoriseAsync(string jsonContent, CancellationToken cancellationToken = default)
    {
        return await _subscriber.AuthoriseAsync(jsonContent, cancellationToken);
    }

    public async Task<IEnumerable<PublisherResponseDto<dynamic>>> HandleGridEventAsync(string jsonContent, CancellationToken cancellationToken = default)
    {
        return await _publisher.HandleGridEventAsync(jsonContent, cancellationToken);
    }
}
