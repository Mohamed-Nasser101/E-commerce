using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using EcommerceApi.Dtos;
using EcommerceApi.ErrorHandle;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceApi.Controllers
{
    public class ProductsController : BaseApiController
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
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse),StatusCodes.Status404NotFound)]
        public async Task<ActionResult> GetProduct(int id)
        {
            var product = await _productRepository.GetEntityWithSpec(new ProductsWithTypesAndBrands(id));
            if (product == null) return NotFound(new ErrorResponse(404));
            return Ok(_mapper.Map<ProductDto>(product));
        }
    }
}