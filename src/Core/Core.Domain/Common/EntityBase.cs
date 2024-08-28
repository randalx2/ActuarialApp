namespace Core.Domain.Common;

public class EntityBase<T>
{
    public T Id { get; set; } = default!;
}
