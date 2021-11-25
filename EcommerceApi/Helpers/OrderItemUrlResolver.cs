using AutoMapper;
using Core.Entities.OrderAggregate;
using EcommerceApi.Dtos;
using Microsoft.Extensions.Configuration;

namespace EcommerceApi.Helpers
{
    public class OrderItemUrlResolver : IValueResolver<OrderItem, OrderItemDto, string>
    {
        private readonly IConfiguration _config;

        public OrderItemUrlResolver(IConfiguration config)
        {
            _config = config;
        }

        public string Resolve(OrderItem source, OrderItemDto destination, string destMember, ResolutionContext context)
        {
            if (string.IsNullOrEmpty(source.ItemOrdered.PictureUrl)) return string.Empty;
            return _config["ApiUrl"] + source.ItemOrdered.PictureUrl;
        }
    }
}