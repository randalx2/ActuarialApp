namespace Core.Infrastructure.EventGrid.Dto;

public class PublisherResponseDto<T> where T : class
{
    public T? EventType { get; set; }
}
