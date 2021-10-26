using AutoMapper;
using Core.Entities;
using EcommerceApi.Dtos;
using Microsoft.Extensions.Configuration;

namespace EcommerceApi.Helpers
{
    public class ProductUrlResolver : IValueResolver<Product, ProductDto, string>
    {
        private readonly IConfiguration _config;

        public ProductUrlResolver(IConfiguration config)
        {
            _config = config;
        }

        public string Resolve(Product source, ProductDto destination, string destMember, ResolutionContext context)
        {
            if (string.IsNullOrEmpty(source.PictureUrl)) return string.Empty;
            return _config["ApiUrl"] + source.PictureUrl;
        }
    }
}