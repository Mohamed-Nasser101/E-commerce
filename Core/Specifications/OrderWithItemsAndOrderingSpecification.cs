﻿using System;
using System.Linq.Expressions;
using Core.Entities.OrderAggregate;

namespace Core.Specifications
{
    public class OrderWithItemsAndOrderingSpecification : BaseSpecification<Order>
    {
        public OrderWithItemsAndOrderingSpecification(string email) : base(o => o.BuyerEmail == email)
        {
            AddIncludes(o => o.OrderItems);
            AddIncludes(o => o.DeliveryMethod);
            AddOrderByDesc(o => o.OrderDate);
        }

        public OrderWithItemsAndOrderingSpecification(int id, string email)
            : base(o => o.Id == id && o.BuyerEmail == email)
        {
            AddIncludes(o => o.OrderItems);
            AddIncludes(o => o.DeliveryMethod);
        }
    }
}