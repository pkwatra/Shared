using OrderService.Models;

namespace OrderService.Application
{
    public interface IOrderApplicationService
    {
        bool Add(Order order);
    }
}