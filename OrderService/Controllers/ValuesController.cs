using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using OrderService.Application;
using OrderService.Models;

namespace OrderService.Controllers
{
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {
        private IOrderApplicationService _applicationService;
        public ValuesController(IOrderApplicationService applicationService)
        {
            _applicationService = applicationService;
        }
        // GET api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            _applicationService.Add(new Order() { Product =1, Customer = 1 , Quantity = 1 });
            return new string[] { "value1", "value2" , "Added" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
