namespace Schema.Persistence;

public class SchemaDbContext : DbContext
{
    public SchemaDbContext(DbContextOptions<SchemaDbContext> options) : base(options) { }

    public DbSet<UiSchema> UiSchema { get; set; }
    public DbSet<UiSchemaDesign> UiSchemaDesign { get; set; }
}
