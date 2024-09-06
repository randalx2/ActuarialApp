namespace Core.Domain.Models;

public class RadioButtonControl : ControlBase
{
    public new string Type => "RadioButton";
    public List<string> Options { get; set; } = [];
    public string SelectedOption { get; set; } = default!;
}
