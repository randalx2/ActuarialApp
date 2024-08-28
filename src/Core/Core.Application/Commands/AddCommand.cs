namespace Core.Application.Commands;

public class AddCommand<T> : IRequest<Unit> where T : class
{
    public T Entity { get; }

    public AddCommand(T entity)
    {
        Entity = entity;
    }
}

public class AddCommandHandler<T> : IRequestHandler<AddCommand<T>, Unit> where T : class
{
    private readonly IRepository<T> _repository;

    public AddCommandHandler(IRepository<T> repository)
    {
        _repository = repository;
    }

    public async Task<Unit> Handle(AddCommand<T> request, CancellationToken cancellationToken)
    {
        await _repository.AddAsync(request.Entity);
        return Unit.Value;
    }
}