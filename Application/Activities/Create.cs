using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        // this class represents the command to create an Activity.
        public class Command : IRequest<Result<Unit>> { // Implements "IRequest", which means it does not return a value (void-like behavior).
            public Activity Activity { get; set; } // Contains a property Activity that holds the data for the new activity to be created.
        }


        public class CommandValidator : AbstractValidator<Command> {
            public CommandValidator()
            {
                RuleFor(x => x.Activity).SetValidator(new ActivityValidator());
            }
        }


        // Implements IRequestHandler<Command>, indicating it will handle the Command request.
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Activities.Add(request.Activity);
                var result = await _context.SaveChangesAsync() > 0; // to save the changes to the database.

                if(!result) return Result<Unit>.Failure("Failed to create activity");

                return Result<Unit>.Success(Unit.Value); // This is equal to nothing. we use this bcz tell the compiler the command is successfully processed.
            }
        }
    }
}