using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController] // It enables features like automatic model validation and better routing convention.
    [Route("api/[controller]")] // It defines the route template for the controller.
    public class BaseApiController : ControllerBase
    {
        
    }
}