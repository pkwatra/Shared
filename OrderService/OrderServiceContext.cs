

using Microsoft.EntityFrameworkCore;
using OrderService.Models;

namespace OrderService
{
    public class OrderServiceContext : DbContext
    {
        public OrderServiceContext(DbContextOptions<OrderServiceContext> options) :base(options) {}

        public OrderServiceContext() {}

        DbSet<Order> Orders {get; set;}
    }
}