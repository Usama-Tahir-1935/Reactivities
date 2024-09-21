using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController] // It enables features like automatic model validation and better routing convention.
    [Route("api/[controller]")] // It defines the route template for the controller.
    public class BaseApiController : ControllerBase
    {
        // This private field hold an instance of IMediator."_mediator" is lazy loaded means it is initiated only when its first needed. 
        private IMediator _mediator;

        // It returns the _mediator instance if it's already been instantiated.
        // If _mediator is null, it uses the HttpContext.RequestServices to retrieve an IMediator instance from the dependency injection container.
        // The ??= operator assigns _mediator only if it's currently null.
        protected IMediator Mediator => _mediator ??= 
            HttpContext.RequestServices.GetService<IMediator>();
    }
}