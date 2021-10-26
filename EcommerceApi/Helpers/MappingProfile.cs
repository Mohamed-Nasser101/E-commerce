using AutoMapper;
using Core.Entities;
using EcommerceApi.Dtos;

namespace EcommerceApi.Helpers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Product, ProductDto>()
                .ForMember(p => p.ProductBrand,
                    opt => opt.MapFrom(pro => pro.ProductBrand.Name))
                .ForMember(p => p.ProductType,
                    opt => opt.MapFrom(pro => pro.ProductType.Name))
                .ForMember(p => p.PictureUrl, opt => opt.MapFrom<ProductUrlResolver>());
        }
    }
}