using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Core.Entities;

namespace EcommerceApi.Dtos
{
    public class CustomerBasketDto
    {
        [Required]
        public string Id { get; set; }
        public List<BasketItemDto> Items { get; set; } = new List<BasketItemDto>();
    }
}