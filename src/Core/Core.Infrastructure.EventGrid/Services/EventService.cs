namespace Core.Infrastructure.EventGrid.Services;

public class EventService : IEventService
{
    private readonly IEventGridService _eventGridService;
    private readonly IAzureStorageQueue _azureStorageQueue;
    private readonly ILogger<EventService> _logger;

    public EventService(IEventGridService eventGridService, IAzureStorageQueue  azureStorageQueue, ILogger<EventService> logger)
    {
        _eventGridService = eventGridService;
        _azureStorageQueue = azureStorageQueue;
        _logger = logger;
    }

    public async Task<EventGridMessageType> GetEventTypeAsync(HttpRequest httpRequest, CancellationToken cancellationToken = default)
    {
        bool eventTypeSubcriptionValidation = httpRequest.Headers[EventTypeHeaders.SubcriptionValidation].FirstOrDefault() == EventType.SubcriptionValidation;
        bool eventTypeNotification = httpRequest.Headers[EventTypeHeaders.Notification].FirstOrDefault() == EventType.Notification;

        if (eventTypeSubcriptionValidation)
        {
            return await Task.FromResult(EventGridMessageType.Validation);
        }

        if (eventTypeNotification)
        {
            return await Task.FromResult(EventGridMessageType.Notification);
        }

        // ONLY added for DEMO purposes
        if (!eventTypeSubcriptionValidation && !eventTypeNotification)
        {
            return await Task.FromResult(EventGridMessageType.Notification);
        }

        return await Task.FromResult(EventGridMessageType.None);
    }

    public async Task<IActionResult> HandleNotificationAsync(string jsonContent, CancellationToken cancellationToken = default)
    {
        var response = await _azureStorageQueue.RetrieveNextMessageAsync(cancellationToken);

        if (response)
        {            
            _logger.LogInformation("{datetime} {method}: Processing of {json} succeeded. Returning Ok().", DateTime.Now, nameof(HandleNotificationAsync), jsonContent);
            return new OkObjectResult(response);
        }

        _logger.LogInformation("{datetime} {method}: Processing of {json} failed. Returning BadRequest().", DateTime.Now, nameof(HandleNotificationAsync), jsonContent);
        return new BadRequestObjectResult("");
    }

    public async Task<IActionResult> HandleSubscriptionValidationAsync(string jsonContent, CancellationToken cancellationToken = default)
    {
        return await _eventGridService.AuthoriseAsync(jsonContent, cancellationToken);
    }

    public async Task<IActionResult> ProcessEventRequestAsync(HttpRequest httpRequest, CancellationToken cancellationToken = default)
    {
        using var reader = new StreamReader(httpRequest.Body, Encoding.UTF8);
        var jsonContent = await reader.ReadToEndAsync();

        _logger.LogInformation("{datetime} {method}: HttpRequest {request} received.", DateTime.Now, nameof(ProcessEventRequestAsync), httpRequest);
        switch (await GetEventTypeAsync(httpRequest, cancellationToken))
        {
            case EventGridMessageType.Notification: return await HandleNotificationAsync(jsonContent, cancellationToken);
            case EventGridMessageType.Validation: return await HandleSubscriptionValidationAsync(jsonContent, cancellationToken);
            case EventGridMessageType.None:
            default:
                _logger.LogError("{datetime} {method}: Unknown event type {eventType} received. Unable to continue.", DateTime.Now, nameof(ProcessEventRequestAsync), EventGridMessageType.None);
                break;
        }

        _logger.LogInformation("{datetime} {method}: HttpRequest {request}, failed. Returning BadRequest().", DateTime.Now, nameof(ProcessEventRequestAsync), httpRequest);
        return new BadRequestResult();
    }
}
