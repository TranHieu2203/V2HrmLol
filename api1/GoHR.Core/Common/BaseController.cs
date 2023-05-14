using Microsoft.Extensions.Logging;
using CoreDAL.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;
using Common;
using CoreDAL.Repositories;

namespace CoreDAL.Common
{
    public class BaseController : TLABaseController
    {
        protected readonly IUnitOfWork _unitOfWork;
        protected readonly ILogger _logger;
        public BaseController(
            IUnitOfWork unitOfWork, ILogger logger )
        {
            _logger = logger;
            _unitOfWork = unitOfWork;
        }

    }
}
