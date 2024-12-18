using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class ActivitiesController : BaseApiController
    {
        // Our API controller sending the request to the mediator and then mediator display the list of activity.
        [HttpGet] // api/activities
        public async Task<IActionResult>GetActivities() {
            return HandleRequest(await Mediator.Send(new List.Query())); 
        }

        [HttpGet("{id}")] // api/activities/asdf
        public async Task<IActionResult> GetActivity(Guid id) {
            return HandleRequest(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity) { // "IActionResult" represents various HTTP responses. like not found bad request etc.
            return HandleRequest(await Mediator.Send(new Create.Command {Activity = activity}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity){
            activity.Id = id;
            return HandleRequest(await Mediator.Send(new Edit.Command{Activity = activity}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id){
            return HandleRequest(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}








