namespace Core.Domain.Models;

public class ButtonControl : ControlBase
{
    public new string Type => "Button";
    public bool IsSubmit { get; set; }
}
