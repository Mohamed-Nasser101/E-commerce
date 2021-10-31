using Core.Entities;

namespace Core.Specifications
{
    public class ProductsWithTypesAndBrands : BaseSpecification<Product>
    {
        public ProductsWithTypesAndBrands(ProductSpecParams productParams) : base(p =>
            (!productParams.TypeId.HasValue || p.ProductTypeId == productParams.TypeId) &&
            (!productParams.BrandId.HasValue || p.ProductBrandId == productParams.BrandId))
        {
            AddIncludes(p => p.ProductType);
            AddIncludes(p => p.ProductBrand);
            AddOrderBy(p => p.Name);
            AddPaging(productParams.PageSize, (productParams.PageIndex - 1) * productParams.PageSize);
            if (!string.IsNullOrWhiteSpace(productParams.Sort))
            {
                if (productParams.Sort == "priceAsc") AddOrderBy(p => p.Price);
                if (productParams.Sort == "priceDesc") AddOrderByDesc(p => p.Price);
            }
        }

        public ProductsWithTypesAndBrands(int id) : base(p => p.Id == id)
        {
            AddIncludes(p => p.ProductType);
            AddIncludes(p => p.ProductBrand);
        }
    }
}