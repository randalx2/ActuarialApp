namespace Core.Domain.Models;

public class FormControl : ControlBase
{
    public override string Type => "Form";
    public List<ControlBase> Controls { get; set; } = [];
}
