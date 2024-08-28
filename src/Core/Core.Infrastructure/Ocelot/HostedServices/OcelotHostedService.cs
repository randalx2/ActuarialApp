namespace Core.Infrastructure.Ocelot.HostedServices;

public class OcelotHostedService(IConsulClient consulClient, ConsulOptions ocelotOptions) : IHostedService
{
    private readonly IConsulClient _consulClient = consulClient;
    private readonly ConsulOptions _ocelotOptions = ocelotOptions;
    private string _registrationId = default!;

    public async Task StartAsync(CancellationToken cancellationToken)
    {
        _registrationId = $"{_ocelotOptions.ServiceName}-{_ocelotOptions.ServiceId}";

        var registration = new AgentServiceRegistration
        {
            ID = _registrationId,
            Name = _ocelotOptions.ServiceName,
            Address = _ocelotOptions.ServiceAddress.Host,
            Port = _ocelotOptions.ServiceAddress.Port
        };

        await _consulClient.Agent.ServiceDeregister(registration.ID, cancellationToken);
        await _consulClient.Agent.ServiceRegister(registration, cancellationToken);
    }

    public async Task StopAsync(CancellationToken cancellationToken)
    {
        await _consulClient.Agent.ServiceDeregister(_registrationId, cancellationToken);
    }
}
