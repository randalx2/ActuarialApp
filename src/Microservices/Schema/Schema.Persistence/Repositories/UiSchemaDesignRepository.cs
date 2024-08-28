namespace Schema.Persistence.Repositories;

public class UiSchemaDesignRepository<T>(SchemaDbContext schemaDbContext) : BaseRepository<T>(schemaDbContext) where T : class { }
