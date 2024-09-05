namespace Core.Domain.Models;

public class FormControl : ControlBase
{
    public new string Type => "Form";
    public List<ControlBase> Controls { get; set; } = [];
}
