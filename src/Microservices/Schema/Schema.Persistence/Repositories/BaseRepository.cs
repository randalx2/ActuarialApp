namespace Schema.Persistence.Repositories;

public class BaseRepository<T> : IRepository<T> where T : class
{
    private readonly SchemaDbContext _dbContext;
    private readonly DbSet<T> _dbSet;

    public BaseRepository(SchemaDbContext dbContext)
    {
        _dbContext = dbContext;
        _dbSet = _dbContext.Set<T>();
    }

    public async Task<T> AddAsync(T entity, CancellationToken cancellationToken = default)
    {
        await _dbSet.AddAsync(entity, cancellationToken);
        return entity;
    }

    public async Task<bool> DeleteAsync(T entity, CancellationToken cancellationToken = default)
    {
        var result = await _dbSet.FindAsync(entity);
        if (result  != null)
        {
            _dbSet.Remove(result);
            return Convert.ToBoolean(await _dbContext.SaveChangesAsync());
        }
        return false;
    }

    public async Task<bool> ExistsAsync(Expression<Func<T, bool>> expression, CancellationToken cancellationToken = default)
    {
        return await _dbSet.AnyAsync(expression, cancellationToken);
    }

    public async Task<IEnumerable<T>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await _dbSet.ToListAsync(cancellationToken);
    }

    public async Task<T?> GetByConditionAsync(Expression<Func<T, bool>> expression, CancellationToken cancellationToken = default)
    {
        var result = await _dbSet.FirstOrDefaultAsync(expression, cancellationToken);

        return result ?? null;
    }

    public async Task<T?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var result = await _dbSet.FindAsync(new object?[] { id, cancellationToken }, cancellationToken: cancellationToken);

        return result ?? null;
    }

    public async Task<bool> SaveAsync(CancellationToken cancellationToken = default)
    {
        return Convert.ToBoolean(await _dbContext.SaveChangesAsync());
    }

    public async Task<bool> UpdateAsync(T entity, CancellationToken cancellationToken = default)
    {
        _dbSet.Update(entity);
        return Convert.ToBoolean(await _dbContext.SaveChangesAsync(cancellationToken));
    }
}
