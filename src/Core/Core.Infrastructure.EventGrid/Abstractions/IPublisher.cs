namespace Core.Infrastructure.EventGrid.Abstractions;

public interface IPublisher
{
    Task<IEnumerable<PublisherResponseDto<dynamic>>> HandleGridEventAsync(string jsonContent, CancellationToken cancellationToken = default);
}
