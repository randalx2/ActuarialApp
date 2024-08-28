namespace Core.Infrastructure.EventGrid.Abstractions;

public interface ISubscriber
{
    Task<JsonResult> AuthoriseAsync(string jsonContent, CancellationToken cancellationToken = default);
}
