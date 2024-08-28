namespace Schema.Persistence.Repositories;

public class UiSchemaRepository<T>(SchemaDbContext schemaDbContext) : BaseRepository<T>(schemaDbContext) where T : class { }
