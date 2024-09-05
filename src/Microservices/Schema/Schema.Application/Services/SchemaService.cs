namespace Schema.Application.Services;

public class SchemaService : ISchemaService
{
    private readonly IMediator _mediator;

    public SchemaService(IMediator mediator)
    {
        _mediator = mediator;
    }

    public async Task AddAsync(UiSchemaDto uiSchemaDto)
    {
        var schemaDesignGuid = new Guid();
        var schemaGuid = new Guid();

        var uiSchemaDesign = new UiSchemaDesign
        {
            Id = schemaDesignGuid,
            UiSchemaId = schemaGuid,
            Json = JsonHelper.Serialize(uiSchemaDto.Controls)
        };

        var uiSchema = new UiSchema
        {
            Id = schemaGuid,
            Name = uiSchemaDto.UiSchema.Name,
            Version = uiSchemaDto.UiSchema.Version,
        };

        await _mediator.Send(new AddCommand<UiSchema>(uiSchema));
        await _mediator.Send(new AddCommand<UiSchemaDesign>(uiSchemaDesign));
    }

    public Task<IEnumerable<UiSchemaDto>> GetAllAsync()
    {
        var schemaDtoList = new List<UiSchemaDto>();

        // Mock Data for schemas
        var schemaDto = new UiSchemaDto
        {
            UiSchema = new UiSchema
            {
                Id = new Guid(),
                Name = "Actuarial Wizard",
                Version = "1.0.0"
            },
            Controls =
            [
                new FormControl
                {
                    Controls =
                    [
                        new TextBoxControl
                        {
                            IsRequired = true,
                            Label = "Name",
                            Order = 1,
                            MaxLength = "100",
                            Placeholder = "Name"
                        },
                        new TextBoxControl
                        {
                            IsRequired = true,
                            Label = "Surname",
                            Order = 2,
                            MaxLength = "100",
                            Placeholder = "Surname"
                        },
                        new ButtonControl
                        {
                            Label = "Next",
                            Order = 3
                        }
                    ],
                    Order = 1,
                    Label = "UserInformation"
                },
                new FormControl
                {
                    Controls =
                    [
                        new TextBoxControl
                        {
                            IsRequired = true,
                            Label = "Age",
                            Order = 1,
                            MaxLength = "2",
                            Placeholder = "Name"
                        },
                        new ComboBoxControl
                        {
                            Label = "Smoker",
                            Order = 2,
                            Options = new List<string>
                            {
                                "Yes",
                                "No"
                            }
                        },
                        new ButtonControl
                        {
                            Label = "Submit",
                            Order = 3,
                            IsSubmit = true
                        }
                    ],
                    Order = 2,
                    Label = "RiskInformation"
                },
            ]
        };

        schemaDtoList.Add(schemaDto);
        return Task.FromResult(schemaDtoList.AsEnumerable());

        // return _mediator.Send(new GetAllQuery<UiSchemaDto>());
    }
}
