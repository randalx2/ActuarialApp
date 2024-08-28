namespace Core.Application.Dto;

public class UiSchemaDto
{
    public UiSchema UiSchema { get; set; } = default!;
    public List<ControlBase> Controls { get; set; } = [];
}
