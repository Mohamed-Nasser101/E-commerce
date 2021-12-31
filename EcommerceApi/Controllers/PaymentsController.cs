using System;
using System.IO;
using System.Threading.Tasks;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using EcommerceApi.ErrorHandle;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Stripe;
using Order = Core.Entities.OrderAggregate.Order;

namespace EcommerceApi.Controllers;

public class PaymentsController : BaseApiController
{
    private readonly IPaymentService _paymentService;
    private readonly string _endpointSecret;

    public PaymentsController(IPaymentService paymentService,IConfiguration config)
    {
        _paymentService = paymentService;
        _endpointSecret = config["StripeSettings:EndpointSecret"];
    }

    [Authorize]
    [HttpPost("{basketId}")]
    public async Task<ActionResult<CustomerBasket>> CreateOrUpdatePaymentIntent(string basketId)
    {
        var basket = await _paymentService.CreateOrUpdatePaymentIntent(basketId);
        if (basket == null) return BadRequest(new ErrorResponse(400, "Problem with your basket"));
        return basket;
    }

    [HttpPost("webhook")]
    public async Task<IActionResult> StripeWebHook()
    {
        var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
        var signatureHeader = Request.Headers["Stripe-Signature"];
        var stripeEvent = EventUtility.ConstructEvent(json, signatureHeader, _endpointSecret);
        switch (stripeEvent.Type)
        {
            case Events.PaymentIntentSucceeded:
            {
                var paymentIntent = stripeEvent.Data.Object as PaymentIntent;
                await _paymentService.UpdateOrderPaymentSucceeded(paymentIntent.Id);
                break;
            }
            case Events.PaymentIntentPaymentFailed:
            {
               var paymentIntent = stripeEvent.Data.Object as PaymentIntent;
                await _paymentService.UpdateOrderPaymentFailed(paymentIntent.Id);
                break;
            }
        }

        return Ok();
    }
}