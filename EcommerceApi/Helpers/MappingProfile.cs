using AutoMapper;
using Core.Entities;
using Core.Entities.OrderAggregate;
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

            CreateMap<Core.Entities.Identity.Address, AddressDto>().ReverseMap();
            CreateMap<BasketItemDto, BasketItem>();
            CreateMap<CustomerBasketDto, CustomerBasket>();
            CreateMap<AddressDto, Address>();
            CreateMap<Order, OrderToReturnDto>()
                .ForMember(o => o.ShippingPrice, opt => opt.MapFrom(o => o.DeliveryMethod.Price))
                .ForMember(o => o.DeliveryMethod, opt => opt.MapFrom(o => o.DeliveryMethod.ShortName));
            CreateMap<OrderItem, OrderItemDto>()
                .ForMember(d => d.ProductId, opt => opt.MapFrom(o => o.ItemOrdered.ProductItemId))
                .ForMember(d => d.ProductName, opt => opt.MapFrom(t => t.ItemOrdered.ProductName))
                .ForMember(d => d.PictureUrl, opt => opt.MapFrom(t => t.ItemOrdered.PictureUrl))
                .ForMember(d => d.PictureUrl, opt => opt.MapFrom<OrderItemUrlResolver>());
        }
    }
}