using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        // his class represents the command to create an Activity.
        public class Command : IRequest { // Implements "IRequest", which means it does not return a value (void-like behavior).
            public Activity Activity { get; set; } // Contains a property Activity that holds the data for the new activity to be created.
        }

        // Implements IRequestHandler<Command>, indicating it will handle the Command request.
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Activities.Add(request.Activity);
                await _context.SaveChangesAsync(); // to save the changes to the database.
                return Unit.Value; // This is equal to nothing. we use this bcz tell the compiler the command is successfully processed.
            }
        }
    }
}