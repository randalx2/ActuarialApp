namespace Core.Domain.Models;

public class ButtonControl : ControlBase
{
    public override string Type => "Button";
    public bool IsSubmit { get; set; }
}
