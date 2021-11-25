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
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public ProductsController(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<ActionResult> GetProducts([FromQuery] ProductSpecParams productParams)
        {
            var products = await _unitOfWork.Repository<Product>().GetListWithSpec(new ProductsWithTypesAndBrands(productParams));
            var count = await _unitOfWork.Repository<Product>().CountAsync(new ProductWithFiltersForCountSpecification(productParams));
            var data = _mapper.Map<IReadOnlyList<ProductDto>>(products);
            return Ok(new Pagination<ProductDto>(productParams.PageSize, productParams.PageIndex, count, data));
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult> GetProduct(int id)
        {
            var product = await _unitOfWork.Repository<Product>().GetEntityWithSpec(new ProductsWithTypesAndBrands(id));
            if (product == null) return NotFound(new ErrorResponse(404));
            return Ok(_mapper.Map<ProductDto>(product));
        }

        [HttpGet("brands")]
        public async Task<ActionResult> GetBrands()
        {
            var brands = await _unitOfWork.Repository<ProductBrand>().GetListAsync();
            return Ok(brands);
        }

        [HttpGet("types")]
        public async Task<ActionResult> GetTypes()
        {
            var types = await _unitOfWork.Repository<ProductType>().GetListAsync();
            return Ok(types);
        }
    }
}