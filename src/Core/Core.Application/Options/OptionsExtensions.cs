namespace Core.Application.Options;

public static class OptionsExtensions
{
    public static T LoadOptions<T>(this IConfiguration configuration, string sectionName) where T : IValidateOptions
    {
        var options = configuration.GetSection(sectionName).Get<T>();

        return options;
    }

    public static T BindValidateReturn<T>(this IServiceCollection services, IConfiguration configuration) where T : class, IValidateOptions
    {
        services.AddOptions<T>()
            .BindConfiguration(typeof(T).Name)
            .ValidateDataAnnotations()
            .ValidateOnStart();

        return configuration.LoadOptions<T>(typeof(T).Name);
    }

    public static void BindValidate<T>(this IServiceCollection services) where T : class, IValidateOptions
    {
        services.AddOptions<T>()
            .BindConfiguration(typeof(T).Name)
            .ValidateDataAnnotations()
            .ValidateOnStart();
    }
}
