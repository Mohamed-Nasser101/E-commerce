using Core.Entities;

namespace Core.Specifications
{
    public class ProductWithFiltersForCountSpecification : BaseSpecification<Product>
    {
        public ProductWithFiltersForCountSpecification(ProductSpecParams productParams) : base(p =>
            (!productParams.TypeId.HasValue || p.ProductTypeId == productParams.TypeId) &&
            (!productParams.BrandId.HasValue || p.ProductBrandId == productParams.BrandId) &&
            (string.IsNullOrWhiteSpace(productParams.Search) || p.Name.ToLower().Contains(productParams.Search)))
        {
        }
    }
}