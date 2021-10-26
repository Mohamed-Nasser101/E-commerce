using System;
using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specifications
{
    public class ProductsWithTypesAndBrands : BaseSpecification<Product>
    {
        public ProductsWithTypesAndBrands()
        {
            AddIncludes(p => p.ProductType);
            AddIncludes(p => p.ProductBrand);
        }

        public ProductsWithTypesAndBrands(int id) : base(p => p.Id == id)
        {
            AddIncludes(p => p.ProductType);
            AddIncludes(p => p.ProductBrand);
        }
    }
}