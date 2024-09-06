namespace Core.Domain.Models;

public class DatePickerControl : ControlBase
{
    public new string Type => "DatePicker";
    public string Format { get; set; } = "dd/mm/yyyy";
}
