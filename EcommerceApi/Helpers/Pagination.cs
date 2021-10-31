using System.Collections.Generic;

namespace EcommerceApi.Helpers
{
    public class Pagination<T> where T : class
    {
        public int PageSize { get; set; }
        public int PageIndex { get; set; }
        public int Count { get; set; }
        public IReadOnlyList<T> Data { get; set; }


    }
}