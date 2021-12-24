using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Core.Specifications;

namespace Infrastructure.Services
{
    public class OrderService : IOrderService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IBasketRepository _basketRepository;
        private readonly IPaymentService _paymentService;

        public OrderService(IUnitOfWork unitOfWork, IBasketRepository basketRepository, IPaymentService paymentService)
        {
            _unitOfWork = unitOfWork;
            _basketRepository = basketRepository;
            _paymentService = paymentService;
        }

        public async Task<Order> CreateOrderAsync(string buyerEmail, int deliveryMethodId, string basketId,
            Address shippingAddress)
        {
            var basket = await _basketRepository.GetBasketAsync(basketId);
            var items = new List<OrderItem>();
            var itemIds = basket.Items.Select(i => i.Id).ToList();
            var productItems = await _unitOfWork.Repository<Product>()
                .GetListWithSpec(new ProductWithSpecificIdsSpecification(itemIds));
            foreach (var productItem in productItems)
            {
                var itemOrdered = new ProductItemOrdered(productItem.Id, productItem.Name, productItem.PictureUrl);
                var basketItem = basket.Items.Find(i => i.Id == productItem.Id);
                var quantity = basketItem?.Quantity ?? 0;
                var orderItem = new OrderItem(itemOrdered, productItem.Price, quantity);
                items.Add(orderItem);
            }

            var deliveryMethod = await _unitOfWork.Repository<DeliveryMethod>().GetByIdAsync(deliveryMethodId);
            var subtotal = items.Sum(i => i.Price * i.Quantity);

            var spec = new OrderByPaymentIntentSpecification(basket.PaymentIntentId);
            var existingOrder = await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);

            if (existingOrder != null)
            {
                _unitOfWork.Repository<Order>().Delete(existingOrder);
                await _paymentService.CreateOrUpdatePaymentIntent(basket.PaymentIntentId);
            }

            var order = new Order(items, buyerEmail, shippingAddress, deliveryMethod, subtotal, basket.PaymentIntentId);

            _unitOfWork.Repository<Order>().Add(order);
            var result = await _unitOfWork.CompleteAsync();

            if (result <= 0) return null;
            // await _basketRepository.DeleteBasketAsync(basketId);

            return order;
        }

        public async Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string buyerEmail)
        {
            var spec = new OrderWithItemsAndOrderingSpecification(buyerEmail);
            return await _unitOfWork.Repository<Order>().GetListWithSpec(spec);
        }

        public async Task<Order> GetOrderByIdAsync(int id, string buyerEmail)
        {
            var spec = new OrderWithItemsAndOrderingSpecification(id, buyerEmail);
            return await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);
        }

        public async Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync()
        {
            return await _unitOfWork.Repository<DeliveryMethod>().GetListAsync();
        }
    }
}