

namespace Core.Infrastructure.AzureStorage.Model;

public class MessageModel
{
    public QueueClient Queue { get; set; } = default!;
    public string Message { get; set; } = default!;
}
