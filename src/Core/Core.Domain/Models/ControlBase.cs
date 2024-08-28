namespace Core.Domain.Models;

public abstract class ControlBase
{
    public Guid Id { get; set; } = new Guid();
    public int Order { get; set; }
    public abstract string Type { get; }
    public string Label { get; set; } = default!;
}
