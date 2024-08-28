namespace Core.Domain.Models;

public class ComboBoxControl : ControlBase
{
    public override string Type => "ComboBox";
    public List<string> Options { get; set; } = [];
}
