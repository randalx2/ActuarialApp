namespace Core.Domain.Models;

public class TextBoxControl : ControlBase
{
    public override string Type => "TextBox";
    public string Placeholder { get; set; } = default!;
    public string MaxLength { get; set; } = default!;
    public bool IsRequired { get; set; }
    public Regex RegularExpression { get; set; } = default!;
}
