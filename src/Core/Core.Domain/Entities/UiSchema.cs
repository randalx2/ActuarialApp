namespace Core.Domain.Entities;

public class UiSchema : EntityBase<Guid>
{
    public string Name { get; set; } = default!;
    public virtual List<UiSchemaDesign> Design { get; set; } = default!;
    public string Version { get; set; } = default!;
}
