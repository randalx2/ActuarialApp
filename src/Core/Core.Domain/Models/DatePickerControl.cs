namespace Core.Domain.Models;

public class DatePickerControl : ControlBase
{
    public override string Type => "DatePicker";
    public string Format { get; set; } = "dd/mm/yyyy";
}
