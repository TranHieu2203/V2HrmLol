using ClientDAL.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ClientAPI.Authentication
{
    [Produces("application/json")]
    [Route("api/client-test/[action]")]

    public class TestController : BaseController
    {
        private readonly IConfiguration _config;

        public TestController(IConfiguration configuration,
                        IClientBusiness unitOfWork) : base(unitOfWork)
        {
           
            _config = configuration;

        }
        [AllowAnonymous]
        [HttpGet]

        public async Task<string> GetSomething()
        {
            return "something";
        }
    }
}
