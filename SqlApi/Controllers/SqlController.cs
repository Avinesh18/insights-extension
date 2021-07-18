using Microsoft.AspNetCore.Mvc;
using System;
using SqlApi.Models;
using Test;

namespace SqlApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SqlController : ControllerBase
    {
        [HttpGet]
        public string GetSql()
        {
            return "KQL to SQL converter";
        }

        [HttpPost]
        public Response PostSql(Query request)
        {
            string query = request.query;
            Console.WriteLine(query);
            if (query.Trim() == "")
            {
                return new Response("");
            }
            Response response = new Response(new TestQueries().gettingSqlQuery(query));
            return response;
        }
    }
}
