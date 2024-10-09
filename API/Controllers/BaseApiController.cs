using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;


// The BaseApiController class serves as a base for other API controllers, providing shared logic for handling requests and responses using MediatR.
namespace API.Controllers
{
    [ApiController] // It enables features like automatic model validation like 404, and better routing convention.
    [Route("api/[controller]")] // It defines the route template for the controller.
    public class BaseApiController : ControllerBase // It provide access to useful method like OK(), NotFound() and BadRequest()
    {
        // This private field hold an instance of IMediator."_mediator" is lazy loaded means it is initiated only when its first needed. 
        private IMediator _mediator;

        // It returns the _mediator instance if it's already been instantiated.
        // If _mediator is null, it uses the HttpContext.RequestServices to retrieve an IMediator instance from the dependency injection container.
        // The ??= operator assigns _mediator only if it's currently null.
        protected IMediator Mediator => _mediator ??= 
            HttpContext.RequestServices.GetService<IMediator>();

        // This method is used to handle the common logic of returning the appropriate ActionResult based on the result of a request.
        protected ActionResult HandleRequest<T>(Result<T> result) {
            if(result == null) return NotFound();
            if(result.IsSuccess && result.Value != null)
                return Ok(result.Value);
            if(result.IsSuccess && result.Value == null)
                return NotFound();

            return BadRequest(result.Error);
        }
    }
}