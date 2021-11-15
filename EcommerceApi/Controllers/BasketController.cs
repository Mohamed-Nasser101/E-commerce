using System.Threading.Tasks;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using EcommerceApi.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceApi.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly IBasketRepository _basketRepository;
        private readonly IMapper _mapper;

        public BasketController(IBasketRepository basketRepository, IMapper mapper)
        {
            _basketRepository = basketRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult> GetBasketById(string id)
        {
            var basket = await _basketRepository.GetBasketAsync(id);
            return Ok(basket ?? new CustomerBasket(id));
        }

        [HttpPost]
        public async Task<ActionResult> UpdateBasket(CustomerBasketDto basketDto)
        {
            var basket = _mapper.Map<CustomerBasketDto, CustomerBasket>(basketDto);
            var updated = await _basketRepository.UpdateBasketAsync(basket);
            return Ok(updated);
        }

        [HttpDelete]
        public async Task DeleteBasket(string id)
        {
            await _basketRepository.DeleteBasketAsync(id);
        }
    }
}