namespace Schema.Application.Abstractions;

public interface ISchemaService
{
    Task<IEnumerable<UiSchemaDto>> GetAllAsync();
    Task AddAsync(UiSchemaDto uiSchema);
}
