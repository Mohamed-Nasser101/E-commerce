namespace Core.Specifications
{
    public class ProductSpecParams
    {
        private const int MAX_PAGE_SIZE = 50;
        private int _size = 5;
        private string _search;
        public int PageIndex { get; set; }
        public int PageSize
        {
            get => _size;
            set => _size = (value > MAX_PAGE_SIZE) ? MAX_PAGE_SIZE : value;
        }

        public string Search
        {
            get=> _search;
            set => _search = value.ToLower();
        }

        public int? BrandId { get; set; }
        public int? TypeId { get; set; }
        public string Sort { get; set; }
    }
}