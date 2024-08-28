namespace Core.Infrastructure.EventGrid.Abstractions;

public interface IEventService
{
    Task<EventGridMessageType> GetEventTypeAsync(HttpRequest httpRequest, CancellationToken cancellationToken = default);
    Task<IActionResult> HandleSubscriptionValidationAsync(string jsonContent, CancellationToken cancellationToken = default);
    Task<IActionResult> HandleNotificationAsync(string jsonContent, CancellationToken cancellationToken = default);
    Task<IActionResult> ProcessEventRequestAsync(HttpRequest httpRequest, CancellationToken cancellationToken = default);
}
