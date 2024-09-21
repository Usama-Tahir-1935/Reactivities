// This code is a part of a feature in an application where Mediator is used to handle queries in a clean and decoupled manner.
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        // This class represent the request to get a list of activities. This class inherit from the "IRequest" Its a simple class used to encapsulate the request for the list of activities.
        public class Query : IRequest<List<Activity>> {} 

        // This class implements the logic to handle this request by fetching all activities from the database using entity framework ToListAsync method.
        public class Handler : IRequestHandler<Query, List<Activity>>
        {
            private readonly DataContext _context;

            // This constructor accepts a DataContext object which is used to interact with the database.
            public Handler(DataContext context)
            {
                _context = context;
            }

            // This method is to retrieve all activities from the database asynchronously and return them as a list.
            // A "CancellationToken" is used in .NET to signal that an operation should be canceled. It's particularly useful when dealing with asynchronous operations or long-running tasks, where you want to give the caller the ability to cancel the operation before it completes
            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Activities.ToListAsync();
            }
        }
    }
}