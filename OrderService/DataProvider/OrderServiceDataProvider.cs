using OrderService.Models;

namespace OrderService.DataProvider
{
    public class OrderServiceDataProvider : IOrderServiceDataProvider
    {
        OrderServiceContext _context;
        public  OrderServiceDataProvider(OrderServiceContext context)
        {
            _context = context;
        }

        public bool Add(Order order)
        {
            
            
            _context.Add(order);
            _context.SaveChanges();
            return true;
        }
    }
}