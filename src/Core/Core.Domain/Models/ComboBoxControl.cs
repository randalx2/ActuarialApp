namespace Core.Domain.Models;

public class ComboBoxControl : ControlBase
{
    public new string Type => "ComboBox";
    public List<string> Options { get; set; } = [];
}
