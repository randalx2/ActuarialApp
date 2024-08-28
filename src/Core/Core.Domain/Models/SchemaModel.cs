namespace Core.Domain.Models;

public class SchemaModel : EntityBase<Guid>
{
    public List<ControlBase> Control { get; set; } = default!;
}
