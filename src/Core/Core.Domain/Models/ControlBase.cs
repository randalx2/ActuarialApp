namespace Core.Domain.Models;

public class ControlBase
{
    public Guid Id { get; set; } = new Guid();
    public int Order { get; set; }
    public string Type { get; set; } = default!;
    public string Label { get; set; } = default!;
}
