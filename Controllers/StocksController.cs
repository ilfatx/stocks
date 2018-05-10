using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AppSpot.Controllers
{
    [Produces("application/json")]
    [Route("api/stocks")]
    public class StocksController : Controller
    {
        [HttpGet]
        public async Task<string> Get()
        {
            using (HttpClient client = new HttpClient())
            {
                var stringTask = client.GetStringAsync("http://phisix-api3.appspot.com/stocks.json");
                var data = await stringTask;
                return data;
            }
        }
    }
}
