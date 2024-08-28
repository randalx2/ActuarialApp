namespace Core.Application.Helpers;

public static class JsonHelper
{
    private static readonly JsonSerializerOptions options = new()
    {
        Converters = { new JsonStringEnumConverter() },
        WriteIndented = true
    };

    public static string Serialize<T>(T obj)
    {
        return JsonSerializer.Serialize(obj, options);
    }

    public static T? Deserialize<T>(string json) 
    {
        return JsonSerializer.Deserialize<T>(json, options);
    }
}
