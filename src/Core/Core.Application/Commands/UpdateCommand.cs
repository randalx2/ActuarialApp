namespace Core.Application.Commands;

public class UpdateCommand<T> : IRequest<Unit> where T : class
{
    public T Entity { get; }

    public UpdateCommand(T entity)
    {
        Entity = entity;
    }
}

public class UpdateCommandHandler<T> : IRequestHandler<UpdateCommand<T>, Unit> where T : class
{
    private readonly IRepository<T> _repository;

    public UpdateCommandHandler(IRepository<T> repository)
    {
        _repository = repository;
    }

    public async Task<Unit> Handle(UpdateCommand<T> request, CancellationToken cancellationToken)
    {
        await _repository.UpdateAsync(request.Entity);
        return Unit.Value;
    }
}