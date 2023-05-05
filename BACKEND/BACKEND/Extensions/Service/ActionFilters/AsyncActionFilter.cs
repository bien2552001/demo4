using Microsoft.AspNetCore.Mvc.Filters;
using System.Threading.Tasks;

namespace BACKEND.Extensions.Service.ActionFilters
{
    public class AsyncActionFilter: IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {

            // thực thi bất kỳ mã nào trước khi hành động được thực
             await next();



        }


    }
}
