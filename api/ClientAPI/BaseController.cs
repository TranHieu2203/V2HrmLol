using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Common.Extensions;
using ClientDAL.Repositories;

namespace ClientAPI
{
    public class BaseController : Microsoft.AspNetCore.Mvc.Controller
    {


        protected readonly IClientBusiness _unitOfWork;
        //protected readonly ILogger _logger;
     
        public BaseController(IClientBusiness clientBusiness)
        {
            _unitOfWork = clientBusiness;
        }
        /// <summary>
        /// Return Error Code.
        /// </summary>
        protected JsonResult TLAResult(string message)
        {
            return new JsonResult(new { message = message, statusCode = 400 }) { StatusCode = 200 };
        }
        /// <summary>
        /// Return Error Code.
        /// </summary>
        protected JsonResult TLAResult(int status)
        {
            return new JsonResult(new { }) { StatusCode = status };
        }
        /// <summary>
        /// Return Error Code.
        /// </summary>
        protected JsonResult ImportResult(ResultWithError obj)
        {
            return new JsonResult(new { data = obj.Data, message = obj.Error, statusCode = obj.StatusCode }) { StatusCode = int.Parse(obj.StatusCode) };
        }
        /// <summary>
        /// Return Result With Error Code.
        /// </summary>
        protected JsonResult TLAResult(ResultWithError obj)
        {
            return new JsonResult(new { data = obj.Data, message = obj.Error, Error = obj.Error, statusCode = obj.StatusCode }) { StatusCode = 200 };
        }

        /// <summary>
        /// Return Result With Error Code.
        /// </summary>
        protected JsonResult TLAResult(object obj)
        {
            return new JsonResult(new { data = obj, message = string.Empty, statusCode = 200 }) { StatusCode = 200 };
        }
        protected JsonResult TLAValidation()
        {
            var validationErrors =
                    ModelState.Values.Where(E => E.Errors.Count > 0)
                    .SelectMany(E => E.Errors)
                    .Select(E => E.ErrorMessage)
                    .ToArray();
            return new JsonResult(new { Message = validationErrors, statusCode = 400 }) { StatusCode = 200 };
        }
    }
}
