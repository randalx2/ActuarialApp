namespace Core.Application.Commands;

public class DeleteCommand<T> : IRequest<Unit> where T : class
{
    public T Entity { get; }

    public DeleteCommand(T entity)
    {
        Entity = entity;
    }
}

public class DeleteCommandHandler<T> : IRequestHandler<DeleteCommand<T>, Unit> where T : class
{
    private readonly IRepository<T> _repository;

    public DeleteCommandHandler(IRepository<T> repository)
    {
        _repository = repository;
    }

    public async Task<Unit> Handle(DeleteCommand<T> request, CancellationToken cancellationToken)
    {
        await _repository.DeleteAsync(request.Entity);
        return Unit.Value;
    }
}
