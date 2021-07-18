using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SqlApi.Models
{
    public class Response
    {
        public string Query { get; set; }

        public Response(string query)
        {
            this.Query = query;
        }
    }
}
