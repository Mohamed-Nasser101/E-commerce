using System.Collections.Generic;
using Core.Entities;

namespace Core.Specifications
{
    public class ProductWithSpecificIdsSpecification : BaseSpecification<Product>
    {
        public ProductWithSpecificIdsSpecification(ICollection<int> itemsIds) : base(p => itemsIds.Contains(p.Id))
        {
        }
    }
}