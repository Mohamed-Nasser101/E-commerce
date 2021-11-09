using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using EcommerceApi.Dtos;
using EcommerceApi.ErrorHandle;
using EcommerceApi.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceApi.Controllers
{
    public class ProductsController : BaseApiController
    {
        private readonly IGenericRepository<Product> _productRepository;
        private readonly IGenericRepository<ProductBrand> _productBrandRepository;
        private readonly IGenericRepository<ProductType> _productTypeRepository;
        private readonly IMapper _mapper;

        public ProductsController(IGenericRepository<Product> productRepository, IMapper mapper,
            IGenericRepository<ProductType> productTypeRepository,
            IGenericRepository<ProductBrand> productBrandRepository)
        {
            _productRepository = productRepository;
            _mapper = mapper;
            _productTypeRepository = productTypeRepository;
            _productBrandRepository = productBrandRepository;
        }

        [HttpGet]
        public async Task<ActionResult> GetProducts([FromQuery] ProductSpecParams productParams)
        {
            var products = await _productRepository.GetListWithSpec(new ProductsWithTypesAndBrands(productParams));
            var count = await _productRepository.CountAsync(new ProductWithFiltersForCountSpecification(productParams));
            var data = _mapper.Map<IReadOnlyList<ProductDto>>(products);
            return Ok(new Pagination<ProductDto>(productParams.PageSize, productParams.PageIndex, count, data));
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult> GetProduct(int id)
        {
            var product = await _productRepository.GetEntityWithSpec(new ProductsWithTypesAndBrands(id));
            if (product == null) return NotFound(new ErrorResponse(404));
            return Ok(_mapper.Map<ProductDto>(product));
        }

        [HttpGet("brands")]
        public async Task<ActionResult> GetBrands()
        {
            var brands = await _productBrandRepository.GetListAsync();
            return Ok(brands);
        }

        [HttpGet("types")]
        public async Task<ActionResult> GetTypes()
        {
            var types = await _productTypeRepository.GetListAsync();
            return Ok(types);
        }
    }
}