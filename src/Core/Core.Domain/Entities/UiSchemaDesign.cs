namespace Core.Domain.Entities;

public class UiSchemaDesign : EntityBase<Guid>
{
    public Guid UiSchemaId { get; set; }

    public string Json { get; set; } = default!;
}
