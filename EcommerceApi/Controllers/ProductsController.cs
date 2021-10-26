using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using EcommerceApi.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceApi.Controllers
{
    public class ProductsController : BaseController
    {
        private readonly IGenericRepository<Product> _productRepository;
        private readonly IMapper _mapper;

        public ProductsController(IGenericRepository<Product> productRepository, IMapper mapper)
        {
            _productRepository = productRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult> GetProducts()
        {
            var products = await _productRepository.GetListWithSpec(new ProductsWithTypesAndBrands());
            return Ok(_mapper.Map<IReadOnlyList<ProductDto>>(products));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetProduct(int id)
        {
            var product = await _productRepository.GetEntityWithSpec(new ProductsWithTypesAndBrands(id));
            return Ok(_mapper.Map<ProductDto>(product));
        }
    }
}