
using OrderService.Models;

namespace OrderService.DataProvider
{
     public interface IOrderServiceDataProvider
     {
         bool Add(Order order);
     }
}